from flask import Flask, request, jsonify
from openinterpreter_wrapper import OpenInterpreterWrapper
from flask_cors import CORS

app = Flask(__name__)
wrapper = OpenInterpreterWrapper()
CORS(app)

# モデルの設定
@app.route('/set_model', methods=['POST'])
def set_model():
    data = request.json
    model_name = data.get('model_name', '')
    wrapper.set_model(model_name)
    return jsonify({"message": "モデルが設定されました", "model_name": model_name})


# ローカルフラグの設定
@app.route('/set_local', methods=['POST'])
def set_local():
    data = request.json
    flag = data.get('flag', False)
    wrapper.set_local(flag)
    return jsonify({"message": "ローカルフラグが設定されました", "flag": flag})


# オートランフラグの設定
@app.route('/set_auto_run', methods=['POST'])
def set_auto_run():
    data = request.json
    flag = data.get('flag', False)
    wrapper.set_auto_run(flag)
    return jsonify({"message": "オートランが設定されました", "flag": flag})


# デバッグモードの設定
@app.route('/set_debug_mode', methods=['POST'])
def set_debug_mode():
    data = request.json
    flag = data.get('flag', False)
    wrapper.set_debug_mode(flag)
    return jsonify({"message": "デバッグモードが設定されました", "flag": flag})


# 会話の履歴の設定
@app.route('/set_conversation_history', methods=['POST'])
def set_conversation_history():
    data = request.json
    flag = data.get('flag', False)
    wrapper.set_conversation_history(flag)
    return jsonify({"message": "会話の履歴が設定されました", "flag": flag})


# 会話の履歴のファイル名の設定
@app.route('/set_conversation_filename', methods=['POST'])
def set_conversation_filename():
    data = request.json
    filename = data.get('filename', '')
    wrapper.set_conversation_filename(filename)
    return jsonify({"message": "会話の履歴のファイル名が設定されました", "filename": filename})


# 会話の履歴の保存先パスの設定
@app.route('/set_conversation_history_path', methods=['POST'])
def set_conversation_history_path():
    data = request.json
    path = data.get('path', '')
    wrapper.set_conversation_history_path(path)
    return jsonify({"message": "会話の履歴の保存先パスが設定されました", "path": path})


# モデルの出力のランダム性の設定
@app.route('/set_temperature', methods=['POST'])
def set_temperature():
    data = request.json
    temp = data.get('temp', 0.0)
    wrapper.set_temperature(temp)
    return jsonify({"message": "モデルの出力のランダム性が設定されました", "temp": temp})


# コンテキストウィンドウのサイズの設定
@app.route('/set_context_window', methods=['POST'])
def set_context_window():
    data = request.json
    tokens = data.get('tokens', 0)
    wrapper.set_context_window(tokens)
    return jsonify({"message": "コンテキストウィンドウのサイズが設定されました", "tokens": tokens})


# カスタムAPIのベースURLの設定
@app.route('/set_api_base', methods=['POST'])
def set_api_base():
    data = request.json
    api_url = data.get('api_url', '')
    wrapper.set_api_base(api_url)
    return jsonify({"message": "カスタムAPIのベースURLが設定されました", "api_url": api_url})


# APIキーの設定
@app.route('/set_api_key', methods=['POST'])
def set_api_key():
    data = request.json
    api_key = data.get('api_key', '')
    wrapper.set_api_key(api_key)
    return jsonify({"message": "APIキーが設定されました", "api_key": api_key})

# 最大アウトプットトークン数の設定
@app.route('/set_max_output', methods=['POST'])
def set_max_output():
    data = request.json
    tokens = data.get('tokens', 0)
    wrapper.set_max_output(tokens)
    return jsonify({"message": "最大アウトプットトークン数が設定されました", "tokens": tokens})

# 最大トークン数の設定
@app.route('/set_max_tokens', methods=['POST'])
def set_max_tokens():
    data = request.json
    tokens = data.get('tokens', 0)
    wrapper.set_max_tokens(tokens)
    return jsonify({"message": "最大トークン数が設定されました", "tokens": tokens})

# 最大予算の設定
@app.route('/set_max_budget', methods=['POST'])
def set_max_budget():
    data = request.json
    budget = data.get('budget', 0)
    wrapper.set_max_budget(budget)
    return jsonify({"message": "最大予算が設定されました", "budget": budget})

# メッセージの送信と応答の取得
@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '')
    response = wrapper.chat(message)
    return jsonify(response)

# メッセージの取得
@app.route('/get_messages', methods=['GET'])
def get_messages():
    messages = wrapper.get_messages()
    return jsonify(messages)

# チャットの保存
@app.route('/save_chat', methods=['GET'])
def save_chat():
    messages = wrapper.save_chat()
    return jsonify(messages)

# チャットの復元
@app.route('/restore_chat', methods=['POST'])
def restore_chat():
    data = request.json
    messages = data.get('messages', [])
    wrapper.restore_chat(messages)
    return jsonify({"message": "チャット履歴が復元されました"})

# システムメッセージのカスタマイズ
@app.route('/customize_system_message', methods=['POST'])
def customize_system_message():
    data = request.json
    custom_message = data.get('custom_message', '')
    wrapper.customize_system_message(custom_message)
    return jsonify({"message": "システムメッセージがカスタマイズされました", "custom_message": custom_message})

# システムメッセージの取得
@app.route('/get_system_message', methods=['GET'])
def get_system_message():
    system_message = wrapper.get_system_message()
    return jsonify({"system_message": system_message})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)

