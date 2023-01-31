import psycopg2

connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

def create_drinks_table():

    cursor = connection.cursor()

    try:
        cursor.execute("""DROP TABLE IF EXISTS drinks_table""")
        
        cursor.execute("""CREATE TABLE IF NOT EXISTS drinks_table (
            id serial PRIMARY KEY,
            name text,
            type text,
            price real,
            calories integer
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

        cursor.execute("""INSERT INTO drinks_table (name, type, price, calories) VALUES (%s, %s, %s, %s)""", (name, type, price, calories))

        connection.commit()
        cursor.close()

    except Exception as e:
        print("Failed to add drinks to the e.")
        print(e)

        connection.rollback()

def get_drink():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM drinks_table;")
        print(cursor.fetchall())
        
        items = cursor.fetchall()
        cursor.close()
        return [
            {
                'id': item[0],
                'name': item[1],
                'type': item[2],
                'price': item[3],
                'calories': item[4],
            }
            for item in items
        ]
    except Exception as e:
        print(f"Error while retrieving items - {e}")
        print(e)



