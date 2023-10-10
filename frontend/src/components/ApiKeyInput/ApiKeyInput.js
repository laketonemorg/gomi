import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PasswordField from '../PasswordField/PasswordField';

const ApiKeyInput = ({ onApply }) => {
    // APIキーの値をローカルステートとして管理します。
    const [apiKey, setApiKey] = useState('');

    // APIキーの値が変更されたときのハンドラー
    const handleApiKeyChange = (value) => {
        setApiKey(value);
    };

    // 「適用」ボタンがクリックされたときのハンドラー
    const handleApplyClick = () => {
        // `interpreter --api_key "{apiKey}"` 形式でAPIキーを親コンポーネントに渡す
        onApply(`--api_key "${apiKey}"`);
    };

    return (
        <div>
            <label>
                APIキーを入力:
                <PasswordField defaultValue="" onChange={handleApiKeyChange} />
            </label>
            <button onClick={handleApplyClick}>適用</button>
        </div>
    );
};

ApiKeyInput.propTypes = {
    onApply: PropTypes.func.isRequired,
};

export default ApiKeyInput;
