import React, { useState } from "react";
import SessionStart from "./SessionStart";
import SessionActions from "./SessionActions";

const SessionManager = () => {
  const [sessionId, setSessionId] = useState(null);

  return (
    <div>
      {sessionId ? (
        <>
          <SessionActions sessionId={sessionId} onSessionEnd={() => setSessionId(null)} />
        </>
      ) : (
        <SessionStart onSessionStart={setSessionId} />
      )}
    </div>
  );
};

export default SessionManager;
