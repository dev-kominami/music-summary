import React, { useEffect, useState } from 'react';

import window from '../Window.d';
import BubbleChart from '../component/bubbleChart';
import { bubbleData } from '../services/bubbleData';

const Top = () => {
  const [data, setData] = useState([] as []);
  useEffect(() => {
    bubbleData().then(val => {
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
