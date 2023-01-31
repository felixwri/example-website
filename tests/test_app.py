def test_home_page_get_request(client):
    response = client.get('/')
    assert response.status_code == 200, "Route '/' is active"


def test_menu_page_get_request(client):
    response = client.get('/menu')
    assert response.status_code == 200, "Route '/menu' is active"

def test_navCss(client):
    response = client.get('/styles/nav.css')
    assert response.status_code == 200, "Route '/styles/nav.css' is active"


def test_menuCss(client):
    response = client.get('/styles/menu.css')
    assert response.status_code == 200, "Route '/styles/menu.css' is active"

def test_homeCss(client):
    response = client.get('/styles/home.css')
    assert response.status_code == 200, "Route '/styles/home.css' is active"

def test_globalCss(client):
    response = client.get('/styles/global.css')
    assert response.status_code == 200, "Route '/styles/global.css' is active"


def testmenuJs(client):
    response = client.get('/scripts/menu.js')
    assert response.status_code == 200, "Route '/scripts/menu.js' is active"

def testnavJs(client):
    response = client.get('/scripts/nav.js')
    assert response.status_code == 200, "Route '/scripts/nav.js' is active"

def test_home_page_title(client):
    response = client.get("/")
    assert b"<title>Oaxaca</title>" in response.data

def test_nav_page_title(client):
    response = client.get("/")
    assert b"<nav>" in response.data