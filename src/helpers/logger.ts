/* eslint-disable no-console */
export const logMessage = (langCode: string, message: string): void => {
  console.log((langCode + ': ').padEnd(8) + message);
};

export const log = (message: string): void => {
  console.log(message);
};

export const logWarn = (message: string): void => {
  console.warn(`${message}\n`);
};
