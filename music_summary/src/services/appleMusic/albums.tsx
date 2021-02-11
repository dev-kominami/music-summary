import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { AppleMusicConfigureInfo, configure } from './configure';

const config: AppleMusicConfigureInfo = configure();

export const fetchAlbumsTracks = async (id: number) => {
  const p_al = Promise.resolve(await api(id));
  const album = await p_al;
  const tracks: [] = album.data[0].relationships.tracks.data;
  return tracks;
};

const api = async (id: number) => {
  const response = Promise.resolve(
    await axios.get(`${config.baseApiUrl}/catalog/${config.storefrontId}/albums/${id}`, {
      headers: {
        Authorization: `Bearer ${config.devToken}`,
        'Music-User-Token': `${config.userToken}`,
      },
    }),
  );
  return (await response).data;
};
