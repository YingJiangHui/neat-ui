---
nav:
  title: Components
  path: /components
---

## Loading

Demo:

```tsx
import React from 'react';
import { Loading } from 'neat-ui-react';

export default () => <Loading />;
```

Demo:

```tsx
import React, { useState } from 'react';
import { Loading } from 'neat-ui-react';

export default () => {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Loading.Container loading={loading}>222</Loading.Container>
      <button onClick={() => setLoading((loading) => !loading)}>off</button>
    </>
  );
};
```
