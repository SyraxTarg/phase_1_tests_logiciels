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
def check_fail_ratio(environment, **kw):
    # On accède au Runner (c'est lui qui agrège tout en mode headless)
    if environment.runner:
        stats = environment.runner.stats.total
        
        # On recalcule manuellement pour être sûr
        total = stats.num_requests
        fails = stats.num_failures
        
        if total > 0:
            actual_ratio = fails / total
        else:
            actual_ratio = 0

        print(f"\n--- VÉRIFICATION FINALE DES STATISTIQUES ---")
        print(f"Requêtes : {total} | Échecs : {fails}")
        print(f"Taux d'échec réel : {actual_ratio:.2%}")

        if actual_ratio > 0.05:
            print(f"❌ TEST ÉCHOUÉ : {actual_ratio:.2%} > 5%")
            # sys.exit(1) est radical mais garantit l'arrêt de la CI
            environment.process_exit_code = 1
        else:
            print(f"✅ TEST RÉUSSI : {actual_ratio:.2%} <= 5%")
            environment.process_exit_code = 0