import React, { useEffect, useState } from 'react';
import { Ansi } from 'ansi-to-react';
import axios from 'axios';
import './CommandExecutor.css';

function CommandExecutor({ inputCommand, sessionId, onOutputChange }) {
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const executeCommand = async () => {
      try {
        setError(null);  // 以前のエラーメッセージをリセット
        setIsLoading(true);  // ローディング状態を開始

        const response = await axios.post('http://localhost:5000/run', {
          session_id: sessionId,
          command: inputCommand,
          reset_session: true
        });

        setIsLoading(false);  // ローディング状態を終了
        
        // サーバーからのレスポンスにエラーが含まれているか確認
        if (response.data.error) {
          setError(`Server Error: ${response.data.error}`);  // エラーメッセージをセット
        } else {
          setOutput(response.data.output);  // 正常な場合、出力結果をセット
        }
        
      } catch (error) {
        setIsLoading(false);  // ローディング状態を終了
        setError(`Error: ${error.toString()}`);  // 通信エラーの場合、エラーメッセージをセット
        setOutput('');  // 出力を空にセット
      }
    };

    if (inputCommand && sessionId) {
      executeCommand();
    }
  }, [inputCommand, sessionId]);

  useEffect(() => {
    onOutputChange(output);
  }, [output, onOutputChange]);

  return (
    <div className="commandExecutor">
      {isLoading && <p className="loading">コマンド実行中...</p>}
      {error && <p className="error">{error}</p>}
      <Ansi>{output}</Ansi>
    </div>
  );
}

export default CommandExecutor;
