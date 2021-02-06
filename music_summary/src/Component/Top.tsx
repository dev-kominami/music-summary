import React from 'react';

import window from '../Window.d';

const Top = () => {
  const start = () => {
    const musickit = window.MusicKit.getInstance();
    musickit.authorize().then(function() {
      console.log('did authorize');
    });
  };

  return (
    <div>
      <p>test</p>
      <button onClick={start}>apple</button>
    </div>
  );
};

export default Top;
