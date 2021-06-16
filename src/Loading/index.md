---
nav:
  title: Components
  path: /components
---

## Loading

### 基础使用

```tsx
import React from 'react';
import { Loading } from 'neat-ui-react';

export default () => <Loading />;
```

### 大小

```tsx
import React from 'react';
import { Loading } from 'neat-ui-react';

export default () => (
  <>
    <Loading size="small" />
    <br />
    <br />
    <Loading size="middle" />
    <br />
    <br />
    <Loading size="large" />
  </>
);
```

### 颜色

```tsx
import React from 'react';
import { Loading } from 'neat-ui-react';

export default () => (
  <>
    <Loading color="#0070f3" />
    <br />
    <br />
    <Loading color="#fc011a" />
    <br />
    <br />
    <Loading color="#ffce44" />
  </>
);
```

<API src="loading.tsx"></API>

### Loading Container

对于 Container 中的内容加载时

```tsx
import React, { useState } from 'react';
import { Loading } from 'neat-ui-react';

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Loading.Container loading={loading}>
        <p>这是一段内容</p>
      </Loading.Container>
      <button onClick={() => setLoading((loading) => !loading)}>off</button>
    </>
  );
};
```

<API src="loading-container.tsx"></API>
