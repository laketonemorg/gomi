import React, { useState } from 'react';
import NumberInput from '../NumberInput/NumberInput';

const DEFAULT_VALUE = 1000;
const MIN_VALUE = 1;
const MAX_VALUE = 99999;

const MaxTokensInput = ({ onCommandSet }) => {
  const [value, setValue] = useState(DEFAULT_VALUE);

  const handleValueChange = (newValue) => {
    if (newValue < MIN_VALUE || newValue > MAX_VALUE) {
      newValue = DEFAULT_VALUE;
    }
    setValue(newValue);
  };

  const handleSetClick = () => {
    const command = `--max_tokens ${value}`;
    onCommandSet(command);
  };

  return (
    <div>
      <label>MAXトークン数: </label>
      <NumberInput defaultValue={DEFAULT_VALUE} onChange={handleValueChange} />
      <button onClick={handleSetClick}>数値セット</button>
    </div>
  );
};

export default MaxTokensInput;

