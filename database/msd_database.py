import psycopg2
from database import connection

def create_mains_table():
    # create a cursor for navigating the postgres e
    cursor = connection.cursor()

    try:
        # delete the table to not have any duplication of data
        cursor.execute(f"DROP TABLE IF EXISTS mains_table")
        # any postgres sql statement can be run by the execute method
        # the result is stored in the cursor object
        cursor.execute("""CREATE TABLE IF NOT EXISTS mains_table (
            id serial PRIMARY KEY,
            name text,
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
        print("Failed to build the mains_table")
        print(e)
        # this will rollback the state of the e to before any changes were made by the cursor
        connection.rollback()



def add_items(name, dish_type, price, calories, vegetarian, allergies, description):
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO mains_table (name, dish_type, price, calories, vegetarian, allergies, description) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (name, dish_type, price, calories, vegetarian, allergies, description)
        )
        connection.commit()

        cursor.close()

    except Exception as e:
        print("Insertion failed.")
        print(e)

        connection.rollback()

def delete_items(id):

    cursor = connection.cursor()
    try:
        cursor.execute(f"Delete from mains_table where id = %s", (id))

        connection.commit()

        cursor.close()


    except Exception as e:
        print("Deletion failed")
        print(e)

        connection.rollback()

def update_price(price, id):
    
    cursor = connection.cursor()
    try:
        cursor.execute(f"Update mains_table set price = %s where id = %s", (price, id))

        connection.commit()

        cursor.close()

    except Exception as e:  
        print("Update failed.")
        print(e)

        connection.rollback() 

def get_items(filter_vegetarian=False, filter_no_allergies=False):
    query_start = "SELECT * FROM mains_table"
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
        return [
            {
                'id': item[0],
                'name': item[1],
                'type': item[2],
                'price': item[3],
                'calories': item[4],
                'vegetarian': item[5],
                'allergies': item[6],
                'description': item[7],
            }
            for item in items
        ]
    except Exception as e:
        print(f"Error while retrieving items - {e}")

def print_items():
    print(get_items())

