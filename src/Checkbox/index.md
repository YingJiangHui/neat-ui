---
nav:
  title: Loading

  path: /components
group:
  title: 数据收集
---

## Checkbox

### 基础使用

```jsx
import React, { useState } from 'react';
import { Checkbox, Button } from 'neat-ui-react';

export default () => {
  const [checked, setChecked] = useState(true);
  const [indeterminate, setIndeterminate] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setChecked((checked) => !checked);
        }}
      >
        check
      </Button>
      <Button
        onClick={() => {
          setIndeterminate((checked) => !checked);
        }}
      >
        indeterminate
      </Button>
      <Checkbox
        indeterminate={indeterminate}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
      <Checkbox defaultChecked={checked} />
    </>
  );
};
```
