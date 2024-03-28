import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cidade, setCidade] = useState('');
  const [dadosTempo, setDadosTempo] = useState(null);
  const [erro, setErro] = useState(null);

  const obterPrevisaoTempo = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=27bcd6d0a505c68c9ef6cc504712ad6a&lang=pt_br&units=metric`);
      setDadosTempo(response.data);
      setErro(null);
    } catch (error) {
      setDadosTempo(null);
      setErro('Cidade não encontrada. Por favor, tente novamente.');
    }
  };

  return (
    <div>
      <h1>Previsão do Tempo</h1>
      <input
        type="text"
        value={cidade}
        onChange={(e) => setCidade(e.target.value)}
        placeholder="Digite o nome da cidade"
      />
      <button className='btn-previsao' onClick={obterPrevisaoTempo}>Buscar</button>
      {erro && <p>{erro}</p>}
      {dadosTempo && (
        <div className='resultado-previsao'>
          <h2>{dadosTempo.name}</h2>
          <p>{dadosTempo.weather[0].description}</p>
          <p>Temperatura: {dadosTempo.main.temp}°C</p>
          <p>Umidade: {dadosTempo.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
