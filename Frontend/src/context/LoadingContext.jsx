import React, { createContext, useState } from 'react';

export const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('YOUR WEB EXPERIENCE IS LOADING RIGHT NOW');

  const showLoader = (message = 'YOUR WEB EXPERIENCE IS LOADING RIGHT NOW') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        showLoader,
        hideLoader,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
