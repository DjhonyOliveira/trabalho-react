import React, { useEffect, useState } from 'react';
import './App.css';
import Sala from './components/Sala';
import Cozinha from './components/Cozinha';
import Quarto from './components/Quarto';

const App: React.FC = () => {
  
  return (
    <body>
      <div className='casa'>
        <h1>Casa Inteligente</h1>
        <div className="comodos">
          <Sala/>
          <Cozinha/>
          <Quarto/>
        </div>
      </div>
      <p className='developer'>Desenvolvido por: Djonatan R. Oliveira e Ayrton Lorenzo Klettenberg</p>
    </body>
  );
}

export default App;
