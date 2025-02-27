'use client';
import '@fontsource/source-sans-pro';
import '@fontsource/roboto-condensed';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface LightboxProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  photoCredit: string;
  description: string;
  currentPage: number;
  totalPages: number;
}

// Create a client-only component with no SSR
const LightboxClient = (props: LightboxProps) => {
  // Removed unused state variables
  const [isMounted, setIsMounted] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  
  // This ensures the component only renders on the client
  // which prevents hydration errors
  useEffect(() => {
    setIsMounted(true);
    
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    // Set initial height
    updateViewportHeight();
    
    // Add event listener for resize
    window.addEventListener('resize', updateViewportHeight);
    
    // Clean up
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  // Return null during server-side rendering
  if (!isMounted) {
    return null;
  }
  
  // Calculate ad position based on viewport height
  const getAdPosition = () => {
    // For iPad Mini (height around 1024px or less)
    if (viewportHeight <= 1024) {
      return 'bottom-[250px]';
    }
    // For iPad Air (height around 1180px)
    else if (viewportHeight > 1024 && viewportHeight <= 1200) {
      return 'bottom-[370px]';
    }
    // For larger iPads (iPad Pro)
    return 'bottom-[350px]';
  };

  // Calculate image height based on viewport
  const getImageHeight = () => {
    if (viewportHeight <= 1024) {
      // iPad Mini
      return 'h-[490px]';
    } else if (viewportHeight > 1024 && viewportHeight <= 1200) {
      // iPad Air
      return 'h-[510px]';
    } else if (viewportHeight >= 1300) {
      // iPad Pro - larger image
      return 'h-[650px]';
    } else {
      // Regular iPad
      return 'h-[516px]';
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className={`relative bg-black overflow-auto ${
        viewportHeight <= 1024 
          ? 'pt-0 -mt-[10px]' 
          : viewportHeight > 1024 && viewportHeight <= 1200
            ? 'pt-0 mt-[5px]'
            : viewportHeight >= 1300 
              ? 'pt-0 mt-[20px]' 
              : 'pt-0'
      }`} style={{ 
        width: viewportHeight >= 1300 ? '1024px' : viewportHeight > 1024 && viewportHeight <= 1200 ? '820px' : '834px', 
        height: viewportHeight >= 1300 ? '1366px' : viewportHeight > 1024 && viewportHeight <= 1200 ? '1180px' : '1194px', 
        maxWidth: '100vw', 
        maxHeight: '100vh' 
      }}>
        {/* Close Button */}
        <button className="absolute top-4 right-4 z-50">
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.052 1.414L16.638 0L9.026 7.612L1.414 0L0 1.414L7.612 9.026L0 16.638L1.414 18.052L9.026 10.44L16.638 18.052L18.052 16.638L10.44 9.026L18.052 1.414Z" fill="white"/>
          </svg>
        </button>

        {/* Header Section */}
        <div className={`px-8 ${
          viewportHeight <= 1024 
            ? 'pt-6' 
            : viewportHeight > 1024 && viewportHeight <= 1200
              ? 'pt-7'
              : viewportHeight >= 1300 
                ? 'pt-10' 
                : 'pt-8'
        }`}>
          {/* Photo Credit */}
          <div className={`text-[#8B8B8B] ${
            viewportHeight >= 1300 ? 'text-[18px] mt-4 mb-12' : 'text-[14px] mt-3 mb-10'
          }`}>
            {props.photoCredit}
          </div>

          {/* Separator Line */}
          <div className={`w-full h-[2px] bg-[#727272] ${
            viewportHeight <= 1024 
              ? 'mb-8' 
              : viewportHeight > 1024 && viewportHeight <= 1200
                ? 'mb-9'
                : viewportHeight >= 1300 
                  ? 'mb-12' 
                  : 'mb-10'
          }`}></div>
        </div>

        {/* Main Image */}
        <div className="px-8 mt-0">
          <div 
            className={`w-full bg-center bg-cover bg-no-repeat overflow-hidden ${getImageHeight()}`}
            style={{ 
              backgroundImage: `url(${props.imageUrl || '/placeholder-image.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Intentionally empty to display only the background image */}
          </div>
        </div>

        {/* Responsive ad placement */}
        <div className={`absolute ${getAdPosition()} left-1/2 transform -translate-x-1/2`}>
          <div className={`max-w-[90vw] bg-[rgba(255,106,108,0.77)] flex items-center justify-center border-4 border-white ${
            viewportHeight >= 1300 
              ? 'w-[900px] h-[130px]'
              : viewportHeight > 1024 && viewportHeight <= 1200
                ? 'w-[720px] h-[107px]'
                : 'w-[744px] h-[107px]'
          }`}>
            <span className={`text-white font-bold ${
              viewportHeight >= 1300 ? 'text-[40px]' : 'text-[32px]'
            }`}>
              AD PLACEMENT GOES HERE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(LightboxClient), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  )
});
