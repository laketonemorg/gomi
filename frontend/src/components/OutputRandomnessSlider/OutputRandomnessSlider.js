import React from 'react';
import Slider from '../Slider/Slider.js';

const OutputRandomnessSlider = ({ onChange }) => {
    // スライダーの値が変わったときのハンドラ
    const handleSliderChange = (value) => {
        // ここで親コンポーネントに値を伝える
        onChange(`--temperature ${value}`);
    };

    return (
        <div>
            <h4>モデルの出力のランダム性</h4>
            <Slider
                min={0.1}
                max={1.0}
                step={0.1}
                defaultValue={0.7}
                onChange={handleSliderChange}
            />
        </div>
    );
};

export default OutputRandomnessSlider;

