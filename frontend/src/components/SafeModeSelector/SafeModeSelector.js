import React from 'react';
import Dropdown from '../Dropdown/Dropdown.js';

const SafeModeSelector = ({ onCommandChange }) => {
  // セーフモードのオプションを定義
  const options = ['セーフモード: OFF', 'セーフモード: ASK', 'セーフモード: AUTO'];

  // オプションをコマンドに変換する関数
  const optionToCommand = (option) => {
    switch(option) {
      case 'セーフモード: OFF':
        return '--safe_mode off';
      case 'セーフモード: ASK':
        return '--safe_mode ask';
      case 'セーフモード: AUTO':
        return '--safe_mode auto';
      default:
        return '';
    }
  };

  // ドロップダウンメニューの選択が変更されたときに呼び出される関数
  const handleChange = (option) => {
    const command = optionToCommand(option);
    onCommandChange(command);
  };

  return (
    <Dropdown options={options} onChange={handleChange} />
  );
};

export default SafeModeSelector;

