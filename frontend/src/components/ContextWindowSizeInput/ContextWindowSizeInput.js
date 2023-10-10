import React, { useState } from 'react';
import NumberInput from '../NumberInput/NumberInput';

const ContextWindowSizeInput = ({ onCommandSet }) => {
    const [value, setValue] = useState(16000);  // 初期値は16000

    const handleValueChange = (newValue) => {
        // 数値が1から99999の範囲外の場合、デフォルト値をセット
        if (newValue < 1 || newValue > 99999) {
            setValue(16000);
        } else {
            setValue(newValue);
        }
    };

    const handleButtonClick = () => {
        // コマンド文を生成
        const command = `--context_window ${value}`;
        // コマンド文を親コンポーネントに渡す
        onCommandSet(command);
    };

    return (
        <div>
            <label>
                コンテキストウィンドウサイズ(not トークン数):
                <NumberInput 
                    defaultValue={16000} 
                    onChange={handleValueChange} 
                />
            </label>
            <button onClick={handleButtonClick}>数値セット</button>
        </div>
    );
};

export default ContextWindowSizeInput;