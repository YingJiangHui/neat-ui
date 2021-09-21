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
import React from 'react';
import { Space, Checkbox } from 'neat-ui-react';

export default () => (
  <Space>
    <Checkbox /> <Checkbox defaultChecked />
  </Space>
);
```

### 受控组件

```jsx
import React, { useState } from 'react';
import { Checkbox, Button, Space } from 'neat-ui-react';

export default () => {
  const [checked, setChecked] = useState(true);
  return (
    <Space>
      <Checkbox
        checked={!checked}
        onChange={(e) => {
          setChecked(!e.target.checked);
        }}
      />
      <Checkbox
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
    </Space>
  );
};
```

### 未知的状态

```jsx
import React, { useState } from 'react';
import { Checkbox, Button, Space } from 'neat-ui-react';

export default () => {
  return (
    <Space>
      <Checkbox indeterminate={true} />
    </Space>
  );
};
```

### 禁用

```jsx
import React, { useState } from 'react';
import { Checkbox, Button, Space } from 'neat-ui-react';

export default () => {
  return (
    <Space>
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled indeterminate />
    </Space>
  );
};
```

<API src="checkbox.tsx"></API>
