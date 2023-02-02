import psycopg2

connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

def create_orders_table():
    
    cursor = connection.cursor()

    try:
        cursor.execute("""DROP TABLE IF EXISTS orders_table""")
        
        cursor.execute("""CREATE TABLE IF NOT EXISTS orders_table (
            id serial PRIMARY KEY,
            item_id INTEGER REFERENCES mains_table(id),
            quantity integer,
            price real
        )""")

        print("Table created.")

        connection.commit()
        cursor.close()
    
    except Exception as e:
        print("Failed to build the orders_table")
        print(e)
        connection.rollback()


        
