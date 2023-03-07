import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
connection = psycopg2.connect(os.getenv('DATABASE_URI'))

from .login_database import *
from .menu_database import *
from .orders_database import *
from .image_storage import *
from .inserts import *
