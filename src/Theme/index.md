---
nav:
  title: Theme
  path: /components

group:
  title: 主题
---

## Theme

## 基本用法

使用 NeatProvider 包裹组件，使用 themeType 参数来指定当前主题

```jsx
import React, { useState } from 'react';
import {
  NeatProvider,
  useTheme,
  Button,
  Line,
  Space,
  Loading,
} from 'neat-ui-react';
const Child = ({ switchTheme }) => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.palette.background, padding: '20px' }}>
      <Space direction={'vertical'}>
        <Button onClick={switchTheme}>checkout {theme.type} theme</Button>
        <Line level={1} />
        <Line level={2} />
        <Line level={3} />
        <Line level={4} />
        <Line level={5} />
        <Line level={6} />
        <Line level={7} />
        <Line level={8} />
        <Line level={9} />
        <Space>
          <Button type={'secondary'}>button</Button>
          <Button auto type="secondary" ghost={true}>
            Secondary
          </Button>
          <Button auto type="success" ghost={true}>
            Success
          </Button>
          <Button auto type="warning" ghost={true}>
            Warning
          </Button>
          <Button auto type="error" ghost={true}>
            Error
          </Button>
          <Button auto type="secondary-light">
            Secondary
          </Button>
          <Button auto type="success-light">
            Success
          </Button>
          <Button auto type="warning-light">
            Warning
          </Button>
          <Button auto type="error-light">
            Error
          </Button>
        </Space>
        <Space>
          <Loading size="small" />
          <br />
          <br />
          <Loading size="middle" />
          <br />
          <br />
          <Loading size="large" />
        </Space>
      </Space>
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

### 自定义主题

使用 themes 属性自定义 ui 主题，接受一个 NeatUIUserTheme 类型的数组，通过 NeatUIUserTheme.type 属性来区别一个主题。

```jsx
import React, { useState } from 'react';
import {
  NeatProvider,
  useTheme,
  Button,
  Line,
  Space,
  Loading,
} from 'neat-ui-react';
const Child = ({ switchTheme }) => {
  const theme = useTheme();
  return (
    <div style={{ background: theme.palette.background, padding: '20px' }}>
      <Space direction={'vertical'}>
        <Button onClick={switchTheme} type="secondary">
          checkout {theme.type} theme
        </Button>
        <Space>
          <Button type="secondary">Secondary</Button>
          <Button type="secondary" ghost={true}>
            Secondary Ghost
          </Button>
          <Button auto type="secondary-light">
            Secondary Light
          </Button>
        </Space>
      </Space>
    </div>
  );
};
export default () => {
  const [theme, setTheme] = useState('light');
  const switchTheme = () => {
    setTheme((latestTheme) => (latestTheme === 'light' ? 'myTheme' : 'light'));
  };
  const customThemes = [
    {
      type: 'myTheme',
      palette: { background: '#0070f3', foreground: '#f5a623' },
    },
  ];
  return (
    <NeatProvider themes={customThemes} themeType={theme}>
      <Child switchTheme={switchTheme} />
    </NeatProvider>
  );
};
```
