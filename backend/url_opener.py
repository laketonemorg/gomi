from flask import Flask, request
from flask_socketio import SocketIO, emit

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/open', methods=['POST'])
def open_url():
    url = request.form.get('url')
    socketio.emit('open_url', {'url': url})
    return "Request received"

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001)
