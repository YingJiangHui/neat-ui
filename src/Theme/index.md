---
nav:
  title: Theme
  path: /components
---

## Theme

使用主题

```jsx
import React, { useState } from 'react';
import { NeatProvider, useTheme } from 'neat-ui-react';
const Child = ({ switchTheme }) => {
  const theme = useTheme();
  return (
    <div>
      <button onClick={switchTheme}>switch theme</button> {theme.type}
    </div>
  );
};
export default () => {
  const [theme, setTheme] = useState('light');
  const switchTheme = () => {
    setTheme((latestTheme) => (latestTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <NeatProvider themeType={theme}>
      <Child switchTheme={switchTheme} />
    </NeatProvider>
  );
};
```
