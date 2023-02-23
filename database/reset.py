from orders_database import create_orders_tables
from menu_database import create_mains_table
from login_database import create_users_table
from inserts import insert_into_menu, insert_admin_account


create_orders_tables()
create_mains_table()
create_users_table()
insert_into_menu()
insert_admin_account()
