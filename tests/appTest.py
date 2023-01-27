def test_home(client):
    response = client.get("/")
    assert b"<title>Oaxaca</title>" in response.data