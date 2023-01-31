def test_home_page_get_request(client):
    response = client.get('/')
    assert response.status_code == 200, "Route '/' is active"


def test_menu_page_get_request(client):
    response = client.get('/menu')
    assert response.status_code == 200, "Route '/smenu' is active"



def test_home_page_title(client):
    response = client.get("/")
    assert b"<title>Oaxaca</title>" in response.data