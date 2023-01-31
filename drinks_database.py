from __init__ import connection

def create_drinks_table():

    cursor = connection.cursor()

    try:
        cursor.execute("""DROP TABLE IF EXISTS drinks_table""")
        
        cursor.execute("""CREATE TABLE IF NOT EXISTS drinks_table (
            id serial PRIMARY KEY,
            name text,
            type text,
            price real,
            calories integer,
            description text
        )""")

        print("Table created.")

        connection.commit()
        cursor.close()

    except Exception as e:
        print("Failed to build drinks table.")
        print(e)
        connection.rollback()



def add_drinks(name, type, price, calories, description):
    cursor = connection.cursor()

    try:

        cursor.execute("""INSERT INTO drinks_table (name, type, price, calories, description) VALUES (%s, %s, %s, %s, %s)""", (name, type, price, calories, description))

        connection.commit()
        cursor.close()

    except Exception as e:
        print("Failed to add drinks to the e.")
        print(e)

        connection.rollback()



create_drinks_table()

add_drinks("Diet Coke / Coke Zero", "Soft Drinks", 3.30, 0, None)
add_drinks("Coca Cola", "Soft Drinks", 3.50, 139, None)
add_drinks("Sprite", "Soft Drinks", 3.30, 110, None)
add_drinks("Fanta", "Soft Drinks", 3.30, 120, None)
add_drinks("Orange Juice", "Soft Drinks", 4.00, 30, None)
add_drinks("Budweiser 4.5% ABV", "Beer", 5.50, 186, None)
add_drinks("Mahou 5.1% ABV", "Beer", 6.50, 190, None)
add_drinks("Corona 4.5% ABV", "Beer", 5.50, 175, None)
add_drinks("Stella Cidre", "Cider", 6.50, 150, None)
add_drinks("Stella Cidre Raspberry", "Cider", 7.00, 190, None)


