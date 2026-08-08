import pytest
from fastapi.testclient import TestClient
import os
import sys

# Add backend directory to sys.path so we can import server
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

# Mock environment variables for testing
os.environ["MOCK_AUTH"] = "true"
os.environ["OWNER_EMAIL"] = "admin@matrielstudio.com.br"
os.environ["FIREBASE_PROJECT_ID"] = "test-project"
os.environ["MONGO_URL"] = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
os.environ["DB_NAME"] = "matriel_test"

from server import app

client = TestClient(app)

def test_get_projects():
    response = client.get("/api/projects")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_project_unauthorized():
    project_data = {
        "title": "Projeto Teste",
        "tag": "Design",
        "objetivo": "Testar rotas",
        "resultado": "Sucesso",
        "img": "http://image.com"
    }
    # Without token
    response = client.post("/api/projects", json=project_data)
    assert response.status_code == 401

    # With invalid token
    response = client.post(
        "/api/projects", 
        json=project_data, 
        headers={"Authorization": "Bearer invalid-token"}
    )
    assert response.status_code == 401

def test_create_project_authorized():
    project_data = {
        "title": "Projeto Teste Autorizado",
        "tag": "Desenvolvimento",
        "objetivo": "Verificar token de mock",
        "resultado": "Tudo verde",
        "img": "http://image.com"
    }
    # With valid mock token
    response = client.post(
        "/api/projects", 
        json=project_data, 
        headers={"Authorization": "Bearer mock-admin-token"}
    )
    assert response.status_code == 201
    res_data = response.json()
    assert res_data["title"] == "Projeto Teste Autorizado"
    assert "id" in res_data

    # Cleanup the created project if possible or let DB handle it
    project_id = res_data["id"]
    
    # Test edit
    edit_data = {
        "title": "Projeto Teste Editado",
        "tag": "Desenvolvimento",
        "objetivo": "Verificar token de mock",
        "resultado": "Tudo verde",
        "img": "http://image.com"
      }
    response_edit = client.put(
        f"/api/projects/{project_id}",
        json=edit_data,
        headers={"Authorization": "Bearer mock-admin-token"}
    )
    assert response_edit.status_code == 200
    assert response_edit.json()["title"] == "Projeto Teste Editado"

    # Test delete
    response_delete = client.delete(
        f"/api/projects/{project_id}",
        headers={"Authorization": "Bearer mock-admin-token"}
    )
    assert response_delete.status_code == 204
