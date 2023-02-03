import psycopg2
import datetime

connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

def create_orders_tables():

    cursor = connection.cursor()

    try:
        cursor.execute("""DROP TABLE IF EXISTS order_items""")
        cursor.execute("""DROP TABLE IF EXISTS orders_table""")
        cursor.execute("""DROP TYPE IF EXISTS order_status""")

        cursor.execute("""CREATE TABLE IF NOT EXISTS orders_table (
            id serial PRIMARY KEY,
            time timestamp
        )""")

        cursor.execute("CREATE TYPE order_status AS ENUM ('preparing', 'ready', 'delivered', 'cancelled');")
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

def add_order(order_items):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO orders_table (time) VALUES (%s) RETURNING id",
            (datetime.datetime.now(),)
        )
        [order_id] = cursor.fetchone()
        for item in order_items:
            dish_id = item["id"]
            cursor.execute(
                "INSERT INTO order_items (order_id, item_id, status) VALUES (%s, %s, 'preparing')",
                (order_id, dish_id)
            )
        connection.commit()
        cursor.close()

    except Exception as e:
        print("Insertion failed.")
        print(e)
        connection.rollback()

def get_orders():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM orders_table, order_items;")
        items = cursor.fetchall()
        # `items` is list of (Order ID, Order Time, Order Item ID, Order ID, Item ID, Status)
        cursor.close()
        orders = {}
        for item in items:
            if item[0] not in orders:
                orders[item[0]] = {
                    'id': item[0],
                    'time': item[1],
                    'items': [],
                }
            orders[item[0]]["items"].append({
                'id': item[2],
                'item_id': item[4],
                'status': item[5],
            })
        return list(orders.values())
    except Exception as e:
        print(f"Error while retrieving items - {e}")

def print_orders():
    print(get_orders())
