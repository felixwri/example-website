from login_database import add_user, check_password
from msd_database import add_items, get_items, delete_items, update_price
import psycopg2
import bcrypt

connection = psycopg2.connect("postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")