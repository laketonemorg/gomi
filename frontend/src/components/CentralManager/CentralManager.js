import React, { useState, useCallback } from 'react';
import CommandInput from '../CommandInput/CommandInput';
import CommandPreset from '../CommandPreset/CommandPreset';
import InteractiveSession from '../InteractiveSession/InteractiveSession';
import CommandPromptGUI from '../CommandPromptGUI/CommandPromptGUI';
import AppExit from '../AppExit/AppExit';

const CentralManager = ({ initialSessionId }) => {
    // 各種ステートを定義します。
    const [sessionID, setSessionID] = useState(initialSessionId);
    const [commandHistory, setCommandHistory] = useState([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [apiOutput, setApiOutput] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // コマンドを送信した際のハンドラです。
    const handleCommandSubmit = useCallback((command) => {
        setCommandHistory(prev => [...prev, {type: 'input', content: command}]);
        setCurrentCommand(command);
    }, []);

    // コマンドが変更された際のハンドラです。
    const handleCommandChange = useCallback((command) => {
        setCurrentCommand(command);
    }, []);

    // APIからの出力を受け取るハンドラです。
    const handleOutputChange = useCallback((output) => {
        setCommandHistory(prev => [...prev, {type: 'output', content: output}]);
        setApiOutput(output);
    }, []);

    // アプリケーションの終了ハンドラです。
    const handleExit = useCallback(() => {
        // ここにアプリケーション終了時のロジックを書きます。
        // 例えば、セッションを終了するAPIを呼び出し、
        // ユーザーに終了のメッセージを表示したり、他のクリーンアップ処理を実行します。
    }, []);

    return (
        <div className="central-manager">
            <CommandInput onCommandSubmit={handleCommandSubmit} />
            <CommandPreset onCommandChange={handleCommandChange} />
            <InteractiveSession 
                inputCommand={currentCommand} 
                sessionId={sessionID} 
                onOutputChange={handleOutputChange} 
            />
            <CommandPromptGUI history={commandHistory} />
            <AppExit sessionID={sessionID} onExit={handleExit} />
        </div>
    );
};

export default CentralManager;
