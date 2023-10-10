import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

const LocalExecutionToggle = ({ onToggle }) => {
  // チェックボックスの状態が変わるたびに呼び出される関数
  const handleCheckboxChange = (isChecked) => {
    if (isChecked) {
      // チェックボックスがオンの場合、「interpreter --local」という値を送る
      onToggle('--local');
    } else {
      // チェックボックスがオフの場合、何も送らないか、別の動作を追加できます。
      onToggle(null);
    }
  };

  return (
    <Checkbox
      label="ローカルモード"
      onChange={handleCheckboxChange}
      defaultChecked={false} // デフォルト状態をオフに設定
    />
  );
};

export default LocalExecutionToggle;
