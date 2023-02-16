from orders_database import create_orders_tables
from menu_database import create_mains_table
from login_database import create_users_tabel 
from inserts import run as insert_into_menu


create_orders_tables()
create_mains_table()
create_users_tabel()
insert_into_menu()
