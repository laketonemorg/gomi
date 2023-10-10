import React, { useState } from 'react';
import PropTypes from 'prop-types';

// 数値入力フィールドコンポーネント
const NumberInput = ({ defaultValue, onChange }) => {
  // useStateを用いて入力値をローカルステートとして管理します。
  // 初期値はdefaultValue propsで指定された値とします。
  const [value, setValue] = useState(defaultValue);

  // handleChangeは入力値が変わったときに呼び出されます。
  const handleChange = (event) => {
    // 入力値を数値としてローカルステートにセットします。
    // 注意: event.target.valueは文字列なので、Numberを用いて数値に変換します。
    setValue(Number(event.target.value));
    // 親コンポーネントに新しい値を伝えます。
    onChange(Number(event.target.value));
  };

  // inputタグ(type="number")を用いて数値入力フィールドを表示します。
  // 入力フィールドの値およびイベントハンドラはローカルステートおよび上記の関数から得られます。
  return (
    <input 
      type="number" 
      value={value} 
      onChange={handleChange} 
    />
  );
};

// PropTypesを用いてpropsの型を指定します。
NumberInput.propTypes = {
  defaultValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default NumberInput;
