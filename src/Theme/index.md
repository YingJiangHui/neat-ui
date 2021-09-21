---
nav:
  title: Theme
  path: /components

group:
  title: 主题
---

## Theme

使用主题

```jsx
import React, { useState } from 'react';
import { NeatProvider, useTheme, Button } from 'neat-ui-react';
const Child = ({ switchTheme }) => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.palette.background, padding: '20px' }}>
      <button onClick={switchTheme}>switch theme</button> {theme.type}
      <br />
      <br />
      <Button type={'error'}>button</Button>
      <br />
      <br />
      <Button type={'secondary'}>button</Button>
      <br />
      <br />
      <Button type={'secondary'} ghost>
        button
      </Button>
      <br />
      <br />
      <Button type="success-light">button</Button>
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
