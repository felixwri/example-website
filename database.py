
import psycopg2
import bcrypt

# connection details of the database
connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

def create_mains_table():
    # create a cursor for navigating the postgres database
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
        # this will rollback the state of the database to before any changes were made by the cursor
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

def get_items():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM mains_table;")
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

