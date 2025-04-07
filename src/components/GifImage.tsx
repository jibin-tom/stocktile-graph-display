
import React, { useState } from 'react';

interface GifImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loadingComponent?: React.ReactNode;
}

/**
 * A component for displaying GIF images with loading state
 * Note: For uploading GIFs, you may need to use specific file formats (e.g., .gif)
 * The Lovable uploader might have format restrictions, but this component can display GIFs
 * from external URLs or correctly uploaded GIF files.
 */
const GifImage: React.FC<GifImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  width, 
  height,
  loadingComponent = <div className="animate-pulse bg-gray-200 rounded-md" style={{ width, height }} />
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && loadingComponent}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'block' : 'hidden'}`}
        onLoad={() => setIsLoaded(true)}
        style={{ width, height }}
      />
    </div>
  );
};

export default GifImage;
