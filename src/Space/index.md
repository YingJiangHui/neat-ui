---
nav:
  title: Space
  path: /components

group:
  title: 布局
---

## Space

### 基础使用

```tsx
import React, { useState } from 'react';
import { Space, Button } from 'neat-ui-react';

export default () => {
  return (
    <>
      <Space>
        <Button>button</Button>
        <Button>button</Button>
      </Space>
    </>
  );
};
```

### 使用 size

```tsx
import React, { useState } from 'react';
import { Space, Button } from 'neat-ui-react';

export default () => {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  return (
    <>
      <Space direction={'vertical'}>
        <Space>
          <Button
            size="medium"
            onClick={() => {
              setSize('small');
            }}
          >
            small
          </Button>
          <Button
            size="medium"
            onClick={() => {
              setSize('medium');
            }}
          >
            middle
          </Button>
          <Button
            size="medium"
            onClick={() => {
              setSize('large');
            }}
          >
            large
          </Button>
        </Space>
        <Space size={size} style={{ transition: '.25s' }}>
          <Button>button</Button>
          <Button>button</Button>
          <Button>button</Button>
        </Space>
      </Space>
    </>
  );
};
```

### 使用 direction

```tsx
import React, { useState } from 'react';
import { Space, Button } from 'neat-ui-react';

export default () => {
  return (
    <>
      <Space direction="vertical">
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
      </Space>
    </>
  );
};
```

### 使用 wrap

```tsx
import React, { useState } from 'react';
import { Space, Button } from 'neat-ui-react';

export default () => {
  return (
    <>
      <Space wrap size={['small', 'large']}>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
        <Button>button</Button>
      </Space>
    </>
  );
};
```

### Align

```tsx
import React, { useState } from 'react';
import { Space, Button } from 'neat-ui-react';

export default () => {
  return (
    <>
      <Space size="large">
        <Space>
          <span>normal</span>
          <div
            style={{
              width: 100,
              height: 100,
              background: 'rgba(0,0,0,0.1)',
              lineHeight: '130px',
            }}
          >
            block
          </div>
        </Space>
        <Space align="start">
          <span>start</span>
          <div
            style={{
              width: 100,
              height: 100,
              background: 'rgba(0,0,0,0.1)',
              lineHeight: '130px',
            }}
          >
            block
          </div>
        </Space>
        <Space align="center">
          <span>center</span>
          <div
            style={{
              width: 100,
              height: 100,
              background: 'rgba(0,0,0,0.1)',
              lineHeight: '130px',
            }}
          >
            block
          </div>
        </Space>
        <Space align="end">
          <span>end</span>
          <div
            style={{
              width: 100,
              height: 100,
              background: 'rgba(0,0,0,0.1)',
              lineHeight: '130px',
            }}
          >
            block
          </div>
        </Space>
        <Space align="baseline">
          <span>baseline</span>
          <div
            style={{
              width: 100,
              height: 100,
              background: 'rgba(0,0,0,0.1)',
              lineHeight: '130px',
            }}
          >
            block
          </div>
        </Space>
      </Space>
    </>
  );
};
```

<API src="Space.tsx"></API>
