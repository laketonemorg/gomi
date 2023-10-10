import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// ファイル選択コンポーネント
const FileSelector = ({ label, onChange }) => {
  // useRefを用いて、ファイルinput要素への参照を作成します。
  const fileInput = useRef(null);

  // handleChangeはファイルが選択されたときに呼び出されます。
  const handleChange = (event) => {
    // event.target.files配列から最初のファイルを取得します。
    const file = event.target.files[0];
    // 親コンポーネントに選択されたファイルを伝えます。
    onChange(file);
  };

  // handleLabelClickはラベルがクリックされたときに呼び出されます。
  const handleLabelClick = () => {
    // ラベルがクリックされたとき、関連する非表示のinput要素をクリックします。
    fileInput.current.click();
  };

  return (
    <div>
      {/* ラベルをクリック可能にし、クリックされたときにhandleLabelClickを呼び出します。 */}
      <label onClick={handleLabelClick} style={{cursor: 'pointer'}}>
        {label}
      </label>
      {/* 非表示のファイルinput要素を作成し、ファイルが選択されたときにhandleChangeを呼び出します。 */}
      <input 
        type="file" 
        style={{display: 'none'}} 
        ref={fileInput}
        onChange={handleChange} 
      />
    </div>
  );
};

// PropTypesを用いてpropsの型を定義します。これにより、開発者が意図しない型のpropsを渡した時に警告が表示されます。
FileSelector.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FileSelector;
