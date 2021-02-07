import React, { useEffect } from 'react';

import window from '../Window.d';
import { recentPlayerd, recentPlayerdInterface } from '../services/appleMusic/recentPlayed';

const Top = () => {
  const recentPlayerdData: recentPlayerdInterface = recentPlayerd(0);
  console.log('recentPlayerdData', recentPlayerdData);
  useEffect(() => {
    const musickit = window.MusicKit.getInstance();
    musickit.authorize().then(function() {
      console.log('did authorize');
    });
  });
  const start = () => {
    console.log('click');
  };

  return (
    <div>
      <p>test</p>
      <button onClick={start}>apple</button>
    </div>
  );
};

export default Top;
