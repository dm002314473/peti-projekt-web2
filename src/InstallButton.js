// Import the useRef hook
import React, { useEffect, useState, useRef } from 'react';

const InstallButton = () => {
  const [showInstallButton, setShowInstallButton] = useState(false);
  // Use useRef to persistently store the deferredPrompt
  const deferredPrompt = useRef(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      // Assign to the .current property of the ref
      deferredPrompt.current = event;
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  const handleInstallClick = () => {
    // Access the .current property of the ref
    if (deferredPrompt.current) {
      deferredPrompt.current.prompt();

      deferredPrompt.current.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    }
  };

  return (
    showInstallButton && (
      <button onClick={handleInstallClick}>Install App</button>
    )
  );
};

export default InstallButton;
