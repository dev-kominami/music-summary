import React, { useEffect, useState } from 'react';

import window from '../Window';

const Top = () => {
  // let musicKitInstance: any;
  // const [musicKitInstance] = useState();
  useEffect(() => {
    console.log('top before window.MusicKit', window.musickit);
    document.addEventListener('musickitloaded', () => {
      console.log('top musickitloaded', window.musickit);
      window.musickit = window.musickit.configure({
        developerToken: 'DEVELOPER-TOKEN',
        app: {
          name: 'MusicKit Web App',
          build: '1.0.0',
        },
      });
      // musicKitInstance(m);
      // delete window.MusicKit; // clear global scope
      // resolve(musicKitInstance);
    });
  });

  // const setupMusicKit = new Promise(resolve => {
  //   document.addEventListener('musickitloaded', () => {
  //     console.log('window.MusicKit', window.MusicKit);
  //     const musicKitInstance = window.MusicKit.configure({
  //       developerToken: 'DEVELOPER-TOKEN',
  //       app: {
  //         name: 'MusicKit Web App',
  //         build: '1.0.0',
  //       },
  //     });
  //     // delete window.MusicKit; // clear global scope
  //     resolve(musicKitInstance);
  //   });
  // });

  const start = () => {
    // const music = window.MusicKit.getInstance();
    // console.log('music', music);
    // music.authorize().then(function() {
    //   music.player.play();
    // });

    console.log('start window.MusicKit', window.MusicKit);
    window.MusicKit.authorize().then(function() {
      console.log('did authorize');
    });
    // setupMusicKit.then(async musicKit => {
    // console.log(typeof musicKit);
    // try {
    //   await musicKit.authorize();
    //   // await musicKit.unauthorize();
    // } catch (error) {
    //   // Handle cases when authorization fails
    // }
    // });
  };

  return (
    <div>
      <p>test</p>
      <button onClick={start}>apple</button>
    </div>
  );
};

export default Top;
