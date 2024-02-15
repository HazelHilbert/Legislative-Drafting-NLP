function logError(...args) {
  if (process.env.NODE_ENV !== 'production' && typeof document !== 'undefined') {
    console.error(...args);
  }
}

export { logError };
//# sourceMappingURL=logError.esm.js.map
