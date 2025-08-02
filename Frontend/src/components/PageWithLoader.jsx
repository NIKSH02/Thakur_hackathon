import React, { useState, useEffect } from 'react';
import LoaderComponent from './LoaderComponent';

const PageWithLoader = ({ 
  children, 
  customMessage,
  loadingDuration = 3000,
  showLoader = true 
}) => {
  const [isLoading, setIsLoading] = useState(showLoader);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  // Auto-hide loader after specified duration as fallback
  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, loadingDuration + 1000); // Add extra buffer

      return () => clearTimeout(timer);
    }
  }, [showLoader, loadingDuration]);

  return (
    <>
      {isLoading && (
        <LoaderComponent 
          onComplete={handleLoaderComplete}
          customMessage={customMessage}
          duration={loadingDuration}
        />
      )}
      {!isLoading && children}
    </>
  );
};

export default PageWithLoader;
