from databases import connection

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
        print("Failed to add drinks to the database.")
        print(e)

        connection.rollback()



create_drinks_table()

add_drinks("Diet Coke / Coke Zero", "Soft Drinks", 3.30, 0, None)

