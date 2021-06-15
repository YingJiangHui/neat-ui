---
nav:
  title: Components
  path: /components
---

## Button

Demo

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return <Button>button</Button>;
};
```

Demo

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return <Button loading>button</Button>;
};
```

Demo

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Button size="mini">button</Button>
      <br />
      <Button size="small">button</Button>
      <br />
      <Button>button</Button>
      <br />
      <Button size="large">button</Button>
    </>
  );
};
```

Demo

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Button auto size="large">
        button
      </Button>
    </>
  );
};
```
