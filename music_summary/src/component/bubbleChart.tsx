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
    //TODO: 表示数を制御したい
    const childrenData = props.data.map((x: any) => {
      const artwork = x.attributes.artwork.url.replace('{w}x{h}', '100x100');
      return {
        id: x.id,
        Name: x.attributes.name,
        ArtistName: x.attributes.artistName,
        Count: Math.random() * (props.data.length - 1) + 1,
        Icon: artwork,
      };
    });
    if (childrenData.length === 0) return;
    const dataset = {
      children: childrenData,
    };
    const diameter = 1000;
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

    node
      .append('defs')
      .append('pattern')
      .attr('id', function(d: any) {
        return d.data.id + '-icon-img';
      })
      .attr('width', 1)
      .attr('height', 1)
      .attr('patternContentUnits', 'objectBoundingBox')
      .append('svg:image')
      .attr('xlink:xlink:href', function(d: any) {
        return d.data.Icon;
      })
      .attr('height', 1)
      .attr('width', 1)
      .attr('preserveAspectRatio', 'xMinYMin slice');

    node.append('title').text(function(d: any) {
      return d.Name + ': ' + d.Count;
    });

    node
      .append('circle')
      .attr('r', function(d) {
        return d.r;
      })
      .style('fill', function(d: any) {
        return `url(#${d.data.id}-icon-img)`;
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
    //TODO: hoverしたらzoomするようにする
    //https://stackoverflow.com/questions/63174257/react-component-that-zooms-into-an-image-while-keeping-dimensions-on-mouse-over
    // d3.selectAll('.node').on('mouseover', e => {});
  }, [props]);
  return <a id='bubble'></a>;
};

export default BubbleChart;
