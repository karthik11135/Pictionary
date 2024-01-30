import queue
game_pointer = queue.Queue()

client_info = {} #contains info about users, includes sid, roomIds, names
client_guess = {} #contains bool if client answered correctly or not
word_of_room = {} #contains the word for a specific room