import React, { useState, useCallback, useEffect } from 'react';
import AutoRunToggle from '../AutoRunToggle/AutoRunToggle';
import ContextWindowSizeInput from '../ContextWindowSizeInput/ContextWindowSizeInput';
import DebugModeToggle from '../DebugModeToggle/DebugModeToggle';
import MaxBudgetInput from '../MaxBudgetInput/MaxBudgetInput';
import MaxTokensInput from '../MaxTokensInput/MaxTokensInput';
import OutputRandomnessSlider from '../OutputRandomnessSlider/OutputRandomnessSlider';
import SafeModeSelector from '../SafeModeSelector/SafeModeSelector';
import CommandComposer from '../CommandComposer/CommandComposer';

const CommandPreset = ({ onCommandChange }) => {
  // 各子コンポーネントから受け取るコマンドを保持するステートたち
  const [autoRunCommand, setAutoRunCommand] = useState(null);
  const [contextWindowSizeCommand, setContextWindowSizeCommand] = useState(null);
  const [debugModeCommand, setDebugModeCommand] = useState(null);
  const [maxBudgetCommand, setMaxBudgetCommand] = useState(null);
  const [maxTokensCommand, setMaxTokensCommand] = useState(null);
  const [outputRandomnessCommand, setOutputRandomnessCommand] = useState(null);
  const [safeModeCommand, setSafeModeCommand] = useState(null);

  

  // 子コンポーネントからコマンドが渡されたときに実行するコールバック関数たち
  const handleAutoRunToggle = useCallback((newCommand) => {
    setAutoRunCommand(newCommand);
  }, []);

  const handleContextWindowSizeSet = useCallback((newCommand) => {
    setContextWindowSizeCommand(newCommand);
  }, []);

  const handleDebugModeToggle = useCallback((newCommand) => {
    setDebugModeCommand(newCommand);
  }, []);

  const handleMaxBudgetSet = useCallback((newCommand) => {
    setMaxBudgetCommand(newCommand);
  }, []);

  const handleMaxTokensSet = useCallback((newCommand) => {
    setMaxTokensCommand(newCommand);
  }, []);

  const handleOutputRandomnessChange = useCallback((newCommand) => {
    setOutputRandomnessCommand(newCommand);
  }, []);

  const handleSafeModeChange = useCallback((newCommand) => {
    setSafeModeCommand(newCommand);
  }, []);

  // 追加: CommandComposerから受け取るコマンドを保持するステート
  const [composerCommand, setComposerCommand] = useState(null);

  // 追加: CommandComposerが開かれているかどうかのステート
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // 追加: CommandComposerからコマンドが渡されたときに実行するコールバック関数
  const handleCommandComposed = useCallback((newCommand) => {
    setComposerCommand(newCommand);
  }, []);

  // 上記ステートのいずれかが変更された時に実行される
  useEffect(() => {
    let command = 'interpreter';  // ベースとなるコマンド

    // 各ステートの内容を検証して、有効なものはコマンドに追加
    if (autoRunCommand) {
      command += ` ${autoRunCommand}`;
    }

    if (contextWindowSizeCommand) {
      command += ` ${contextWindowSizeCommand}`;
    }

    if (debugModeCommand) {
      command += ` ${debugModeCommand}`;
    }

    if (maxBudgetCommand) {
      command += ` ${maxBudgetCommand}`;
    }

    if (maxTokensCommand) {
      command += ` ${maxTokensCommand}`;
    }

    if (outputRandomnessCommand) {
      command += ` ${outputRandomnessCommand}`;
    }

    if (safeModeCommand) {
      command += ` ${safeModeCommand}`;
    }

    // 追加: CommandComposerからのコマンドを追加（もし存在すれば）
    if (composerCommand) {
      command += ` ${composerCommand}`;
    }

    // コマンドとreset_sessionフラグを親コンポーネントに伝える
    onCommandChange({
      command: command,
      resetSession: true
    });
  }, [
    autoRunCommand,
    contextWindowSizeCommand,
    debugModeCommand,
    maxBudgetCommand,
    maxTokensCommand,
    outputRandomnessCommand,
    safeModeCommand,
    // 追加: CommandComposerからのコマンドが変更されたときもeffectを実行
    composerCommand,
    onCommandChange,
  ]);

  // 追加: CommandComposerの表示・非表示をトグルする関数
  const toggleComposer = () => {
    setIsComposerOpen(prevState => !prevState);
  };

  // UI部分のレンダリング。各子コンポーネントに対応したコールバックを渡しています。
  return (
    <div>
      <AutoRunToggle onToggle={handleAutoRunToggle} />
      <ContextWindowSizeInput onCommandSet={handleContextWindowSizeSet} />
      <DebugModeToggle onToggle={handleDebugModeToggle} />
      <MaxBudgetInput onCommandGenerated={handleMaxBudgetSet} />
      <MaxTokensInput onCommandSet={handleMaxTokensSet} />
      <OutputRandomnessSlider onChange={handleOutputRandomnessChange} />
      <SafeModeSelector onCommandChange={handleSafeModeChange} />

      {/* 追加: CommandComposerを表示/非表示するボタン */}
      <button onClick={toggleComposer}>
        {isComposerOpen ? '閉じる' : 'コマンドコンポーザを開く'}
      </button>

      {/* 追加: CommandComposerが開かれている時だけ表示 */}
      {isComposerOpen && (
        <CommandComposer onCommandComposed={handleCommandComposed} />
      )}
    </div>
  );
};

export default CommandPreset;
