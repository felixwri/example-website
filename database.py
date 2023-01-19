
import psycopg2

# connection details of the database
connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

def create_table():
    # create a cursor for navigating the postgres database
    cursor = connection.cursor()

    try:
        # delete the table to not have any duplication of data
        cursor.execute(f"DROP TABLE IF EXISTS mains_table")
        # any postgres sql statement can be run by the execute method
        # the result is stored in the cursor object
        cursor.execute(f"CREATE TABLE IF NOT EXISTS mains_table (id integer, name text, price real, description text)")

        print(f"Table created.")

        # any executed commands need to be commited otherwise they will not be saved
        connection.commit()
        

    except Exception as e:
        print("Failed to build the mains_table")
        print(e)
        # this will rollback the state of the database to before any changes were made by the cursor
        connection.rollback()



def add_items(id, name, price, description):

    cursor = connection.cursor()
    try:
        cursor.execute(f"INSERT INTO mains_table (id, name, price, description) VALUES (%s, %s, %s, %s)", (id, name, price, description))
        
        connection.commit()

    except Exception as e:
        print("Insertion failed.")
        print(e)

        connection.rollback()

def delete_items(id):

    cursor = connection.cursor()
    try:
        cursor.execute(f"Delete from mains_table where id = %s", (id))

        connection.commit()


    except Exception as e:
        print("Deletion failed")
        print(e)

        connection.rollback()

def update_price(price, id):
    
    cursor = connection.cursor()
    try:
        cursor.execute(f"Update mains_table set price = %s where id = %s", (price, id))

        connection.commit()

    except Exception as e:  
        print("Update failed.")
        print(e)

        connection.rollback() 
    
create_table()
add_items(1, 'MEXICAN PAELLA', 15.00, 'Slow cooked Mexican rice with tiger prawns, chicken, chorizo, red salsa, peas & sweetcorn. (Hot)')
add_items(2, 'SEAFOOD PAELLA', 15.00, 'Mexican rice cooked with chorizo, seafood cocktail, black tiger prawns, roasted salsa, peas, sweet corn and fresh coriander. (Hot)')
add_items(3, 'MEAT PAELLA', 15.00, 'Slow cooked Mexican rice with chicken, chorizo, red salsa, peas & sweetcorn topped with grilled steak & bacon. (Hot)')
add_items(4, 'BEEF CARNITAS ENCHILADA', 14.50, 'olled flour or white corn tortillas (GF) filled with jack cheese, poblano chilli peppers and topped with creamy salsa, jalapeños & cheese. Oven baked and served over a bed of Mexican rice & our famous guacamole.')
add_items(5, 'POBLANO CHICKEN', 14.50, 'Grilled chicken breast topped with red salsa, poblano chilli peppers, melted jack cheese, served with seasoned fries.')




