import database as db


def test_postGres():

    try:
        connection = db.psycopg2.connect(
            "postgres://odstwujyyeqrmq:e17c2c73945aea33a3547fc80fee617794063f339711ba1ffcdf6de4055c10aa@ec2-52-48-159-67.eu-west-1.compute.amazonaws.com:5432/dai4en0moi3ve4")

        connection.close()
        assert True
    except:
        assert False

def test_add_order():

    order = [1]
    db.add_order(order, 1)

    cursor = db.connection.cursor()

    num_order = cursor.fetchone()

    assert num_order == 1


def test_password_strength():
    result = db.login_database.password_strength("123")
    assert result == False

    result = db.login_database.password_strength("1232435435")
    assert result == False

    result = db.login_database.password_strength("Ac1234567!")
    assert result == True


def test_existing_user():
    result = db.login_database.existing_user("admin")
    assert result == True



#! Disabled until fixed
# test_add_order()
# test_password_strength()
# test_existing_user()

