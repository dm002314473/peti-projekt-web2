import React, { useEffect, useState } from 'react';

const SpeechRecognition = () => {
  const [speechResult, setSpeechResult] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setSpeechResult(result);
      };

      // Start or stop recognition based on isListening state
      isListening ? recognition.start() : recognition.stop();

      // Clean up on component unmount
      return () => {
        recognition.stop();
      };
    } else {
      console.error('SpeechRecognition not supported in this browser.');
    }
  }, [isListening]);

  const handleToggleListening = () => {
    setIsListening((prevIsListening) => !prevIsListening);

    if (!isListening) {
      showPushNotification();
    }
  };

  const showPushNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('New Message', {
            body: 'Listening...',
          });
        }
      });
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleToggleListening}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
      <div>Speech Recognition is {isListening ? 'active' : 'inactive'}</div>
      <textarea
        id="speechResult"
        name="speechResult"
        value={speechResult}
        placeholder="Speech result will appear here"
        readOnly
      />
    </div>
  );
};

export default SpeechRecognition;
