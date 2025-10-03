export const toast = {
  success: (message) => {
    // lightweight replacement for toast notifications during development
    try { console.info('[toast:success]', message); } catch (e) {}
  },
  error: (message) => {
    try { console.error('[toast:error]', message); } catch (e) {}
  },
  info: (message) => {
    try { console.info('[toast:info]', message); } catch (e) {}
  }
};
