from databases import connection, bcrypt


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
        #Hash the password
        encrypted_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        #Convert the hashed password to bytes from string to use it in check_password function
        encrypted_password = encrypted_password.decode()
        #Add the hashed password and the username details to the database    
        cursor.execute(f"INSERT INTO users_table (username, password) VALUES (%s, %s)", (username, encrypted_password))

        connection.commit()
        cursor.close()

    except Exception as e:
        print("Failed to insert into users_table")
        print(e)
            
        connection.rollback()

def check_password(username, password):
    
    cursor = connection.cursor()

    #Access the users password
    cursor.execute(f"SELECT password FROM users_table WHERE username = %s", (username,))
        
    result = cursor.fetchone()

    #Check if the user exists
    if result:
        #Get the hashed password
        encrypted_password = result[0]
        #Check the password if it is correct or not
        if bcrypt.checkpw(password.encode(), encrypted_password.encode()):
            return True
        else:
           return False

    else:
        return False

def print_users():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM users_table;")
        print(cursor.fetchall())
        
        cursor.close()
    except Exception as e:
        print(f"Error while printing users - {e}")