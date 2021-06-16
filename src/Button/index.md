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
  return (
    <>
      <Button loading>loading</Button>
      <br />
      <br />
      <Button loading type="success">
        loading
      </Button>
      <br />
      <br />
      <Button loading type="error">
        loading
      </Button>
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
      <Button auto>Active</Button>
      <br />
      <br />
      <Button auto type="secondary">
        Secondary
      </Button>
      <br />
      <br />
      <Button auto type="success">
        Success
      </Button>
      <br />
      <br />
      <Button auto type="warning">
        Warning
      </Button>
      <br />
      <br />
      <Button auto type="error">
        Error
      </Button>
      <br />
      <br />
      <Button auto type="abort">
        Abort
      </Button>
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
      <Button auto type="secondary" ghost>
        Secondary
      </Button>
      <br />
      <br />
      <Button auto type="success" ghost>
        Success
      </Button>
      <br />
      <br />
      <Button auto type="warning" ghost>
        Warning
      </Button>
      <br />
      <br />
      <Button auto type="error" ghost>
        Error
      </Button>
    </>
  );
};
```
