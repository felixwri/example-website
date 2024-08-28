import psycopg2
from . import connection

table_name = "mains_table"

def create_mains_table():
    # create a cursor for navigating the postgres e
    cursor = connection.cursor()

    try:
        # delete the table to not have any duplication of data
        cursor.execute(f"DROP TABLE IF EXISTS " + table_name + " CASCADE")
        # any postgres sql statement can be run by the execute method
        # the result is stored in the cursor object
        cursor.execute(f"""CREATE TABLE IF NOT EXISTS {table_name} (
            id serial PRIMARY KEY,
            name text,
            image_url text,
            dish_type text,
            price real,
            calories integer,
            vegetarian boolean,
            allergies text,
            description text
        )""")

        print(f"Table created.")

        # any executed commands need to be commited otherwise they will not be saved
        connection.commit()

        cursor.close()
        

    except Exception as e:
        print("Failed to build the " + table_name)
        print(e)
        # this will rollback the state of the e to before any changes were made by the cursor
        connection.rollback()



def add_item(name, image_url, dish_type, price, calories, vegetarian, allergies, description):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO " + table_name + " (name, image_url, dish_type, price, calories, vegetarian, allergies, description) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (name, image_url, dish_type, price, calories, vegetarian, allergies, description)
        )
        connection.commit()

        cursor.close()

        return {"success": True}

    except Exception as e:
        print("Insertion failed.")
        print(e)

        connection.rollback()

        return {"success": False}

def update_item(id, name, image_url, dish_type, price, calories, vegetarian, allergies, description):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "UPDATE " + table_name + " SET name=%s, image_url=%s, dish_type=%s, price=%s, calories=%s, vegetarian=%s, allergies=%s, description=%s WHERE id=%s",
            (name, image_url, dish_type, price, calories, vegetarian, allergies, description, id)
        )
        connection.commit()

        cursor.close()

        return {"success": True}

    except Exception as e:
        print("Insertion failed.")
        print(e)

        connection.rollback()

        return {"success": False}

def delete_items(id):
    cursor = connection.cursor()
    try:
        cursor.execute(f"DELETE FROM {table_name} WHERE id={id}")

        connection.commit()

        cursor.close()

        return {"success": True}


    except Exception as e:
        print("Deletion failed")
        print(e)

        connection.rollback()
        return {"success": False}

def update_price(price, id):
    
    cursor = connection.cursor()
    try:
        cursor.execute(f"Update " + table_name + " set price = %s where id = %s", (price, id))

        connection.commit()

        cursor.close()

    except Exception as e:  
        print("Update failed.")
        print(e)

        connection.rollback() 

def get_items(filter_vegetarian=False, filter_no_allergies=False):
    query_start = "SELECT * FROM " + table_name + ""
    query_filters = ""
    query_end = ";"
    filter_strings = ["vegetarian = TRUE", "allergies = 'None'"]
    active_filters = [filter_vegetarian, filter_no_allergies]
    added_filters = 0
    if active_filters.count(True) > 0:
        for i, filter_is_active in enumerate(active_filters):
            if filter_is_active:
                query_filters += " WHERE " if added_filters == 0 else " AND "
                query_filters += filter_strings[i]
                added_filters += 1
    cursor = connection.cursor()
    try:
        cursor.execute(query_start + query_filters + query_end)
        items = cursor.fetchall()
        cursor.close()


        print(items)
        if items is None:
            return []

        return [
            {
                'id': item[0],
                'name': item[1],
                'image_url': item[2],
                'type': item[3],
                'price': item[4],
                'calories': item[5],
                'vegetarian': item[6],
                'allergies': item[7],
                'description': item[8],
            }
            for item in items
        ]
    except Exception as e:
        print(f"Error while retrieving items - {e}")

def print_items():
    print(get_items())

