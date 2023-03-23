import psycopg2, bcrypt, re
from . import connection
# connection = psycopg2.connect("postgres://obxjzakcoxgnuh:e1ee2bcadafbb550f8a7822769383fff92154bbfadac785bb0fec0ea1b3e928a@ec2-34-249-181-187.eu-west-1.compute.amazonaws.com:5432/ddrj5381iapr8u")

def create_users_table():
        # create a cursor for navigating the postgres e
    cursor = connection.cursor()

    try:
        # delete the table to not have any duplication of data
        cursor.execute(f"DROP TABLE IF EXISTS users_table CASCADE")
        cursor.execute("DROP TYPE IF EXISTS user_type")

        # any postgres sql statement can be run by the execute method
        # the result is stored in the cursor object
        cursor.execute("CREATE TYPE user_type AS ENUM ('basic', 'waiter', 'kitchen');")
        cursor.execute("""CREATE TABLE IF NOT EXISTS users_table (
            id serial PRIMARY KEY,
            type user_type,
            username VARCHAR(252) UNIQUE,
            password VARCHAR(252)
        )""")

        print(f"Table created.")

        # any executed commands need to be commited otherwise they will not be saved
        connection.commit()

        cursor.close()
        

    except Exception as e:
        print("Failed to build the users_table")
        print(e)
        # this will rollback the state of the e to before any changes were made by the cursor
        connection.rollback()

def add_user(username, password, user_type='basic'):
    assert user_type in ['basic', 'waiter', 'kitchen']

    cursor = connection.cursor()

    try:
        #Hash the password
        encrypted_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        #Convert the hashed password to bytes from string to use it in check_password function
        encrypted_password = encrypted_password.decode()
        #Add the hashed password and the username details to the e    
        cursor.execute(
            f"INSERT INTO users_table (type, username, password) VALUES (%s, %s, %s)",
            (user_type, username, encrypted_password)
        )
        
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
        #Get the hashed 
        encrypted_password = result[0]
        #Check the password if it is correct or not
        if bcrypt.checkpw(password.encode(), encrypted_password.encode()):
            return True
        else:
           return False

    else:
        return False

def password_strength(password):
    lower_case = re.search(r"[a-z]", password)
    upper_case = re.search(r"[A-Z]", password)
    digit = re.search(r"[0-9]", password)
    special_char = re.search(r"[!@#\$%\^&\*]", password)

    if len(password) < 8:
        return False
    elif lower_case and upper_case and digit and special_char:
        return True
    else:
        return False   

def existing_user(username):
    cursor = connection.cursor()

    cursor.execute(f"SELECT 1 FROM users_table WHERE username = %s", (username,))

    result = cursor.fetchone()

    cursor.close()

    if result:
        return True
    else:
        return False



#users_table(id, type, username,password)
def print_users():
    cursor = connection.cursor()
    try:
        user_list = []
        cursor.execute("SELECT * FROM users_table")
        users = cursor.fetchall()
        for user in users:
            #user_list += user[2]+ "\n" + user[1] + "\n"
            user_list.append(user[2])
            #user_list.append(user[1])
            #print(user[1])
            print(user[2])

        print(user_list)
        return user_list
        #print(cursor.fetchall())
        
        cursor.close()
    except Exception as e:
        print(f"Error while printing users - {e}")

def get_all_users():
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM users_table")
        table = cursor.fetchall()
        users = []
        for user in table:
            #print(user)
            u = {
                "id": user[0],
                "type": user[1],
                "name": user[2],
                "password": user[3]
            }
            users.append(u)
        #print(users)
        cursor.close()
        return users

    except Exception as e:
        print(f"Error while printing users - {e}")

def get_user_types():
    #basic, kitchen, waiter
    users = get_all_users()
    basic = 0
    kitchen = 0
    waiter = 0

    for user in users:
        if user.get("type") == "basic":
            basic += 1
        if user.get("type") == "kitchen":
            kitchen += 1
        if user.get("type") == "waiter":
            waiter += 1

    types =[basic, kitchen, waiter]
    #print(types)

    return types