import Hoc from './hoc';
const Logger = require('log-remote');
const logger = new Logger(1000, 'http://localhost:8080/log/example');
export function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

export function Log(param) {
  logger.log({
    id: Date.now(),
    body: { type: 'webview', param },
  });
}

export function getVscode() {
  if (!window.vscode) {
    return {
      postMessage: () => {},
      getState: () => {},
      setState: () => {},
    };
  }
  return {
    postMessage: window.vscode.postMessage,
    getState: window.vscode.getState,
    setState: window.vscode.setState,
  };
}
export const WEB_VIEW_LISTENER_FLAGS = {
  DELETE_NOTE: 'DELETE_NOTE',
  UPDATE_NOTE: 'UPDATE_NOTE',
};

export { Hoc };
