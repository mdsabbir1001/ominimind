import React from 'react';

interface PreloaderProps {
  loading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ loading }) => {
  return (
    <div className={`preloader ${loading ? '' : 'fade-out'}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Preloader;
