---
nav:
  title: Loading

  path: /components
group:
  title: 反应
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
import { Loading, Button } from 'neat-ui-react';

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button onClick={() => setLoading((loading) => !loading)}>
        {loading ? 'stop' : 'loading'}
      </Button>
      <Loading.Container loading={loading}>
        <p>
          一段文字。一段文字。一段文字。一段文字。一段文字。一段文字。一段文字。一段文字
        </p>
        <p>一段文字</p>
      </Loading.Container>
    </>
  );
};
```

其他配置

```tsx
import React, { useState } from 'react';
import { Loading, Button, useTheme } from 'neat-ui-react';

export default () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  return (
    <>
      <Button onClick={() => setLoading((loading) => !loading)}>
        {loading ? 'stop' : 'loading'}
      </Button>
      <Loading.Container
        iconColor={theme.palette.warning}
        opacity={1}
        maskColor={theme.palette.success}
        loading={loading}
      >
        <p>
          一段文字。一段文字。一段文字。一段文字。一段文字。一段文字。一段文字。一段文字
        </p>
        <p>一段文字</p>
      </Loading.Container>
    </>
  );
};
```

<API src="loading-container.tsx"></API>
