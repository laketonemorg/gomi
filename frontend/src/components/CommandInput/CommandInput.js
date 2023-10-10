import React, { useState } from 'react';
import TextBox from '../TextBox/TextBox.js';

// コマンド入力コンポーネント
const CommandInput = ({ onCommandSubmit }) => {
  // useStateを用いて入力されたコマンドをローカルステートとして管理
  const [command, setCommand] = useState('');

  // テキストボックスの値が変わったときの処理
  const handleInputChange = (value) => {
    setCommand(value);
  };

  // 送信ボタンがクリックされたときの処理
  const handleSubmit = () => {
    // コールバック関数を呼び出して、入力されたコマンドを親コンポーネントに伝える
    onCommandSubmit(command);
    // テキストボックスの内容をリセット
    setCommand('');
  };

  return (
    <div>
      {/* テキストボックスコンポーネントを使ってコマンドを入力 */}
      <TextBox 
        defaultValue={command} 
        onChange={handleInputChange} 
      />
      {/* 送信ボタン */}
      <button onClick={handleSubmit}>
        送信
      </button>
    </div>
  );
};

export default CommandInput;
