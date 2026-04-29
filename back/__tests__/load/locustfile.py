from locust import HttpUser, task, between, events
import time
import os
from dotenv import load_dotenv

load_dotenv()

class MyUser(HttpUser):
    """used to mock a user for locust"""
    PORT = os.getenv("LISTEN_PORT")
    host = f'http://localhost:{PORT}'

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.token = None
        self.token_expiry = 0
        wait_time = between(2,4)

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
            response.failure(f"Login failed with {response.status_code}")
            self.interrupt()

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


@events.quitting.add_listener
def _(environment, **kw):
    if environment.stats.total.fail_ratio > 0.05:
        print("Test échoué : Taux d'erreur > 5%")
        environment.process_exit_code = 1
    else:
        print("Test réussi : Taux d'erreur dans les limites")
        environment.process_exit_code = 0