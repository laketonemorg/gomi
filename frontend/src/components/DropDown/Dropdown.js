import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({ options, onChange }) => {
  // useStateを用いて、選択されたオプションを管理するローカルステートを作成します。
  // 初期値はoptionsの最初の要素です。
  const [selected, setSelected] = useState(options.length > 0 ? options[0] : "");

  // handleChange関数は、ユーザーがオプションを選択した時に呼び出されます。
  const handleChange = (event) => {
    // 選択されたオプションをローカルステートにセットします。
    setSelected(event.target.value);
    // 親コンポーネントに選択されたオプションを伝えます。
    onChange(event.target.value);
  };

  return (
    // selectタグを用いてドロップダウンメニューを作成します。
    <select value={selected} onChange={handleChange}>
      {/* options配列をmapを用いて<option>タグに変換します。 */}
      {options.map((option) => (
        // 各<option>タグのvalueおよび表示内容はoption変数に等しいです。
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

// propTypesを用いてpropsの型を明示します。
Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;

