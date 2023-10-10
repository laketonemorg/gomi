import React, { useState, useEffect } from 'react';
import CommandExecutor from '..CommandExecutor/CommandExecutor';
import InteractiveSession from '..InteractiveSession/InteractiveSession';
import useStartSession from '..useStartSession/useStartSession'; // 適切なパスを設定してください

const SessionContainer = ({ children }) => {
  // useStartSessionフックを使用してセッション関連のデータと関数を取得します。
  const { sessionId, error, startSession } = useStartSession();

  // 実行結果を保持するためのステートを作成します。
  const [commandOutput, setCommandOutput] = useState('');

  // children（子コンポーネント）にpropsを渡して呼び出します。
  return children({ sessionId, error, startSession, commandOutput, setCommandOutput });
};

export default SessionContainer;
