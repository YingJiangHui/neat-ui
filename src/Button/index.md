---
nav:
  title: Button

  path: /components
group:
  title: Basic

  path: /basic
---

## Button

### Default

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return (
    <Button
      style={{ cursor: 'not-allowed', pointerEvents: 'none' }}
      onClick={() => {
        console.log(1);
      }}
    >
      button
    </Button>
  );
};
```

### Loading

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Button loading>loading</Button>
      <br />
      <br />
      <Button loading type="success" auto>
        loading
      </Button>
      <br />
      <br />
      <Button loading type="secondary">
        loading
      </Button>
    </>
  );
};
```

### Disable

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Button disabled>disabled</Button>
      <br />
      <br />
      <Button disabled type="success" auto>
        disabled
      </Button>
      <br />
      <br />
      <Button disabled type="secondary">
        disabled
      </Button>
    </>
  );
};
```

### Size

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Button size="mini">button</Button>
      <br />
      <br />
      <Button size="small">button</Button>
      <br />
      <br />
      <Button>button</Button>
      <br />
      <br />
      <Button size="large">button</Button>
    </>
  );
};
```

Button Type

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

Light

```tsx
import React from 'react';
import { Button } from 'neat-ui-react';
export default () => {
  return (
    <>
      <Button auto type="secondary-light">
        Secondary
      </Button>
      <br />
      <br />
      <Button auto type="success-light">
        Success
      </Button>
      <br />
      <br />
      <Button auto type="warning-light">
        Warning
      </Button>
      <br />
      <br />
      <Button auto type="error-light">
        Error
      </Button>
    </>
  );
};
```

Ghost - 反色

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

<API src="./button.tsx"></API>
