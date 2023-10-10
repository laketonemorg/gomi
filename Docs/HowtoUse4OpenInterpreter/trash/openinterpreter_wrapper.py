import interpreter
import os
# interpreterモジュールは直接メソッドを提供しており、そのメソッドを直接呼び出す形で利用することができる
class OpenInterpreterWrapper:
    def __init__(self):
        # 初期化処理
        self.interpreter = interpreter  # interpreterモジュールのインスタンスを作成
        self.interpreter_messages = []  # interpreterのメッセージを格納するリスト
        
    def set_model(self, model_name):
        # 使用するモデルを設定する
        self.interpreter.model = model_name  # 使用する言語モデルを設定する

    def set_local(self, flag):
        # モデルの実行場所を設定する
        self.interpreter.local = flag  # モデルがローカルで実行される場合はTrue、クラウドで実行される場合はFalse

    def set_auto_run(self, flag):
        # コードの自動実行を設定する
        self.interpreter.auto_run = flag  # Trueの場合、生成されたコードはユーザーの確認なしに自動で実行される

    def set_debug_mode(self, flag):
        # デバッグモードの設定
        self.interpreter.debug_mode = flag  # デバッグモード。Trueであれば各ステップで情報が印刷される

    def set_max_output(self, tokens):
        # 出力の最大トークン数を設定する
        self.interpreter.max_output = tokens  # 出力応答の最大トークン数を設定する

    def set_conversation_history(self, flag):
        # 会話の履歴を保存するかの設定
        self.interpreter.conversation_history = flag  # Trueの場合、会話履歴が保存される

    def set_conversation_filename(self, filename):
        # 会話の履歴のファイル名を設定する
        self.interpreter.conversation_filename = filename  # 会話履歴を保存するファイルの名前を設定する

    def set_conversation_history_path(self, path):
        # 会話の履歴の保存先パスを設定する
        self.interpreter.conversation_history_path = path  # 会話履歴を保存するパスを設定する

    def set_temperature(self, temp):
        # モデルの出力のランダム性を設定する
        self.interpreter.temperature = temp  # モデルの出力のランダム性を設定する。数値が高いほど出力はランダムになる

    def set_context_window(self, tokens):
        # コンテキストウィンドウのサイズを設定する
        self.interpreter.context_window = tokens  # コンテキストウィンドウのサイズをトークンで設定する

    def set_max_tokens(self, tokens):
        # レスポンスの最大トークン数を設定する
        self.interpreter.max_tokens = tokens  # モデルが一度に生成できる最大トークン数を設定する

    def set_api_base(self, api_url):
     # カスタムAPIのベースURLを設定する
        self.interpreter.api_base = api_url  
        # カスタムAPIのベースURLを設定する。このエリアの意味は以下のコメントを参照
        # デフォルトでOpenAIのAPIエンドポイントが利用できないときは、
        # 以下のURLを参照して適切に値を渡すこと。
        # https://platform.openai.com/docs/models/model-endpoint-compatibility


    def set_api_key(self, api_key):
        # APIキーを設定する
        self.interpreter.api_key = api_key  # カスタムAPIの認証用APIキーを設定する

    def set_max_budget(self, budget):
        # セッションの最大予算を設定する
        self.interpreter.max_budget = budget  # セッションの最大予算をUSDで設定する

    def chat(self, message, stream=False, display=False):
        # Open Interpreterとのチャットを行う
        response = self.interpreter.chat(message, stream=stream, display=display)  # stream=Trueでメッセージ、コード、コード出力をストリーミングする
        if stream:
            return list(response)
        else:
            return response

    def get_messages(self):
        # これまでの会話のメッセージを取得する
        return self.interpreter.messages  # ユーザーとインタープリタの間のメッセージのリストを取得する

    def customize_system_message(self, custom_message):
        self.interpreter.system_message += custom_message  # システムメッセージをカスタマイズする

    def get_system_message(self):
        return self.interpreter.system_message  # 現在のシステムメッセージを取得する

    def save_chat(self):
        return self.interpreter.messages  # 現在のチャットの履歴を取得する

    def restore_chat(self, messages):
        self.interpreter.messages = messages  # 保存されたチャットの履歴を復元する

# 使用例:
wrapper = OpenInterpreterWrapper()
wrapper.set_model("gpt-3.5-turbo")
wrapper.set_local(True)
response = wrapper.chat("Hello, OpenAI!")
print(response)
