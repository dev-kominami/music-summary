import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

import { useWindowDimensions } from './useWindow';

type Props = {
  data: [];
};

const BubbleChart = (props: Props) => {
  const { width, height } = useWindowDimensions();
  const [resize, seResize] = useState({ width: width, height: height });
  useEffect(() => {
    if (!props.data) return;
    const childrenData = props.data.map((x: any) => {
      return {
        Name: x.attributes.name,
        ArtistName: x.attributes.artistName,
        Count: Math.random() * (props.data.length - 1) + 1,
      };
    });
    if (childrenData.length === 0) return;
    const dataset = {
      children: childrenData,
    };
    const diameter = 1000;
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const bubble = d3
      .pack()
      .size([resize.width, diameter])
      .padding(1.5);
    const svg = d3
      .select('#bubble')
      .append('svg')
      .attr('viewBox', `0 0 ${resize.width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('class', 'bubble');
    const nodes = d3.hierarchy(dataset).sum(function(d: any) {
      return d.Count;
    });
    const node = svg
      .selectAll('.node')
      .data(bubble(nodes).descendants())
      .enter()
      .filter(function(d) {
        return !d.children;
      })
      .append('g')
      .attr('class', 'node')
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });

    node.append('title').text(function(d: any) {
      return d.Name + ': ' + d.Count;
    });

    node
      .append('circle')
      .attr('r', function(d) {
        return d.r;
      })
      .style('fill', function(d, i) {
        return color(`${i}`);
      });

    node
      .append('text')
      .attr('dy', '.2em')
      .style('text-anchor', 'middle')
      .text(function(d: any) {
        return d.data.Name.substring(0, d.r / 3);
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', function(d) {
        return d.r / 5;
      })
      .attr('fill', 'white');

    node
      .append('text')
      .attr('dy', '1.3em')
      .style('text-anchor', 'middle')
      .text(function(d: any) {
        return d.data.ArtistName;
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', function(d) {
        return d.r / 5;
      })
      .attr('fill', 'white');

    d3.select(self.frameElement).style('height', diameter + 'px');
  }, [props]);

  return <a id='bubble'></a>;
};

export default BubbleChart;
