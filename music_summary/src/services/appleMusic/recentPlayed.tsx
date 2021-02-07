import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

import { AppleMusicConfigureInfo, configure } from './configure';

export interface recentPlayerdInterface {
  data: [];
  next: string;
}

export const recentPlayerd = (offset: number) => {
  const [res, setRes] = useState<recentPlayerdInterface>({ data: [], next: '' });
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
