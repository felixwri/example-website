
import psycopg2
import bcrypt

# connection details of the database
connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")
def create_users_tabel():
        # create a cursor for navigating the postgres database
    cursor = connection.cursor()

    try:
        # delete the table to not have any duplication of data
        cursor.execute(f"DROP TABLE IF EXISTS users_table")
        # any postgres sql statement can be run by the execute method
        # the result is stored in the cursor object
        cursor.execute(f"CREATE TABLE IF NOT EXISTS users_table (id serial PRIMARY KEY, username VARCHAR(252) UNIQUE, password VARCHAR(252))")

        print(f"Table created.")

        # any executed commands need to be commited otherwise they will not be saved
        connection.commit()

        cursor.close()
        

    except Exception as e:
        print("Failed to build the users_table")
        print(e)
        # this will rollback the state of the database to before any changes were made by the cursor
        connection.rollback()

def add_user(username, password):

    cursor = connection.cursor()

    try:
        encrypted_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
            
        cursor.execute(f"INSERT INTO users_table (username, password) VALUES (%s, %s)", (username, encrypted_password))

        connection.commit()
        cursor.close()

    except Exception as e:
        print("Failed to insert into users_table")
        print(e)
            
        connection.rollback()

def print_users():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM users_table;")
        print(cursor.fetchall())
        
        cursor.close()
    except Exception as e:
        print(f"Error while printing users - {e}")

def create_mains_table():
    # create a cursor for navigating the postgres database
    cursor = connection.cursor()

    try:
        # delete the table to not have any duplication of data
        cursor.execute(f"DROP TABLE IF EXISTS mains_table")
        # any postgres sql statement can be run by the execute method
        # the result is stored in the cursor object
        cursor.execute(f"CREATE TABLE IF NOT EXISTS mains_table (id serial PRIMARY KEY, name text, price real, description text)")

        print(f"Table created.")

        # any executed commands need to be commited otherwise they will not be saved
        connection.commit()

        cursor.close()
        

    except Exception as e:
        print("Failed to build the mains_table")
        print(e)
        # this will rollback the state of the database to before any changes were made by the cursor
        connection.rollback()



def add_items(name, price, description):

    cursor = connection.cursor()
    try:
        cursor.execute(f"INSERT INTO mains_table (name, price, description) VALUES (%s, %s, %s)", (name, price, description))
        
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

def print_items():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM mains_table;")
        print(cursor.fetchall())
        
        cursor.close()
    except Exception as e:
        print(f"Error while printing items - {e}")


create_mains_table()

add_items('MEXICAN PAELLA', 15.00, 'Slow cooked Mexican rice with tiger prawns, chicken, chorizo, red salsa, peas & sweetcorn. (Hot)')
add_items('SEAFOOD PAELLA', 15.00, 'Mexican rice cooked with chorizo, seafood cocktail, black tiger prawns, roasted salsa, peas, sweet corn and fresh coriander. (Hot)')
add_items('MEAT PAELLA', 15.00, 'Slow cooked Mexican rice with chicken, chorizo, red salsa, peas & sweetcorn topped with grilled steak & bacon. (Hot)')
add_items('BEEF CARNITAS ENCHILADA', 14.50, 'olled flour or white corn tortillas (GF) filled with jack cheese, poblano chilli peppers and topped with creamy salsa, jalapeños & cheese. Oven baked and served over a bed of Mexican rice & our famous guacamole.')
add_items('POBLANO CHICKEN', 14.50, 'Grilled chicken breast topped with red salsa, poblano chilli peppers, melted jack cheese, served with seasoned fries.')

print_items()

create_users_tabel()

add_user("admin", "@dmin123")

print_users()

connection.close()
