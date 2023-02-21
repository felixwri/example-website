import psycopg2
import bcrypt
<<<<<<< HEAD
connection = psycopg2.connect("postgres://judajuxuiirttb:2b479b982ee432dbf30816d4f26d87aa3e2c2b458628cba8311be031d295dddb@ec2-52-17-81-195.eu-west-1.compute.amazonaws.com:5432/d9qjkvssoft7iu")
=======

connection = psycopg2.connect("postgres://judajuxuiirttb:2b479b982ee432dbf30816d4f26d87aa3e2c2b458628cba8311be031d295dddb@ec2-52-17-81-195.eu-west-1.compute.amazonaws.com:5432/d9qjkvssoft7iu")

>>>>>>> 3f20fc0a7d2fe95c9fa5dca28593e16ad28d2ebc

from database.login_database import *
from database.menu_database import *
from database.orders_database import *
