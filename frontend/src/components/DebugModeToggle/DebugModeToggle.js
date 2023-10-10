import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

const DebugModeToggle = ({ onToggle }) => {
  // チェックボックスの状態が変わるたびに呼び出される関数
  const handleCheckboxChange = (isChecked) => {
    if (isChecked) {
      // チェックボックスがオンの場合、「interpreter --debug_mode」という値を送る
      onToggle('--debug_mode');
    } else {
      // チェックボックスがオフの場合、何も送らないか、別の動作を追加できます。
      onToggle(null);
    }
  };

  return (
    <Checkbox
      label="デバッグモード"
      onChange={handleCheckboxChange}
      defaultChecked={false} // デフォルト状態をオフに設定
    />
  );
};

export default DebugModeToggle;
