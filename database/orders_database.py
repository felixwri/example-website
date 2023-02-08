import psycopg2
import datetime

connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

def create_orders_tables():

    cursor = connection.cursor()

    try:
        cursor.execute("""DROP TABLE IF EXISTS order_items""")
        cursor.execute("""DROP TABLE IF EXISTS orders_table""")
        cursor.execute("""DROP TYPE IF EXISTS order_status""")

        cursor.execute("CREATE TYPE order_status AS ENUM ('pending', 'preparing', 'ready', 'delivered', 'cancelled');")

        cursor.execute("""CREATE TABLE IF NOT EXISTS orders_table (
            id serial PRIMARY KEY,
            user_id VARCHAR(10),
            status order_status,
            time timestamp
        )""")

        cursor.execute("""CREATE TABLE IF NOT EXISTS order_items (
            id serial PRIMARY KEY,
            order_id serial REFERENCES orders_table(id),
            item_id serial REFERENCES mains_table(id),
            status order_status
        )""")

        print("Table created.")

        connection.commit()
        cursor.close()

    except Exception as e:
        print("Failed to build the orders_table")
        print(e)
        connection.rollback()

def add_order(user_id, dish_ids):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO orders_table (user_id, time, status) VALUES (%s, %s, 'pending') RETURNING id",
            (user_id, datetime.datetime.now())
        )
        [order_id] = cursor.fetchone()
        for dish_id in dish_ids:
            cursor.execute(
                "INSERT INTO order_items (order_id, item_id, status) VALUES (%s, %s, 'pending')",
                (order_id, dish_id)
            )
        connection.commit()
        cursor.close()

    except Exception as e:
        print("Insertion failed.")
        print(e)
        connection.rollback()

def get_orders(limit=None):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "SELECT * FROM orders_table, order_items WHERE orders_table.id = order_items.order_id;"
        )
        items = cursor.fetchall()
        # `items` is list of (Order ID, Order Time, Order Item ID, Order ID, Item ID, Status)
        cursor.close()
        orders = {}
        for item in items:
            if item[0] not in orders:
                orders[item[0]] = {
                    'id': item[0],
                    'user_id': item[1],
                    'status': item[2],
                    'time': item[3],
                    'items': [],
                }
            orders[item[0]]["items"].append({
                'id': item[4],
                'item_id': item[6],
                'status': item[7],
            })
        orders_sorted = sorted(list(orders.values()), key=lambda order: order['time'], reverse=True)
        if limit != None:
            return orders_sorted[:limit]
        else:
            return orders_sorted
    except Exception as e:
        print(f"Error while retrieving items - {e}")

def update_order_item_status(item_id, status):
    assert status in ['pendng', 'preparing', 'ready', 'delivered', 'cancelled']
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE order_items SET status = %s WHERE id = %s;", (status, item_id))
        connection.commit()
        cursor.close()
    except Exception as e:
        print(f"Error while updating status for item - {e}")

def update_order_table_status(table_id, status):
    assert status in ['pendng', 'preparing', 'ready', 'delivered', 'cancelled']
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE order_table SET status = %s WHERE id = %s;", (status, table_id))
        connection.commit()
        cursor.close()
    except Exception as e:
        print(f"Error while updating status for item - {e}")
