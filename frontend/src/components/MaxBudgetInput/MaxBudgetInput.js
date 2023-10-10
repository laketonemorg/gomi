import React, { useState } from 'react';
import NumberInput from '../NumberInput/NumberInput';

const MaxBudgetInput = ({ onCommandGenerated }) => {
    // ローカルステートで入力された値を管理します
    const [inputValue, setInputValue] = useState(1.00);

    // 入力が変更されたときの処理
    const handleInputChange = (value) => {
        if (value < 0.01 || value > 99.99) {
            setInputValue(1.00);
        } else {
            setInputValue(value);
        }
    };

    // ボタンがクリックされたときの処理
    const handleSubmit = () => {
        // コマンド文を生成し、親コンポーネントに送信します
        onCommandGenerated(`--max_budget ${inputValue.toFixed(2)}`);
    };

    return (
        <div>
            <label>
                セッションの最大予算制限(USD):
                <NumberInput 
                    defaultValue={1.00} 
                    onChange={handleInputChange} 
                />
            </label>
            <button onClick={handleSubmit}>数値セット</button>
        </div>
    );
};

export default MaxBudgetInput;
