import React from 'react';

import { LoadingSpinner } from '@spotify-internal/encore-web/advertising/components/LoadingSpinner';

const LoadingPage = () => (
  <div className="loading-page">
    <LoadingSpinner diameter="150px" />
  </div>
);

export default LoadingPage;
