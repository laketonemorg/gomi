import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

const AutoRunToggle = ({ onToggle }) => {
  // チェックボックスの状態が変わるたびに呼び出される関数
  const handleCheckboxChange = (isChecked) => {
    if (isChecked) {
      // チェックボックスがオンの場合、「--auto_run」という値を送る
      onToggle('--auto_run');
    } else {
      // チェックボックスがオフの場合、何も送らない。
      onToggle(null);
    }
  };

  return (
    <Checkbox
      label="自動実行"
      onChange={handleCheckboxChange}
      defaultChecked={false} // デフォルト状態をオフに設定
    />
  );
};

export default AutoRunToggle;
