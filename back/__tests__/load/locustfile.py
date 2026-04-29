from locust import HttpUser, task, constant
import time
import os
from dotenv import load_dotenv

load_dotenv()

class MyUser(HttpUser):
    """used to mock a user for locust"""
    PORT = os.getenv("LISTEN_PORT")
    host = f'http://localhost:{PORT}'
    print(host)
    wait_time = constant(1)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.token = None
        self.token_expiry = 0

    def get_token(self):
        """Obtain or refresh JWT token."""
        if self.token and time.time() < (self.token_expiry - 60):
            return self.token

        response = self.client.post("/auth/login", json={
            "username": "Alice",
            "password": "password123"
        }, name="/auth/login [token refresh]")

        if response.status_code == 200:
            data = response.json()
            self.token = data['token']
            self.token_expiry = time.time() + 3600
            return self.token
        else:
            raise Exception(f"Login failed: {response.status_code}")

    def on_start(self):
        self.get_token()

    @task(3)
    def cards(self):
        """makes the user go to cards page"""
        token = self.get_token()

        headers_cards = {
            "Authorization": f"Bearer {token}"
        }
        self.client.get(url="/cards", headers=headers_cards)
