import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ label, onChange, defaultChecked = false }) => {
  // useStateを用いて、チェックボックスの状態を管理するローカルステートを作成します。
  const [checked, setChecked] = useState(defaultChecked);

  // handleChange関数は、チェックボックスの状態が変わるたびに呼び出されます。
  const handleChange = () => {
    // チェックボックスの状態をトグルします。
    setChecked(!checked);
    // 親コンポーネントに新しいチェックボックスの状態を伝えます。
    onChange(!checked);
  };

  return (
    // <label>タグを用いて、チェックボックスとそのラベルテキストを関連付けます。
    <label>
      {/* チェックボックスを表示し、その状態が変わるたびにhandleChange関数を呼び出します。 */}
      <input type="checkbox" checked={checked} onChange={handleChange} />
      {/* ラベルテキストを表示します。 */}
      {label}
    </label>
  );
};

// propTypesを用いてpropsの型を明示します。
Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultChecked: PropTypes.bool,
};

export default Checkbox;
