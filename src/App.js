import React from 'react';
import SpeechRecognition from './SpeechRecognition';
import InstallButton from './InstallButton';

function App() {
  return (
    <div className="App">
      <h1>React Speech Recognition App</h1>
      <SpeechRecognition />
      <InstallButton />
    </div>
  );
}

export default App;
