import React from 'react';
import { useLoading } from '../hooks/useLoading';
import LoaderComponent from './LoaderComponent';

const GlobalLoader = () => {
  const { isLoading, loadingMessage, hideLoader } = useLoading();

  if (!isLoading) return null;

  // Parse the loading message into array format
  const messageArray = typeof loadingMessage === 'string' 
    ? loadingMessage.split(' ').reduce((acc, word, index, array) => {
        if (index === 0) acc.push(word);
        else if (index < array.length - 1) {
          const lastIndex = acc.length - 1;
          acc[lastIndex] = acc[lastIndex] + ' ' + word;
        } else {
          acc.push(word);
        }
        return acc;
      }, [])
    : loadingMessage;

  return (
    <LoaderComponent 
      onComplete={hideLoader}
      customMessage={messageArray}
      duration={2000}
    />
  );
};

export default GlobalLoader;
