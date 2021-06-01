import React from 'react';
import closeUrl from '@/icons/close.svg';
console.log(closeUrl);
export default ({ title }: { title: string }) => (
  <h1>
    <img src={closeUrl} title="雷达图" alt="雷达图" />{' '}
    <svg xmlns={closeUrl}>
      <circle
        style={{
          stroke: 'blue',
          strokeWidth: '2px',
        }}
      />
    </svg>
  </h1>
);
