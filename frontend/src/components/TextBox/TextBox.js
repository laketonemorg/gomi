import React, { useState } from 'react';
import PropTypes from 'prop-types';

// テキストボックスコンポーネント
const TextBox = ({ defaultValue, onChange }) => {
  // useStateを用いてテキストボックスの値をローカルステートとして管理します。
  // 初期値はdefaultValue propsで指定された値とします。
  const [value, setValue] = useState(defaultValue);

  // handleChangeはテキストボックスの値が変わったときに呼び出されます。
  const handleChange = (event) => {
    // 新しい値をローカルステートにセットします。
    setValue(event.target.value);
    // 親コンポーネントに新しい値を伝えます。
    onChange(event.target.value);
  };

  // inputタグ(type="text")を用いてテキストボックスを表示します。
  // テキストボックスの値およびイベントハンドラはローカルステートおよび上記の関数から得られます。
  return (
    <input 
      type="text" 
      value={value} 
      onChange={handleChange} 
    />
  );
};

// PropTypesを用いてpropsの型を指定します。これにより、開発者が意図しない型のpropsを渡した時に警告が表示されます。
TextBox.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextBox;

