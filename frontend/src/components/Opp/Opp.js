import React, { useState } from 'react';
import InitialApp from './InitialApp';
import CentralManager from './CentralManager';

const Opp = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionData, setSessionData] = useState({
    sessionId: null,
    apiKey: null,
  });

  // セッションが開始されると呼び出されるハンドラ
  const handleSessionStarted = (sessionId, command) => {
    setSessionData((prevData) => ({
      ...prevData,
      sessionId,
      command,
    }));
    setIsInitialized(true);
  };

  // APIキーがセットされると呼び出されるハンドラ
  const handleApiKeySet = (apiKey) => {
    setSessionData((prevData) => ({
      ...prevData,
      apiKey,
    }));
  };

  return (
    <div className="opp-component">
      {isInitialized ? (
        <CentralManager
          initialSessionId={sessionData.sessionId}
          apiKey={sessionData.apiKey}
        />
      ) : (
        <InitialApp
          onSessionStarted={handleSessionStarted}
          onApiKeySet={handleApiKeySet}
        />
      )}
    </div>
  );
};

export default Opp;
