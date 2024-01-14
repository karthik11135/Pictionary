from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_socketio import send, emit
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def hello():
    return "<h2>ye ccctherehnnn </h2>"

@socketio.on('chat')
def handle_message(data):
    print(data)
    emit('chat', data, broadcast=True)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

if __name__ == '__main__':
    socketio.run(app)

