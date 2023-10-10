import React from "react";
import axios from "axios";

const SessionActions = ({ sessionId, onSessionEnd }) => {
  const endSession = async () => {
    try {
      await axios.post('http://localhost:5000/end', { session_id: sessionId });
      onSessionEnd();
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };

  // ロジックを実行するためのボタンなどのUIは最小限に留める
  return (
    <button onClick={endSession}>
      セッションを終了
    </button>
  );
};

export default SessionActions;
