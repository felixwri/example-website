import pytest
from app import * 

@pytest.fixture()
def apps(): 
    apps=app
    yield app

@pytest.fixture()
def client(apps):
    return apps.test_client()
