import psycopg2
connection = psycopg2.connect("postgres://obxjzakcoxgnuh:e1ee2bcadafbb550f8a7822769383fff92154bbfadac785bb0fec0ea1b3e928a@ec2-34-249-181-187.eu-west-1.compute.amazonaws.com:5432/ddrj5381iapr8u")

from .login_database import *
from .menu_database import *
from .orders_database import *
from .image_storage import *
from .inserts import *
