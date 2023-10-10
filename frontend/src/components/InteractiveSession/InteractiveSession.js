import React, { useEffect } from 'react';
import axios from 'axios';

// `InteractiveSession` コンポーネント定義
// このコンポーネントはAPIとの通信を担当し、UIの描画は行いません。
function InteractiveSession({ inputCommand, sessionId, onOutputChange }) {
  
  // `useEffect` フックを使用して、APIリクエストのロジックを実装します。
  // `useEffect` は、`inputCommand` が変更された時に実行されます。
  useEffect(() => {
    
    // `executeCommand` 関数定義
    // この関数はAPIにコマンドを送信し、結果を取得する非同期関数です。
    const executeCommand = async () => {
      try {
        // APIエンドポイントにPOSTリクエストを送信します。
        // リクエストボディには `session_id` と `command` を含めます。
        const response = await axios.post('http://localhost:5000/run', {
          session_id: sessionId,
          command: inputCommand
        });
        
        // APIからのレスポンスを `onOutputChange` コールバックを通じて
        // 親コンポーネントに渡します。
        onOutputChange(response.data.output);
      } catch (error) {
        // エラーが発生した場合（ネットワークエラー、APIエラーなど）、
        // エラーメッセージを `onOutputChange` コールバックを通じて
        // 親コンポーネントに渡します。
        onOutputChange(`Error: ${error.toString()}`);
      }
    };

    // `inputCommand` と `sessionId` が有効な場合（nullやundefined、空文字でない場合）
    // `executeCommand` 関数を実行します。
    if (inputCommand && sessionId) {
      executeCommand();
    }
  }, [inputCommand, sessionId, onOutputChange]);

  // このコンポーネントはUIを持たないため、nullを返します。
  return null;
}

export default InteractiveSession;


