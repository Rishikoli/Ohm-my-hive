const DEFAULT_TIMEOUT = 5000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

export const fetchWithRetry = async (fetchFn, options = {}) => {
  const { timeout = DEFAULT_TIMEOUT, retries = MAX_RETRIES } = options;
  
  const fetchWithTimeout = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await fetchFn(controller.signal);
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  let lastError;
  
  for (let i = 0; i < retries; i++) {
    try {
      return await fetchWithTimeout();
    } catch (error) {
      lastError = error;
      if (error.name === 'AbortError') {
        console.warn(`Attempt ${i + 1} timed out, retrying...`);
      } else {
        console.error(`Attempt ${i + 1} failed:`, error);
      }
      if (i < retries - 1) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      }
    }
  }
  
  throw lastError;
};
