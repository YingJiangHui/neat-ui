---
nav:
  title: Switch
  path: /components

group:
  title: Basic

  path: /basic
---

## Tree

```tsx
import React from 'react';
import { Tree } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Tree>
        <Tree.Folder name="文件夹1">
          <Tree.File>文件1</Tree.File>
        </Tree.Folder>
        <Tree.Folder name="文件夹2">
          <Tree.Folder name="文件夹1">
            <Tree.File>文件1</Tree.File>
          </Tree.Folder>
        </Tree.Folder>
      </Tree>
    </>
  );
};
```
