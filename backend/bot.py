from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    user_message = request.json.get('message')
    response = forward_to_chatbot(user_message)
    return jsonify({"response": response})

def forward_to_chatbot(user_message):
    url = 'https://railresolve-chatbot.streamlit.app/'
    try:
        response = requests.post(url, json={"message": user_message})
        if response.status_code == 200:
            return response.json().get("response", "No response from chatbot")
        else:
            return "Error: Chatbot service is unavailable."
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)
