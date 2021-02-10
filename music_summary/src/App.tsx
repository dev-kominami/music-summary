import React from 'react';
import './App.css';

function App() {
  const start = () => {
    console.log('click');
    const musickit = window.MusicKit.getInstance();
    musickit.authorize().then(function() {
      console.log('did authorize');
    });
  };
  return (
    <div className='App'>
      <header className='App-header'>
        <p>Music Summary</p>
        <a href='/top' className='App-link' onClick={start}>
          Login
        </a>
      </header>
    </div>
  );
}

export default App;
