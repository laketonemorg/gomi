import React, { useState } from 'react';
import PropTypes from 'prop-types';

// パスワードフィールドコンポーネント
const PasswordField = ({ defaultValue, onChange }) => {
  // useStateを用いてパスワードフィールドの値をローカルステートとして管理します。
  // 初期値はdefaultValue propsで指定された値とします。
  const [value, setValue] = useState(defaultValue);

  // handleChangeはパスワードフィールドの値が変わったときに呼び出されます。
  const handleChange = (event) => {
    // 新しい値をローカルステートにセットします。
    setValue(event.target.value);
    // 親コンポーネントに新しい値を伝えます。
    onChange(event.target.value);
  };

  // inputタグ(type="password")を用いてパスワードフィールドを表示します。
  // パスワードフィールドの値およびイベントハンドラはローカルステートおよび上記の関数から得られます。
  return (
    <input 
      type="password" 
      value={value} 
      onChange={handleChange} 
    />
  );
};

// PropTypesを用いてpropsの型を指定します。これにより、開発者が意図しない型のpropsを渡した時に警告が表示されます。
PasswordField.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PasswordField;
