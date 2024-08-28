import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()

# connection = psycopg2.connect(
#     dbname=os.getenv('DATABASE_name'),
#     user=os.getenv('DATABASE_USER'),
#     password=os.getenv('DATABASE_PASSWORD'),
#     host=os.getenv('DATABASE_HOST'),
#     port=os.getenv('DATABASE_PORT')
# )

# Connect using a service with a URI such as Heroku
connection = psycopg2.connect(os.getenv('DATABASE_URI'))

from .login_database import *
from .menu_database import *
from .orders_database import *
from .tables_database import *
from .image_storage import *
from .inserts import *
