---
nav:
  title: Components
  path: /components
---

## Theme

使用主题

```jsx
import React, { useState } from 'react';
import { NeatProvider, useTheme } from 'neat-ui-react';
const Child = () => {
  const theme = useTheme();
  return <div>{theme.type}</div>;
};
export default () => {
  const [theme, setTheme] = useState('light');
  const switchTheme = () => {
    setTheme((latestTheme) => (latestTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <NeatProvider themeType={theme}>
      <button onClick={switchTheme}>swith theme</button>
      <Child />
    </NeatProvider>
  );
};
```
