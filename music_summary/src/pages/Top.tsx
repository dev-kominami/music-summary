import React, { useEffect, useState } from 'react';

import window from '../Window.d';
import BubbleChart from '../component/bubbleChart';
import { fetchRecentPlayerdAll } from '../services/appleMusic/recentPlayed';

const Top = () => {
  const [data, setData] = useState([] as []);
  useEffect(() => {
    fetchRecentPlayerdAll().then(val => {
      setData(val);
    });
  }, []);
  return (
    <div>
      <BubbleChart data={data}></BubbleChart>
    </div>
  );
};

export default Top;
