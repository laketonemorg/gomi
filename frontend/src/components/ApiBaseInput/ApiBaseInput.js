import React, { useState } from 'react';
import TextBox from '../TextBox/TextBox.js';

const ApiBaseInput = ({ onApply }) => {
  // テキストボックスの値をローカルステートで管理します。
  const [apiUrl, setApiUrl] = useState('');

  // テキストボックスの値が変わったときのハンドラです。
  const handleTextChange = (value) => {
    setApiUrl(value);
  };

  // 「適用」ボタンがクリックされたときのハンドラです。
  const handleApplyClick = () => {
    // ここで`onApply` propを使って親コンポーネントに新しいAPI URLを伝えます。
    onApply(`interpreter --api_base "${apiUrl}"`);
  };

  return (
    <div>
      <label>
        カスタムAPIのURLを設定:
        <TextBox 
          defaultValue={apiUrl}
          onChange={handleTextChange}
        />
      </label>
      <button onClick={handleApplyClick}>適用</button>
    </div>
  );
};

export default ApiBaseInput;
