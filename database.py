
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


create_mains_table()


#Starters
add_items('TORTILLA CHIPS & SALSAS','Starters', 5.50, 150, True, 'None', 'Served with our homemade roasted salsa and pico de gallo.')
add_items('TORTILLA CHIPS & GUACAMOLE', 'Starters', 6.00, 200, True,'None', 'Our famous guacamole is freshly made every day using fresh ingredients.')
add_items('NACHOS', 'Starters', 7.00, 306, True, 'Cheese, jalepenos', 'Tortilla chips topped with jack cheese, roasted salsa, jalapeño cream cheese, sour cream and our famous guacamole.')
add_items('SOUTHWEST SPRING ROLLS','Starters', 7.00, 239, True, 'Cheese', 'Chipotle Mexican chicken, peppers & jack cheese folded in a flour tortilla, deep fried & served with our famous guacamole.')
add_items('GRILLED CHICKEN WINGS', 'Starters', 7.50, 312, False, 'None', 'Grilled chicken with Lousiana Hot souce.')
#Mains
add_items('MEXICAN PAELLA', 'Mains', 15.00, 300, False, 'Prawns', 'Slow cooked Mexican rice with tiger prawns, chicken, chorizo, red salsa, peas & sweetcorn. (Hot)')
add_items('SEAFOOD PAELLA', 'Mains', 15.00, 200, False, 'Prawns, Nuts', 'Mexican rice cooked with chorizo, seafood cocktail, black tiger prawns, roasted salsa, peas, sweet corn and fresh coriander. (Hot)')
add_items('MEAT PAELLA', 'Mains', 15.00, 400, False, 'None', 'Slow cooked Mexican rice with chicken, chorizo, red salsa, peas & sweetcorn topped with grilled steak & bacon. (Hot)')
add_items('BEEF CARNITAS ENCHILADA', 'Mains', 14.50, 410, False, 'None', 'olled flour or white corn tortillas (GF) filled with jack cheese, poblano chilli peppers and topped with creamy salsa, jalapeños & cheese. Oven baked and served over a bed of Mexican rice & our famous guacamole.')
add_items('POBLANO CHICKEN', 'Mains', 14.50, 350, False, 'None', 'Grilled chicken breast topped with red salsa, poblano chilli peppers, melted jack cheese, served with seasoned fries.')
add_items('MEX BURGER', 'Mains', 14.50, 600, False, 'Cheese', 'Beef burger folded in a flour tortilla with jack cheese, poblano chilli peppers & Chilli con Carne, served with pico de gallo, sour cream, our famous guacamole & Mexican rice.')
#Desserts
add_items('ICE CREAM', 'Desserts', 4.00, 145, False, 'Milk', 'Two scoops, choose from vanilla, strawberry, chocolate or toffee.')
add_items('BUNUELOS', 'Desserts', 6.00, 212, False, 'None', 'Fried dough ball dusted with cinnamon sugar served with Dulce de Leche & chocolate fudge sauce.')
add_items('CHOCOLATE BROWNIE', 'Dessert', 6.00, 200, False, 'Milk', 'Warm chocolate fudge brownie served with vanilla ice cream.')
add_items('CHURROS', 'Desserts', 6.50, 256, False, 'Milk', 'Mexican doughnut fried and dusted with cinnamon sugar with a side of Dulce de Leche & vanilla ice cream.')
add_items('BANANA CHIMICHANGA', 'Desserts', 6.50, 200, False, 'Milk', 'A cinnamon flour tortilla filled with banana, deep fried and served with Dulce de Leche & vanilla ice cream.')

print_items()

connection.close()
