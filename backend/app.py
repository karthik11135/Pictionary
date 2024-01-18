from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_socketio import send, emit, join_room, leave_room
from flask_cors import CORS
from flask import session

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route("/")
def hello():
    return "<h2>ye ccctherehnnn </h2>"

@socketio.on('create')
def creat_room(roomId):
    join_room(roomId)

@socketio.on('chat')
def handle_message(data):
    print(data)
    [message, roomId] = data
    emit('chat', message, to=roomId)

@socketio.on('draw')
def draw_canvas(data):
    [sketch, roomId] = data
    print(sketch)
    emit('draw', sketch, to=roomId)
    
@socketio.on('connect')
def handle_connect():
    for key in list(session.keys()):
        session.pop(key)
    print('Client connected')

if __name__ == '__main__':
    socketio.run(app, debug=True)

