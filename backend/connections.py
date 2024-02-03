from flask import session, request
from flask_socketio import send, emit, join_room, leave_room
from store import client_info, client_guess, player_score

def connect_to_socket():
    for key in list(session.keys()):
        session.pop(key)
    print('Client connected')

def disconnect_socket():
    for room, members in client_info.items():
        if request.sid in members:
            player = members.pop(request.sid)
            leave_room(room)
            emit('all-members', list(members.values()), to=room)
            emit('user-disconnected', player, to=room)  # Emitting data to other clients
            break
    for room, members in client_guess.items():
        if request.sid in members:
            player = members.pop(request.sid)
            break
    for room, members in player_score.items():
        if request.sid in members:
            player = members.pop(request.sid)
            break