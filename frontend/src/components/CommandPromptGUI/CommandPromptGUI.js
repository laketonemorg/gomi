import React, { useRef, useEffect } from 'react';
import AnsiToReact from 'ansi-to-react';

function CommandPromptGUI({ history }) {
  // スクロールを管理するためのrefを作成
  const endOfHistoryRef = useRef(null);

  // historyが更新されたとき、スクロール位置を最新に移動
  useEffect(() => {
    if (endOfHistoryRef.current) {
      endOfHistoryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className="command-prompt-gui">
      {/* 履歴をマッピングして表示 */}
      {history.map((entry, index) => (
        <div key={index}>
          {/* 入力と出力を区別して表示 */}
          {entry.type === 'input' ? '> ' : ''}
          {entry.type === 'output' ? (
            <AnsiToReact>{entry.content}</AnsiToReact>
          ) : (
            entry.content
          )}
        </div>
      ))}
      {/* スクロール管理用のdiv */}
      <div ref={endOfHistoryRef}></div>
    </div>
  );
}

export default CommandPromptGUI;

