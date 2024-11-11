import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInput = ({ onCreate }) => {
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return <p>Browser doesn't support speech recognition.</p>;
  }

  const toggleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (transcript.trim()) {
      try {
        const newTask = { task: transcript };
        const response = await axios.post('http://localhost:8000/tasks/', newTask);
        onCreate(response.data);
        resetTranscript();
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
  };

  return (
    <div>
      <h2>Voice Task Input</h2>
      <button onClick={toggleListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={transcript}
          readOnly
          placeholder="Say your task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default VoiceInput;
