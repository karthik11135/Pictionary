from flask import Flask, render_template
from flask_socketio import SocketIO, rooms
from flask_socketio import send, emit, join_room, leave_room
from flask_cors import CORS
from flask import session, request

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

client_info = {}

@socketio.on('chat')
def handle_message(data):
    [message, roomId] = data
    message_with_player = client_info[roomId][request.sid] + ": " + message 
    emit('chat', message_with_player, to=roomId)

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

@socketio.on('create')
def create_room(data):
    roomId, player = data
    join_room(roomId)
    if roomId not in client_info:
        client_info[roomId] = {}
    client_info[roomId][request.sid] = player
    emit('all-members', list(client_info[roomId].values()), to=roomId)

@socketio.on('disconnect')
def handle_disconnect():
    for room, members in client_info.items():
        if request.sid in members:
            player = members.pop(request.sid)
            leave_room(room)
            emit('all-members', list(members.values()), to=room)
            emit('user-disconnected', player, to=room)  # Emitting data to other clients
            break

if __name__ == '__main__':
    socketio.run(app, debug=True)

