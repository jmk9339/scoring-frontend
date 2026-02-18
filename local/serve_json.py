from flask import Flask, jsonify
import json
import os

app = Flask(__name__)

JSON_FILE = os.path.join(os.path.dirname(__file__), "hosts.json")

@app.route("/scores")
def get_scores():
    try:
        with open(JSON_FILE, "r") as f:
            data = json.load(f)  # read fresh from file each time
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
