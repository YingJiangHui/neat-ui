---
nav:
  title: Switch
  path: /components

group:
  title: Basic

  path: /basic
---

## Tree

数据结构

```tsx
import React from 'react';
import { Tree } from 'neat-ui-react';
const files = [
  {
    type: 'leaf',
    name: 'file1',
    key: '1',
    onClick: () => {
      console.log('file1');
    },
  },
  {
    type: 'branch',
    name: 'folder1',
    key: '2',
    onClick: () => console.log('folder1'),
    value: [
      {
        key: '2-1',
        type: 'branch',
        name: 'folder1',
        value: [
          {
            key: '2-1-1',
            type: 'leaf',
            name: 'file2',
            onClick: () => {
              console.log('file2');
            },
          },
          {
            key: '2-1-2',
            type: 'leaf',
            name: 'file2',
            onClick: () => {
              console.log('file2');
            },
          },
          {
            key: '2-1-3',
            type: 'leaf',
            name: 'file2',
            onClick: () => {
              console.log('file2');
            },
          },
          {
            key: '2-1-4',
            type: 'branch',
            name: 'folder1',
            value: [
              {
                key: '2-1-4-1',
                type: 'leaf',
                name: 'file2',
                onClick: () => {
                  console.log('file2');
                },
              },
              {
                key: '2-1-4-2',
                type: 'leaf',
                name: 'file2',
                onClick: () => {
                  console.log('file2');
                },
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
      <Tree value={files} />
    </>
  );
};
```

jsx 风格

```tsx
import React from 'react';
import { Tree } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Tree>
        <Tree.Folder name="文件夹1" key={'1'}>
          <Tree.File
            key={'1-2'}
            onClick={() => {
              console.log('文件1');
            }}
          >
            文件1
          </Tree.File>
        </Tree.Folder>
        <Tree.Folder
          key={'2'}
          name="文件夹2"
          onClick={() => {
            console.log('文件夹2');
          }}
        >
          <Tree.Folder name="文件夹1" key={'2-1'}>
            <Tree.File
              key={'2-1-1'}
              onClick={() => {
                console.log('文件2');
              }}
            >
              文件2
            </Tree.File>
          </Tree.Folder>
        </Tree.Folder>
      </Tree>
    </>
  );
};
```
