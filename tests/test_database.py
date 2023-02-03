from database import *


def test_postGres():

    try:
        connection = psycopg2.connect(
            "postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

        connection.close()
        assert True
    except:
        assert False


