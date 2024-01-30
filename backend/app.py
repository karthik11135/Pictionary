from flask import Flask, render_template
from flask_socketio import SocketIO, rooms
from flask_socketio import send, emit, join_room, leave_room
from flask_cors import CORS
from flask import session, request
from words import get_random_word
from connections import client_info, connect_to_socket, disconnect_socket
from store import client_info, client_guess, word_of_room

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('chat')
def handle_message(data):
    [message, roomId] = data
    message_with_player = client_info[roomId][request.sid] + ": " + message 
    if client_guess[roomId][request.sid]:
        emit('chat', message_with_player, to=request.sid)
    else:
        emit('chat', message_with_player, to=roomId)
    print(client_info)

@socketio.on('draw')
def draw_canvas(data):
    [sketch, roomId] = data
    print(sketch)
    emit('draw', sketch, to=roomId)

@socketio.on('start_game')
def start_the_game(roomId):
    emit('game_started', client_info[roomId][request.sid], to=roomId, include_self=False)
    generated_word = get_random_word()
    word = generated_word[2:-2]
    emit('game_player', word, to=request.sid)
    word_of_room[roomId] = word
    
@socketio.on('guess_word')
def guess_the_word(data):
    global predict_word_flag
    [word, roomId] = data
    if client_guess[roomId][request.sid] == True or roomId in word_of_room.keys() and word == word_of_room[roomId]:
        emit('word_is_correct', 'yes', to=request.sid)
        client_guess[roomId][request.sid] = True
        print('user has entered a new room')
    else:
        client_guess[roomId][request.sid] = False
        print('user stays in same room')

@socketio.on('create')
def create_room(data):
    roomId, player = data
    join_room(roomId)
    if roomId not in client_info:
        client_info[roomId] = {}
    if roomId not in client_guess:
        client_guess[roomId] = {}
    client_info[roomId][request.sid] = player
    client_guess[roomId][request.sid] = False
    emit('all-members', list(client_info[roomId].values()), to=roomId)

@socketio.on('connect')
def handle_connect():
    connect_to_socket()

@socketio.on('disconnect')
def handle_disconnect():
    disconnect_socket()

if __name__ == '__main__':
    socketio.run(app, debug=True)

