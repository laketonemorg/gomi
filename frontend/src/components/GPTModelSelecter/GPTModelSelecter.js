import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

const GPTModelSelecter = ({ onChange }) => {
    // モデルの選択肢とそれに対応するコマンド
    const models = [
        { display: "GPT-4", command: '--model "gpt-4"' },
        { display: "GPT-4-32k", command: '--model "gpt-4-32k"' },
        { display: "GPT3.5", command: '--model "gpt-3.5-turbo"' },
        { display: "GPT3.5-16k", command: '--model "gpt-3.5-turbo-16k"' },
    ];

    return (
        <Dropdown 
            options={models.map(model => model.display)} 
            onChange={(selected) => {
                const modelCommand = models.find(model => model.display === selected).command;
                onChange(modelCommand);
            }}
        />
    );
};

export default GPTModelSelecter;

