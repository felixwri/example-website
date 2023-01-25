import login_database

def test_password_strength():
    result = login_database.password_strength("123")
    assert result == False

    result = login_database.password_strength("1232435435")
    assert result == False

    result = login_database.password_strength("Ac1234567!")
    assert result == True



test_password_strength()