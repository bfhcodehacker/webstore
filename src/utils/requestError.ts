import axios from 'axios';

export function shouldRetryRequest(failureCount: number, error: unknown) {
  if (axios.isAxiosError(error) && error.response && error.response.status < 500) return false;
  return failureCount < 2;
}

export function getRequestErrorMessage(error: unknown, contentName: string) {
  if (!axios.isAxiosError(error)) {
    return `Something unexpected happened while loading ${contentName}.`;
  }
  if (error.code === 'ECONNABORTED') {
    return `Loading ${contentName} took too long. Check your connection and try again.`;
  }
  if (!error.response) {
    return `We could not connect to the store. Check your internet connection and try again.`;
  }
  if (error.response.status >= 500) {
    return `The store is temporarily unavailable. Please try loading ${contentName} again in a moment.`;
  }
  return `We could not load ${contentName}. Please try again.`;
}
