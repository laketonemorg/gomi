from flask import Flask, request, jsonify
import subprocess
import uuid

app = Flask(__name__)

# sessions: セッションIDとそれに紐づくsubprocessを保持する辞書
sessions = {}

@app.route('/start', methods=['POST'])
def start_session():
    """
    新しいセッションを開始し、セッションIDをクライアントに返します。
    """
    # ユニークなセッションIDを生成
    session_id = str(uuid.uuid4())
    
    # セッションIDに紐づくsubprocessを作成し、sessions辞書に格納
    sessions[session_id] = subprocess.Popen(
        ['bash'], 
        stdin=subprocess.PIPE, 
        stdout=subprocess.PIPE, 
        stderr=subprocess.PIPE,  # stderrもハンドリングします
        text=True, 
        bufsize=1,
        shell=True
    )
    
    # セッションIDをクライアントに返却
    return jsonify({'session_id': session_id})

@app.route('/run', methods=['POST'])
def run_command():
    """
    クライアントから送信されたコマンドを実行し、結果を返します。
    """
    try:
        # クライアントから送信されたデータを取得
        data = request.get_json()
        session_id = data.get('session_id')
        command = data.get('command')
        reset_session = data.get('reset_session', False)
        
        # 入力値のバリデーション
        if not session_id or not command:
            return jsonify({'error': 'Session ID and command are required'}), 400
        
        # sessions辞書からセッションIDに紐づくsubprocessを取得
        session = sessions.get(session_id)
        
        if session:
            if reset_session:
                session.terminate()
                sessions[session_id] = subprocess.Popen(
                    ['bash'], 
                    stdin=subprocess.PIPE, 
                    stdout=subprocess.PIPE, 
                    stderr=subprocess.PIPE,  # stderrもハンドリングします
                    text=True, 
                    bufsize=1,
                    shell=True
                )
                session = sessions[session_id]
                
                # 新しいセッションで仮想環境をアクティベート
                venv_activation_cmd = "source /root/miniforge/bin/activate myenv\n"
                session.stdin.write(venv_activation_cmd)
                session.stdin.flush()
            
            # subprocessにコマンドを書き込み
            session.stdin.write(command + "\n")
            session.stdin.flush()
            
            # subprocessからの出力を読み取り
            output = session.stdout.readline()
            error = session.stderr.readline()  # エラー出力を読み取ります
            
            # 出力とエラー出力をクライアントに返却
            return jsonify({'output': output.strip(), 'error': error.strip()})
        else:
            return jsonify({'error': 'Invalid session ID'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/end', methods=['POST'])
def end_session():
    """
    指定されたセッションIDに紐づくsubprocessを終了し、sessions辞書から該当するセッションを削除します。
    """
    try:
        # クライアントから送信されたデータを取得
        data = request.get_json()
        session_id = data.get('session_id')
        
        # 入力値のバリデーション
        if not session_id:
            return jsonify({'error': 'Session ID is required'}), 400
        
        # sessions辞書からセッションIDに紐づくsubprocessを取得し、削除
        session = sessions.pop(session_id, None)
        if session:
            # subprocessを終了
            session.terminate()
            return jsonify({'status': 'Session terminated'})
        else:
            return jsonify({'error': 'Invalid session ID'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # 開発用サーバーを起動
    app.run(port=5000)
