import psycopg2
import datetime
from . import connection

def create_tables_table():
    try:
        with connection.cursor() as cursor:
            cursor.execute("""DROP TABLE IF EXISTS tables_table""")
            cursor.execute("""CREATE TABLE IF NOT EXISTS tables_table (
                table_number integer PRIMARY KEY,
                waiter_id serial REFERENCES users_table(id)
            )""")
            connection.commit()
    except Exception as e:
        print(f"Failed to build tables_table - {e}")
        connection.rollback()

def add_table(table_number):
    try:
        with connection.cursor() as cursor:
            # Find waiter with fewest tables assigned
            cursor.execute("SELECT id FROM users_table WHERE type = 'waiter';")
            waiters_num_tables = {}
            for (waiter_id,) in cursor.fetchall():
                waiters_num_tables[waiter_id] = 0
            cursor.execute("""
                SELECT users_table.id, COUNT(tables_table.table_number)
                FROM users_table, tables_table
                WHERE users_table.type = 'waiter' AND users_table.id = tables_table.waiter_id
                GROUP BY users_table.id;
            """)
            for waiter_id, num_tables in cursor.fetchall():
                waiters_num_tables[waiter_id] = num_tables
            waiter_fewest_tables = min(waiters_num_tables.items(), key=lambda waiter: waiter[1])[0]
            # Create new table, assigning waiter
            cursor.execute(
                "INSERT INTO tables_table VALUES (%s, %s)",
                (table_number, waiter_fewest_tables)
            )
    except Exception as e:
        print(f"Failed to add new table number {table_number} - {e}")

def delete_table(table_number):
    try:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM tables_table WHERE table_number=%s;", (table_number,))
            connection.commit()
            return {"success": True}
    except Exception as e:
        print(f"Failed to remove table number {table_number} - {e}")
        return {"success": False}

def get_tables():
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM tables_table;")
            return [
                {
                    'table_number': table[0],
                    'waiter_id': table[1],
                }
                for table in cursor.fetchall()
            ]
    except Exception as e:
        print(f"Failed to get tables - {e}")

def print_tables():
    print(get_tables())
