import React, { useState } from 'react';
import PropTypes from 'prop-types';

// スライダーコンポーネント
const Slider = ({ min, max, step, defaultValue, onChange }) => {
  // useStateを用いてスライダーの値をローカルステートとして管理します。
  // 初期値はdefaultValue propsで指定された値とします。
  const [value, setValue] = useState(defaultValue);

  // handleChangeはスライダーの値が変わったときに呼び出されます。
  const handleChange = (event) => {
    // スライダーの新しい値をローカルステートにセットします。
    setValue(event.target.value);
    // 親コンポーネントに新しい値を伝えます。
    onChange(event.target.value);
  };

  // inputタグ(type="range")を用いてスライダーを表示します。
  // スライダーの各属性（min, max, step, value）およびイベントハンドラはpropsから得られます。
  return (
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={handleChange} 
    />
  );
};

// PropTypesを用いてpropsの型を指定します。これにより、開発者が意図しない型のpropsを渡した時に警告が表示されます。
Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  defaultValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Slider;
