import { useState } from 'react';
import axios from 'axios';

/**
 * useStartSession
 * 
 * このカスタムフックは、サーバー上で新しいセッションを開始し、
 * セッションIDを取得するためのロジックを提供します。
 * 
 * @return {object} - セッション関連のデータと操作を提供するオブジェクト。
 *   @property {string|null} sessionId - 開始されたセッションのID。セッションが開始されていない場合はnull。
 *   @property {Error|null} error - セッション開始処理中に発生したエラー。エラーがない場合はnull。
 *   @property {function} startSession - セッションを開始するための関数。
 */
const useStartSession = () => {
  // セッションIDとエラー情報を管理するためのローカルステート
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);

  /**
   * startSession
   * 
   * サーバーにHTTP POSTリクエストを送信して新しいセッションを開始し、
   * レスポンスから得られたセッションIDをローカルステートに保存します。
   * エラーが発生した場合は、エラーオブジェクトをローカルステートに保存します。
   */
  const startSession = async () => {
    try {
      // サーバーにリクエストを送信
      const response = await axios.post('http://localhost:5000/start');
      
      // レスポンスからセッションIDを取得し、ステートを更新
      setSessionId(response.data.session_id);
    } catch (error) {
      // エラーログをコンソールに出力し、エラーステートを更新
      console.error("Error starting session:", error);
      setError(error);
    }
  };

  // カスタムフックからセッションID、エラー、startSession関数を返す
  return { sessionId, error, startSession };
};

export default useStartSession;
