from flask import Flask, jsonify
import psycopg2
import redis
import os

app = Flask(__name__)

# Config Redis
cache = redis.Redis(host='redis', port=6379)

# Config DB
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host="postgres",
            database=os.environ.get('POSTGRES_DB', 'ecommerce_db'),
            user=os.environ.get('POSTGRES_USER', 'admin'),
            password=os.environ.get('POSTGRES_PASSWORD', 'admin')
        )
        return conn
    except Exception as e:
        return None

@app.route('/')
def hello():
    count = cache.incr('hits')
    return jsonify({"message": "Hello from Flask!", "visits": count})

@app.route('/health')
def health():
    conn = get_db_connection()
    if conn:
        conn.close()
        return "OK", 200
    return "Database Unavailable", 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
