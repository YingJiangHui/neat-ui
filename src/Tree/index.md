---
nav:
  title: Switch
  path: /components

group:
  title: 数据展示
---

## Tree

## 基础使用

```tsx
import React from 'react';
import { Tree } from 'neat-ui-react';
const value = [
  {
    type: 'leaf',
    name: '0-0-0-0',
    key: '0-0-0-0',
  },
  {
    type: 'branch',
    name: '1-0-0-0',
    key: '1-0-0-0',
    value: [
      {
        key: '1-1-0-0',
        type: 'branch',
        name: '1-1-0-0',
        value: [
          {
            key: '1-1-1-0',
            type: 'leaf',
            name: '1-1-1-0',
          },
          {
            key: '1-1-2-0',
            type: 'leaf',
            name: '1-1-2-0',
          },
          {
            key: '1-1-3-0',
            type: 'leaf',
            name: '1-1-3-0',
          },
          {
            key: '1-1-4-0',
            type: 'branch',
            name: '1-1-4-0',
            value: [
              {
                key: '1-1-4-1',
                type: 'leaf',
                name: '1-1-4-1',
              },
              {
                key: '1-1-4-2',
                type: 'leaf',
                name: '1-1-4-2',
              },
            ],
          },
        ],
      },
    ],
  },
];
export default () => {
  return (
    <>
      <Tree onSelect={console.log} value={value} />
    </>
  );
};
```

## 多选

```tsx
import React from 'react';
import { Tree } from 'neat-ui-react';
const files = [
  {
    type: 'leaf',
    name: '0-0-0-0',
    key: '0-0-0-0',
  },
  {
    type: 'branch',
    name: '1-0-0-0',
    key: '1-0-0-0',
    value: [
      {
        key: '1-1-0-0',
        type: 'branch',
        name: '1-1-0-0',
        value: [
          {
            key: '1-1-1-0',
            type: 'leaf',
            name: '1-1-1-0',
          },
          {
            key: '1-1-2-0',
            type: 'leaf',
            name: '1-1-2-0',
          },
          {
            key: '1-1-3-0',
            type: 'leaf',
            name: '1-1-3-0',
          },
          {
            key: '1-1-4-0',
            type: 'branch',
            name: '1-1-4-0',
            value: [
              {
                key: '1-1-4-1',
                type: 'leaf',
                name: '1-1-4-1',
              },
              {
                key: '1-1-4-2',
                type: 'leaf',
                name: '1-1-4-2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'branch',
    name: '2-0-0-0',
    key: '2-0-0-0',
    value: [
      {
        key: '2-1-0-0',
        type: 'branch',
        name: '2-1-0-0',
        value: [
          {
            key: '2-1-2-0',
            type: 'leaf',
            name: '2-1-2-0',
          },
          {
            key: '2-1-3-0',
            type: 'leaf',
            name: '2-1-3-0',
          },
        ],
      },
    ],
  },
];
export default () => {
  return (
    <>
      <Tree multiple onSelect={console.log} value={files} />
    </>
  );
};
```

## 自动展开

```tsx
import React from 'react';
import { Tree } from 'neat-ui-react';
const files = [
  {
    type: 'leaf',
    name: '0-0-0-0',
    key: '0-0-0-0',
  },
  {
    type: 'branch',
    name: '1-0-0-0',
    key: '1-0-0-0',
    value: [
      {
        key: '1-1-0-0',
        type: 'branch',
        name: '1-1-0-0',
        value: [
          {
            key: '1-1-1-0',
            type: 'leaf',
            name: '1-1-1-0',
          },
          {
            key: '1-1-2-0',
            type: 'leaf',
            name: '1-1-2-0',
          },
          {
            key: '1-1-3-0',
            type: 'leaf',
            name: '1-1-3-0',
          },
          {
            key: '1-1-4-0',
            type: 'branch',
            name: '1-1-4-0',
            value: [
              {
                key: '1-1-4-1',
                type: 'leaf',
                name: '1-1-4-1',
              },
              {
                key: '1-1-4-2',
                type: 'leaf',
                name: '1-1-4-2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'branch',
    name: '2-0-0-0',
    key: '2-0-0-0',
    value: [
      {
        key: '2-1-0-0',
        type: 'branch',
        name: '2-1-0-0',
        value: [
          {
            key: '2-1-2-0',
            type: 'leaf',
            name: '2-1-2-0',
          },
          {
            key: '2-1-3-0',
            type: 'leaf',
            name: '2-1-3-0',
          },
        ],
      },
    ],
  },
];
export default () => {
  return (
    <>
      <Tree autoExpand multiple onSelect={console.log} value={files} />
    </>
  );
};
```

<API src="./tree.tsx"></API>
