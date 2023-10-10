import React, { useState } from 'react';
import axios from 'axios';

// AppExitコンポーネントの定義
function AppExit({ sessionID, onExit }) {
    // エラーメッセージの状態を管理するためのuseState
    const [errorMessage, setErrorMessage] = useState(null);

    // 終了ボタンがクリックされたときの処理
    const handleExitClick = async () => {
        try {
            // サーバーの/endエンドポイントに終了リクエストを送信
            const response = await axios.post('http://localhost:5000/end', {
                session_id: sessionID
            });

            // レスポンスが正常であれば、onExitコールバックを実行
            if (response.data.status === 'Session terminated') {
                onExit();
            } else {
                // エラーメッセージをセット
                setErrorMessage(response.data.error || '不明なエラーが発生しました。');
            }
        } catch (error) {
            // 通信エラーやサーバーエラーが発生した場合の処理
            setErrorMessage('終了リクエスト中にエラーが発生しました。');
        }
    };

    return (
        <div>
            {/* 終了ボタン */}
            <button onClick={handleExitClick}>アプリケーションを終了</button>

            {/* エラーメッセージがあれば表示 */}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}

export default AppExit;
