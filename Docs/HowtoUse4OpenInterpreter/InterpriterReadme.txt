TLDR:

OpenInterpreterは、ChatGPTのような自然言語インターフェースを使用して、ローカル環境でコードを実行できるツールです。Python、Javascript、Shellなどの複数の言語をサポートし、ストリーミング、インタラクティブチャット、セッションの保存/復元などの高度な機能を提供しています。
概要:

OpenInterpreterは、自然言語の指示を受け取り、それに基づいてコードを実行するツールです。OpenAIのChatGPTのようなインターフェースを持ちながら、ユーザーのローカル環境で動作します。これにより、インターネットの接続なしで、任意のパッケージやライブラリを使用してタスクを実行することができます。さらに、OpenInterpreterは会話の履歴を保持し、チャットを保存して後で再開することもできます。また、言語モデルの変更、デバッグモードの利用、システムメッセージのカスタマイズなどの柔軟な機能も提供しています。


Open Interpreterの使い方と機能のまとめ

1. 基本のインストールと実行:
   - インストール: 
     pip install open-interpreter
   - ターミナルでの実行: 
     interpreter

2. Pythonでの使用:
   - シングルコマンドの実行:
     interpreter.chat("Plot AAPL and META's normalized stock prices")
   - インタラクティブチャットの開始:
     interpreter.chat()

3. ストリーミング機能:
   message = "What operating system are we on?"
   for chunk in interpreter.chat(message, display=False, stream=True):
       print(chunk)

4. プログラム的なチャット:
   interpreter.chat("Add subtitles to all videos in /videos.")
   interpreter.chat("These look great but can you make the subtitles bigger?")

5. 新しいチャットの開始:
   interpreter.reset()

6. チャットの保存と復元:
   messages = interpreter.chat("My name is Killian.")
   interpreter.reset()
   interpreter.messages = messages

7. システムメッセージのカスタマイズ:
   interpreter.system_message += "Run shell commands with -y so the user doesn't have to confirm them."

8. 言語モデルの変更:
   interpreter --model gpt-3.5-turbo
   interpreter.model = "gpt-3.5-turbo"

9. インタラクティブモードのコマンド:
   - デバッグモード: %debug [true/false]
   - セッションのリセット: %reset
   - 前のメッセージの削除: %undo
   - メッセージの保存: %save_message [path]
   - メッセージの読み込み: %load_message [path]
   - ヘルプの表示: %help

10. 設定:
   interpreter --config

11. ローカルでの実行:
   interpreter --local
