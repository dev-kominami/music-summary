import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { AppleMusicConfigureInfo, configure } from './configure';
import { fetchAlbumsTracks } from './albums';

const config: AppleMusicConfigureInfo = configure();
export interface recentPlayerdInterface {
  data: [];
}

export const recentPlayerd = (offset: number) => {
  const [res, setRes] = useState<recentPlayerdInterface>({ data: [] });
  const config: AppleMusicConfigureInfo = configure();
  useEffect(() => {
    fetchRecentPlayerd(offset, config);
  }, []);
  const fetchRecentPlayerd = (offset: number, config: AppleMusicConfigureInfo) => {
    axios
      .get(`${config.baseApiUrl}/me/recent/played`, {
        params: {
          limit: 10,
          offset: offset,
        },
        headers: {
          Authorization: `Bearer ${config.devToken}`,
          'Music-User-Token': `${config.userToken}`,
        },
      })
      .then(response => {
        const recentData: recentPlayerdInterface = response.data;
        setRes(recentData);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  };
  return res;
};

export const fetchRecentPlayerdAll = async () => {
  const resData: any = [];
  for (let i = 0; i <= 50; ) {
    const r: recentPlayerdInterface = await fetchRecentPlayer(i);
    r.data.forEach((obj: any) => {
      resData.push(obj);
    });
    i = i + 10;
  }
  return resData;
};

export const fetchRecentPlayerdTrackAll = async () => {
  const resData: any = [];
  for (let i = 0; i <= 10; ) {
    const r: recentPlayerdInterface = await fetchRecentPlayer(i);
    r.data.forEach(async (obj: any) => {
      if (obj.type === 'albums') {
        const album = await fetchAlbumsTracks(obj.id);
        album.forEach(track => {
          resData.push(track);
        });
      }
      resData.push(obj);
    });
    i = i + 10;
  }
  return resData;
};

const fetchRecentPlayer = async (offset: number) => {
  const response = Promise.resolve(
    await axios.get(`${config.baseApiUrl}/me/recent/played`, {
      params: {
        limit: 10,
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${config.devToken}`,
        'Music-User-Token': `${config.userToken}`,
      },
    }),
  );
  return (await response).data;
};
