import React from "react";
import axios from "axios";

const SessionStart = ({ onSessionStart }) => {
  // セッション開始ロジック
  const startSession = async () => {
    try {
      const response = await axios.post('http://localhost:5000/start');
      onSessionStart(response.data.session_id);
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };

  // ロジックを実行するためのボタンなどのUIは最小限に留める
  return (
    <button onClick={startSession}>
      セッションを開始
    </button>
  );
};

export default SessionStart;
