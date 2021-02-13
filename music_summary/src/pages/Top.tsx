import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import BubbleChart from '../component/bubbleChart';
import { bubbleData } from '../services/bubbleData';

const TopStyle = styled.body`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

// TODO: cssを設定する
const Top = () => {
  const [data, setData] = useState([] as []);
  useEffect(() => {
    bubbleData().then(val => {
      setData(val);
    });
  }, []);
  return (
    <TopStyle>
      <span>最近聞いた曲</span>
      <BubbleChart data={data}></BubbleChart>
    </TopStyle>
  );
};

export default Top;
