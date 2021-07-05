export const Logger = {
    warn: (...args) => {
        console.warn('[adapter]', ...args);
    },
    log: (...args) => {
        console.log('[adapter warn]', ...args);
    },
};