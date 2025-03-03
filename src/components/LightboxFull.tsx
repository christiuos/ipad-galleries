'use client';
import '@fontsource/source-sans-pro';
import '@fontsource/roboto-condensed';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

interface LightboxFullProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  photoCredit: string;
  description: string;
  currentPage: number;
  totalPages: number;
  images?: string[]; // Add support for gallery images
}

// Create a client-only component with no SSR
const LightboxFullClient = (props: LightboxFullProps) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
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
  
  // Default gallery images if none provided
  const galleryImages = props.images || [props.imageUrl];
  
  // Navigation functions
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };
  
  // Calculate ad position based on viewport height
  const getAdPosition = () => {
    // For iPad Mini (height around 1024px or less)
    if (viewportHeight <= 1024) {
      return 'bottom-[35px]';
    }
    // For iPad Air (height around 1180px)
    else if (viewportHeight > 1024 && viewportHeight <= 1200) {
      return 'bottom-[170px]';
    }
    // For larger iPads (iPad Pro)
    else if (viewportHeight >= 1300) {
      return 'bottom-[90px]';
    }
    // For regular iPad
    return 'bottom-[150px]';
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
    <div className="fixed inset-0 bg-black flex items-start justify-center overflow-auto">
      <div className={`relative bg-black overflow-auto w-full ${
        viewportHeight <= 1024 
          ? 'pt-[40px] mt-[20px]' 
          : viewportHeight > 1024 && viewportHeight <= 1200
            ? 'pt-[45px] mt-[25px]'
            : viewportHeight >= 1300 
              ? 'pt-[50px] mt-[30px]' 
              : 'pt-[40px] mt-[20px]'
      }`} style={{ 
        width: viewportHeight >= 1300 ? '1024px' : viewportHeight > 1024 && viewportHeight <= 1200 ? '820px' : '834px', 
        minHeight: '100%',
        maxWidth: '100vw', 
        paddingBottom: '50px'
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
            ? 'pt-4 mt-2' 
            : viewportHeight > 1024 && viewportHeight <= 1200
              ? 'pt-5 mt-3'
              : viewportHeight >= 1300 
                ? 'pt-6 mt-4' 
                : 'pt-4 mt-2'
        }`}>
          <h1 className={`text-white font-bold ${
            viewportHeight >= 1300 ? 'text-[38px]' : 'text-[32px]'
          }`}>
            {props.title}
          </h1>
          <h2 className={`text-white font-bold ${
            viewportHeight >= 1300 ? 'text-[38px]' : 'text-[32px]'
          }`}>
            {props.subtitle}
          </h2>
          
          {/* Gallery Navigation Dots - Do not use these */}
          {/*<div className="flex gap-[26px] mt-4">
            {galleryImages.map((_, index) => (
              <div 
                key={index}
                className={`rounded-full ${
                  index === currentImageIndex ? 'bg-white' : index < currentImageIndex ? 'bg-[#3E688A]' : 'bg-[#727272]'
                } ${
                  viewportHeight >= 1300 ? 'w-[45px] h-[45px]' : 'w-[33px] h-[33px]'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              ></div>
            ))}
          </div>
          
          {/* Social Share Buttons - Positioned above the photo count */}
          <div className={`flex gap-4 ${
            viewportHeight >= 1300 ? 'mt-1 mb-2' : 'mt-2 mb-2'
          }`}>
            <div className={`bg-[rgba(0,0,0,0.5)] rounded-full flex items-center justify-center ${
              viewportHeight >= 1300 ? 'w-[60px] h-[60px]' : 'w-[40px] h-[40px]'
            }`}>
              <svg width={viewportHeight >= 1300 ? "24" : "18"} height={viewportHeight >= 1300 ? "24" : "18"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.4921 3.29063 17.2155 7.59375 17.8907V11.6016H5.30859V9H7.59375V7.01719C7.59375 4.76156 8.93742 3.51562 10.9932 3.51562C11.9776 3.51562 13.0078 3.69141 13.0078 3.69141V5.90625H11.873C10.755 5.90625 10.4062 6.60006 10.4062 7.3125V9H12.9023L12.5033 11.6016H10.4062V17.8907C14.7094 17.2155 18 13.4921 18 9Z" fill="white"/>
              </svg>
            </div>
            <div className={`bg-[rgba(0,0,0,0.5)] rounded-full flex items-center justify-center ${
              viewportHeight >= 1300 ? 'w-[60px] h-[60px]' : 'w-[40px] h-[40px]'
            }`}>
              <svg width={viewportHeight >= 1300 ? "24" : "18"} height={viewportHeight >= 1300 ? "24" : "18"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.66064 16.5C12.4531 16.5 16.1683 10.9972 16.1683 6.22056C16.1683 6.07056 16.1683 5.92056 16.1589 5.77056C16.8803 5.25 17.5042 4.59611 18 3.84667C17.326 4.12667 16.611 4.30667 15.8789 4.39333C16.6497 3.92889 17.2257 3.19778 17.5042 2.33C16.7798 2.76556 15.9881 3.06667 15.1684 3.23333C14.5036 2.51222 13.5591 2.05 12.5286 2.05C10.5266 2.05 8.90547 3.67111 8.90547 5.67333C8.90547 5.94444 8.93604 6.21556 8.99719 6.47778C5.8461 6.33667 3.09595 4.88556 1.25766 2.64667C0.940766 3.16778 0.754485 3.77778 0.754485 4.42333C0.754485 5.65111 1.40648 6.73667 2.39266 7.36556C1.79141 7.35667 1.21954 7.18111 0.724922 6.91889C0.724922 6.92778 0.724922 6.94556 0.724922 6.96333C0.724922 8.73 1.99485 10.1944 3.68516 10.5122C3.37703 10.5944 3.04953 10.6378 2.71266 10.6378C2.47485 10.6378 2.24641 10.6161 2.01797 10.5733C2.48422 12.0156 3.85078 13.0644 5.46641 13.0922C4.20329 14.0644 2.60953 14.6378 0.883047 14.6378C0.58547 14.6378 0.297359 14.6161 0 14.5733C1.63547 15.6189 3.57422 16.2111 5.66064 16.2111" fill="white"/>
              </svg>
            </div>
            <div className={`bg-[rgba(0,0,0,0.5)] rounded-full flex items-center justify-center ${
              viewportHeight >= 1300 ? 'w-[60px] h-[60px]' : 'w-[40px] h-[40px]'
            }`}>
              <svg width={viewportHeight >= 1300 ? "24" : "18"} height={viewportHeight >= 1300 ? "24" : "18"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 1.62281C11.403 1.62281 11.6877 1.63125 12.6374 1.67344C13.5158 1.71141 13.9889 1.86094 14.3114 1.98375C14.7366 2.14172 15.0468 2.33438 15.3701 2.65781C15.6935 2.98125 15.8862 3.29156 16.0441 3.71672C16.167 4.03922 16.3165 4.51219 16.3545 5.39062C16.3967 6.34031 16.405 6.625 16.405 9.02812C16.405 11.4312 16.3967 11.7159 16.3545 12.6656C16.3165 13.544 16.167 14.017 16.0441 14.3395C15.8862 14.7647 15.6935 15.075 15.3701 15.3984C15.0468 15.7219 14.7366 15.9145 14.3114 16.0725C13.9889 16.1953 13.5158 16.3448 12.6374 16.3828C11.6877 16.425 11.403 16.4334 9 16.4334C6.59698 16.4334 6.31229 16.425 5.36261 16.3828C4.48417 16.3448 4.01105 16.1953 3.68855 16.0725C3.2634 15.9145 2.95308 15.7219 2.62964 15.3984C2.30621 15.075 2.11355 14.7647 1.95558 14.3395C1.83277 14.017 1.68324 13.544 1.64527 12.6656C1.60308 11.7159 1.59464 11.4312 1.59464 9.02812C1.59464 6.625 1.60308 6.34031 1.64527 5.39062C1.68324 4.51219 1.83277 4.03922 1.95558 3.71672C2.11355 3.29156 2.30621 2.98125 2.62964 2.65781C2.95308 2.33438 3.2634 2.14172 3.68855 1.98375C4.01105 1.86094 4.48417 1.71141 5.36261 1.67344C6.31229 1.63125 6.59698 1.62281 9 1.62281ZM9 0C6.55635 0 6.24948 0.00984375 5.28917 0.0520312C4.33167 0.0942187 3.67712 0.25125 3.10619 0.4725C2.51307 0.70125 2.01167 1.01016 1.51167 1.51016C1.01167 2.01016 0.702761 2.51156 0.474011 3.10469C0.252761 3.67563 0.0957298 4.33031 0.0535423 5.28781C0.0113548 6.24813 0.00151231 6.55488 0.00151231 8.99852C0.00151231 11.4422 0.0113548 11.7491 0.0535423 12.7094C0.0957298 13.6669 0.252761 14.3214 0.474011 14.8923C0.702761 15.4855 1.01167 15.9869 1.51167 16.4869C2.01167 16.9869 2.51307 17.2958 3.10619 17.5245C3.67712 17.7458 4.33167 17.9028 5.28917 17.945C6.24948 17.9872 6.55635 17.997 9 17.997C11.4436 17.997 11.7505 17.9872 12.7108 17.945C13.6683 17.9028 14.3229 17.7458 14.8938 17.5245C15.4869 17.2958 15.9883 16.9869 16.4883 16.4869C16.9883 15.9869 17.2972 15.4855 17.526 14.8923C17.7472 14.3214 17.9043 13.6669 17.9465 12.7094C17.9887 11.7491 17.9985 11.4422 17.9985 8.99852C17.9985 6.55488 17.9887 6.24813 17.9465 5.28781C17.9043 4.33031 17.7472 3.67563 17.526 3.10469C17.2972 2.51156 16.9883 2.01016 16.4883 1.51016C15.9883 1.01016 15.4869 0.70125 14.8938 0.4725C14.3229 0.25125 13.6683 0.0942187 12.7108 0.0520312C11.7505 0.00984375 11.4436 0 9 0Z" fill="white"/>
                <path d="M9.00026 4.37695C6.44776 4.37695 4.37891 6.4458 4.37891 8.9983C4.37891 11.5508 6.44776 13.6196 9.00026 13.6196C11.5528 13.6196 13.6216 11.5508 13.6216 8.9983C13.6216 6.4458 11.5528 4.37695 9.00026 4.37695ZM9.00026 11.9971C7.34386 11.9971 6.00151 10.6547 6.00151 8.9983C6.00151 7.3419 7.34386 5.99955 9.00026 5.99955C10.6567 5.99955 11.999 7.3419 11.999 8.9983C11.999 10.6547 10.6567 11.9971 9.00026 11.9971Z" fill="white"/>
                <path d="M14.8909 4.19402C14.8909 4.79402 14.4059 5.27902 13.8059 5.27902C13.2059 5.27902 12.7209 4.79402 12.7209 4.19402C12.7209 3.59402 13.2059 3.10902 13.8059 3.10902C14.4059 3.10902 14.8909 3.59402 14.8909 4.19402Z" fill="white"/>
              </svg>
            </div>
          </div>
          
          {/* Page Counter */}
          <div className={`text-white ${
            viewportHeight >= 1300 ? 'text-[30px] mt-1' : 'text-[23px] mt-1'
          }`}>
            {currentImageIndex + 1}/{galleryImages.length}
          </div>

          {/* Photo Credit */}
          <div className={`text-[#8B8B8B] ${
            viewportHeight >= 1300 ? 'text-[18px] mt-4 mb-4' : 'text-[14px] mt-3 mb-3'
          }`}>
            {props.photoCredit}
          </div>

          {/* Separator Line */}
          <div className={`w-full h-[2px] bg-[#727272] ${
            viewportHeight <= 1024 
              ? 'mb-3' 
              : viewportHeight > 1024 && viewportHeight <= 1200
                ? 'mb-3'
                : viewportHeight >= 1300 
                  ? 'mb-4' 
                  : 'mb-10'
          }`}></div>
        </div>

        {/* Description - Moved above the image */}
        <div className="px-8 mb-4">
          <div className={`w-full text-white ${
            viewportHeight >= 1300 ? 'text-[22px]' : 'text-[17px]'
          }`}>
            {isDescriptionExpanded ? props.description : props.description.slice(0, 150)}
            {props.description.length > 150 && (
              <button
                className="text-[#3E86E4] ml-1"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
        </div>

        {/* Main Image */}
        <div className="px-8 mt-0 relative">
          <div 
            className={`w-full bg-center bg-cover bg-no-repeat overflow-hidden relative ${getImageHeight()}`}
            style={{ 
              backgroundImage: `url(${galleryImages[currentImageIndex] || '/placeholder-image.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Previous Button - Overlayed on left side */}
            <button 
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center ${
                viewportHeight >= 1300 ? 'w-[60px] h-[60px]' : 'w-[45px] h-[45px]'
              }`}
              onClick={goToPrevImage}
            >
              <svg width={viewportHeight >= 1300 ? "30" : "24"} height={viewportHeight >= 1300 ? "30" : "24"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.25 4.5L6.75 9L11.25 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            {/* Next Button - Overlayed on right side */}
            <button 
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center ${
                viewportHeight >= 1300 ? 'w-[60px] h-[60px]' : 'w-[45px] h-[45px]'
              }`}
              onClick={goToNextImage}
            >
              <svg width={viewportHeight >= 1300 ? "30" : "24"} height={viewportHeight >= 1300 ? "30" : "24"} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 4.5L11.25 9L6.75 13.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
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
export default dynamic(() => Promise.resolve(LightboxFullClient), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  )
}); 