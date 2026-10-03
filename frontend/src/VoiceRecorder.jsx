import React, { useState } from 'react';

const VoiceRecorder = ({ onAddExpense }) => {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');

  const handleListen = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Brauzeringiz ovozni tanib olishni qo'llab-quvvatlamaydi.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'uz-UZ';
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      if (onAddExpense) {
        onAddExpense(transcript);
      }
    };

    recognition.start();
  };

  return (
    <div className="p-4 bg-white rounded-2xl shadow border border-gray-100 mb-4">
      <h3 className="text-sm font-bold text-gray-700 mb-2">🎤 Ovozli xarajat qo'shish</h3>
      <button
        onClick={handleListen}
        className={`w-full py-3 rounded-xl font-medium text-white transition ${
          isListening ? 'bg-red-500 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isListening ? "Eshitilmoqda... Gapiring" : "Ovozli xabar yozish"}
      </button>
      {text && (
        <p className="mt-2 text-xs text-gray-600">
          <strong>Natija:</strong> {text}
        </p>
      )}
    </div>
  );
};

export default VoiceRecorder;