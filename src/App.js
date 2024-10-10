import React, { useState } from 'react';
import './App.css';
import { geminiServices } from './Services/GeminiServices';

function App() {
  const [imagemBlob, setImagemBlob] = useState(null);
  const [descricao, setDescricao] = useState('');
  const handleCapture = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Converte para Blob
      const blob = new Blob([file], { type: file.type });
      setImagemBlob(blob);

      // Envia o Blob para a API do Gemini
      const description = await geminiServices.enviarParaGemini(blob);
      falarDescricao(description);
      setDescricao(description)
    }
  };
  const falarDescricao = (texto) => {
    if ('speechSynthesis' in window) {
      const sintese = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(texto);
      // Configura o idioma para português
      utterance.lang = 'pt-BR';
      sintese.speak(utterance);
    } else {
      console.warn('Síntese de voz não suportada neste navegador.');
    }
  };

  return (
    <div className="App">
      <div className='conteiner'>
        <input
          accept="image/*"
          capture="environment"
          type="file"
          onChange={handleCapture}
          className="input-file"
        />
        {imagemBlob && (
          <div className='img-content'>
            <img
              src={URL.createObjectURL(imagemBlob)}
              alt="Imagem capturada"
            />
          </div>
        )}
        <div className='img-desc'>
          <p>{descricao || 'Analisando a imagem...'}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
