import React, { createContext, useState, useContext } from 'react';

// 1. Create and export the Context object
export const AppContext = createContext();

// 2. Create a custom hook for easy access to the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// 3. Create the Provider component
export const AppProvider = ({ children }) => {
    // ------------------------------------------------------------------
    // MOVED STATE & FUNCTIONS FROM App.js
    // ------------------------------------------------------------------
    const [uploadedImage, setUploadedImage] = useState(null);
    const [grayscaleImage, setGrayscaleImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [notification, setNotification] = useState(null); // { message, type }
    const [scanHistory, setScanHistory] = useState([]); // Needed for HistoryPage

    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    // NOTE: sampleImageData can remain as a constant or be moved here if needed.
    const sampleImageData = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmYWZjIiBzdHJva2U9IiNlMmU4ZjAiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjIwIiB5PSI0MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+QUJDIEVsZWN0cm9uaWNzIFB2dC4gTHRkLjwvdGV4dD48dGV4dCB4PSIyMCIgeT0iNjAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzM3NDE1MSI+R1NUIE5vOiAyOUdHR0dHMTMxNFI5WjY8L3RleHQ+PHRleHQgeD0iMjAiIHk9IjkwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij5Qcm9kdWN0OiBTbWFydHBob25lIFhZWi0yMDI0PC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSIxMTAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxZjI5MzciPlByaWNlOiDigoK1MjUsOTk5PC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSIxNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY0NzQ4YiI+VGVybXMgJiBDb25kaXRpb25zOjwvdGV4dD48dGV4dCB4PSIyMCIgeT0iMTU1IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2NDc0OGIiPi0gMzAtZGF5IHJldHVybiBwb2xpY3k8L3RleHQ+PHRleHQgeD0iMjAiIHk9IjE3MCIgZm9uZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY0NzQ4YiI+LSAxLXllYXIgbWFudWZhY3R1cmVyIHdhcnJhbnR5PC90ZXh0Pjx0ZXh0IHg9IjIwIiB5PSIyMDAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzY0NzQ4YiI+Q29udGFjdDogc3VwcG9ydEBhYmNlbGVjdHJvbmljcy5jb208L3RleHQ+PC9zdmc+';

    const contextValue = {
        // State variables
        uploadedImage, setUploadedImage,
        grayscaleImage, setGrayscaleImage,
        processedImage, setProcessedImage,
        extractedText, setExtractedText,
        notification, setNotification,
        scanHistory, setScanHistory,

        // Functions
        showNotification,
        
        // Constants
        sampleImageData, 
    };
    // ------------------------------------------------------------------

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};