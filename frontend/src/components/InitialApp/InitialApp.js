import React, { useState } from 'react';
import useStartSession from '../useStartSession/useStartSession'; // セッション開始のカスタムフックをインポート

// InitialAppコンポーネントの定義
const InitialApp = ({ onSessionStarted, onApiKeySet }) => {
  // カスタムフックから必要な値や関数を取得
  const { sessionId, error, startSession } = useStartSession();
  
  // ローカルモードのオンオフやAPIキー、コマンドをステートとして保持
  const [localMode, setLocalMode] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [command, setCommand] = useState(localMode ? 'interpreter --local' : '');

  // ローカルモードの切り替えをハンドリングする関数
  const handleToggleMode = () => {
    // ローカルモードのオンオフを切り替え
    setLocalMode(!localMode);
    // コマンドをローカルモードに合わせて更新
    setCommand(!localMode ? 'interpreter --local' : `interpreter --api_key "${apiKey}"`);
  };

  // APIキーの入力変更をハンドリングする関数
  const handleApiKeyChange = (e) => {
    // APIキーをステートに保存
    setApiKey(e.target.value);
    // コマンドを更新（APIキーを含める）
    setCommand(`interpreter --api_key "${e.target.value}"`);
  };

  // 「Start」ボタンをクリックした際のハンドリング関数
  const handleStart = async () => {
    // セッションを開始
    await startSession();

    // セッションIDが存在し、エラーがない場合
    if (sessionId && !error) {
      // APIキーを親コンポーネントに渡す
      onApiKeySet(apiKey);
      // セッションIDとコマンドを親コンポーネントに渡す
      onSessionStarted(sessionId, command);
    }
  };

  // UIのレンダリング
  return (
    <div>
      <h1>Start Session</h1>
      
      {/* ローカルモードの切り替えチェックボックス */}
      <label>
        <input type="checkbox" checked={localMode} onChange={handleToggleMode} />
        Local Mode
      </label>
      
      {/* ローカルモードがオフの場合、APIキーの入力欄を表示 */}
      {!localMode && (
        <>
          <label>
            API Key: 
            {/* APIキーの入力欄 */}
            <input type="text" value={apiKey} onChange={handleApiKeyChange} />
          </label>
        </>
      )}

      {/* セッション開始ボタン */}
      <button onClick={handleStart}>Start</button>
      
      {/* エラーメッセージの表示 */}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default InitialApp; // InitialAppコンポーネントをエクスポート
