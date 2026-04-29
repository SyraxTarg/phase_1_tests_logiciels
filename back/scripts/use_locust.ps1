pip install -r requirements.txt

locust --headless --users 10 --spawn-rate 1 -t 2m -f __tests__/load/locustfile.py
