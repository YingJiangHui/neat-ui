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
      <Loading.Container loading={loading}>
        <button
          onClick={() => {
            alert('1');
          }}
        >
          click
        </button>
      </Loading.Container>
      <button onClick={() => setLoading((loading) => !loading)}>off</button>
    </>
  );
};
```
