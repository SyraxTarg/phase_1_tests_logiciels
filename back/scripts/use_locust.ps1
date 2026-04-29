pip install -r requirements.txt

locust --headless -u 50 -r 2 --run-time 2m -f __tests__/load/locustfile.py
