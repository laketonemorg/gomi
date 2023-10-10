import React, { useState, useEffect } from 'react';
import LocalExecutionToggle from '../LocalExecutionToggle/LocalExecutionToggle';
import GPTModelSelecter from '../GPTModelSelecter/GPTModelSelecter';
import ApiKeyInput from '../ApiKeyInput/ApiKeyInput';

// CommandComposerコンポーネント定義
// このコンポーネントは子コンポーネントからのコマンド部分を受け取り、
// それを合成して親コンポーネントに返す役割を持っています。
const CommandComposer = ({ onCommandComposed }) => {
  // それぞれの子コンポーネントからのコマンドをローカルステートで管理します。
  const [localExecution, setLocalExecution] = useState(null); // ローカル実行のコマンドを保持します
  const [selectedModel, setSelectedModel] = useState(null);   // 選択されたモデルのコマンドを保持します
  const [apiKey, setApiKey] = useState(null);                 // APIキーのコマンドを保持します
  const [isLocal, setIsLocal] = useState(false); // ローカルモードが有効かどうかのフラグを保持します

  // 各子コンポーネントからのコマンドが変更されたときに実行されるコールバック関数を定義します。
  const handleLocalExecutionToggle = (command) => {
    setLocalExecution(command); // ローカル実行コマンドをセットします
    setIsLocal(!!command);      // ローカルモードフラグを更新します
  };
  const handleModelSelection = (command) => setSelectedModel(command); // モデル選択コマンドをセットします
  const handleApiKeyApply = (command) => setApiKey(command);           // APIキーコマンドをセットします

  // useEffectフックを使用して、コマンドのローカルステートが更新されるたびに
  // 合成コマンドを親コンポーネントに渡します。
  useEffect(() => {
    // すべての非nullコマンドを配列にまとめ、フィルタリングします。
    const commands = [localExecution, selectedModel, apiKey].filter(Boolean);
    // コマンドを単一の文字列に結合します。
    const composedCommand = commands.join(' ');
    // 親コンポーネントに合成コマンドを渡します。
    onCommandComposed(composedCommand);
  }, [localExecution, selectedModel, apiKey]);

  // CommandComposerコンポーネントのレンダリング部分です。
  return (
    <div>
      <h2>コマンド合成コンポーネント</h2>
      {/* 各子コンポーネントをレンダリングし、各コールバック関数をpropsとして渡します。 */}
      <LocalExecutionToggle onToggle={handleLocalExecutionToggle} />
      
      {/* ローカルモードがオフの時だけ、モデルセレクターとAPIキー入力を表示します。 */}
      {!isLocal && (
        <>
          <GPTModelSelecter onChange={handleModelSelection} />
          <ApiKeyInput onApply={handleApiKeyApply} />
        </>
      )}
    </div>
  );
};

export default CommandComposer;
