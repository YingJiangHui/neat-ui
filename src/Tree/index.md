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
    type: 'file',
    name: 'file1',
    onClick: () => {
      console.log('file1');
    },
  },
  {
    type: 'directory',
    name: 'folder1',
    onClick: () => console.log('folder1'),
    value: [
      {
        type: 'directory',
        name: 'folder1',
        value: [
          {
            type: 'file',
            name: 'file2',
            onClick: () => {
              console.log('file2');
            },
          },
          {
            type: 'file',
            name: 'file2',
            onClick: () => {
              console.log('file2');
            },
          },
          {
            type: 'file',
            name: 'file2',
            onClick: () => {
              console.log('file2');
            },
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
        <Tree.Folder name="文件夹1">
          <Tree.File
            onClick={() => {
              console.log('文件1');
            }}
          >
            文件1
          </Tree.File>
        </Tree.Folder>
        <Tree.Folder
          name="文件夹2"
          onClick={() => {
            console.log('文件夹2');
          }}
        >
          <Tree.Folder name="文件夹1">
            <Tree.File
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
