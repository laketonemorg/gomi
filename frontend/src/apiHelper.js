// axiosライブラリをインポート
import axios from 'axios';

// APIのベースURLを設定
const BASE_URL = 'http://localhost:5000';

// axiosのインスタンスを作成
const api = axios.create({
  baseURL: BASE_URL
});

// モデルの設定
export const setModel = async (model_name) => {
  return await api.post('/set_model', { model_name });
}

// ローカルフラグの設定
export const setLocal = async (flag) => {
  return await api.post('/set_local', { flag });
}

// オートランフラグの設定
export const setAutoRun = async (flag) => {
  return await api.post('/set_auto_run', { flag });
}

// 最大アウトプットトークン数の設定
export const setMaxOutput = async (tokens) => {
  return await api.post('/set_max_output', { tokens });
}

// 最大トークン数の設定
export const setMaxTokens = async (tokens) => {
  return await api.post('/set_max_tokens', { tokens });
}

// 最大予算の設定
export const setMaxBudget = async (budget) => {
  return await api.post('/set_max_budget', { budget });
}

// メッセージの送信と応答の取得
export const chat = async (message) => {
  return await api.post('/chat', { message });
}

// メッセージの取得
export const getMessages = async () => {
  return await api.get('/get_messages');
}

// チャットの保存
export const saveChat = async () => {
  return await api.get('/save_chat');
}

// チャットの復元
export const restoreChat = async (messages) => {
  return await api.post('/restore_chat', { messages });
}

// システムメッセージのカスタマイズ
export const customizeSystemMessage = async (custom_message) => {
  return await api.post('/customize_system_message', { custom_message });
}

// システムメッセージの取得
export const getSystemMessage = async () => {
  return await api.get('/get_system_message');
}