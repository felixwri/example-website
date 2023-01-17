
import psycopg2

# connection details of the database
connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

def create_table():
    # create a cursor for navigating the postgres database
    cursor = connection.cursor()

    try:
        # any postgres sql statement can be run by the execute method
        # the result is stored in the cursor object
        cursor.execute(f"CREATE TABLE IF NOT EXISTS mains_table (name text, price real, description text)")

        cursor.execute(f"INSERT INTO mains_table (name, price, description) VALUES('Manti', 15.00, 'Small dumplings with yogurt and red souce on top.')")

        print(f"Inserted row(s) into test_table")

        # any executed commands need to be commited otherwise they will not be saved
        connection.commit()

    except Exception as e:
        print("Failed to build the test_table")
        print(e)
        # this will rollback the state of the database to before any changes were made by the cursor
        connection.rollback()

create_table()
