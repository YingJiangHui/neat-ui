---
nav:
  title: Icon

  path: /components

group:
  title: 布局
---

## Grid

### 基本用法

```tsx
import React from 'react';
import { Row, Col, useTheme } from 'neat-ui-react';

export default () => {
  const { palette } = useTheme();
  const defaultSytle = {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
  };
  const levelList = [
    undefined,
    palette.grayscale_1,
    palette.grayscale_2,
    palette.grayscale_3,
    palette.grayscale_4,
    palette.grayscale_5,
    palette.grayscale_6,
    palette.grayscale_7,
    palette.grayscale_8,
    palette.grayscale_9,
  ];
  return (
    <>
      <Row>
        <Col span={1} style={{ ...defaultSytle, background: levelList[5] }}>
          1
        </Col>
        <Col span={2} style={{ ...defaultSytle, background: levelList[6] }}>
          2
        </Col>
        <Col span={3} style={{ ...defaultSytle, background: levelList[7] }}>
          3
        </Col>
        <Col span={4} style={{ ...defaultSytle, background: levelList[8] }}>
          4
        </Col>
        <Col span={14} style={{ ...defaultSytle, background: levelList[9] }}>
          14
        </Col>
      </Row>
      <Row>
        <Col span={2} style={{ ...defaultSytle, background: levelList[5] }}>
          2
        </Col>
        <Col span={3} style={{ ...defaultSytle, background: levelList[6] }}>
          3
        </Col>
        <Col span={4} style={{ ...defaultSytle, background: levelList[7] }}>
          4
        </Col>
        <Col span={5} style={{ ...defaultSytle, background: levelList[8] }}>
          5
        </Col>
        <Col span={10} style={{ ...defaultSytle, background: levelList[9] }}>
          10
        </Col>
      </Row>
      <Row>
        <Col span={4} style={{ ...defaultSytle, background: levelList[5] }}>
          4
        </Col>
        <Col span={5} style={{ ...defaultSytle, background: levelList[6] }}>
          5
        </Col>
        <Col span={6} style={{ ...defaultSytle, background: levelList[7] }}>
          6
        </Col>
        <Col span={7} style={{ ...defaultSytle, background: levelList[8] }}>
          7
        </Col>
        <Col span={2} style={{ ...defaultSytle, background: levelList[9] }}>
          2
        </Col>
      </Row>
    </>
  );
};
```

### 偏移量 offset

```tsx
import React from 'react';
import { Row, Col, useTheme } from 'neat-ui-react';

export default () => {
  const { palette } = useTheme();
  const defaultSytle = {
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
  };
  const levelList = [
    undefined,
    palette.grayscale_1,
    palette.grayscale_2,
    palette.grayscale_3,
    palette.grayscale_4,
    palette.grayscale_5,
    palette.grayscale_6,
    palette.grayscale_7,
    palette.grayscale_8,
    palette.grayscale_9,
  ];
  return (
    <>
      <Row>
        <Col span={1} style={{ ...defaultSytle, background: levelList[5] }}>
          col-1
        </Col>
        <Col
          span={3}
          offset={2}
          style={{ ...defaultSytle, background: levelList[7] }}
        >
          col-3 offset-2
        </Col>
        <Col
          span={14}
          offset={4}
          style={{ ...defaultSytle, background: levelList[9] }}
        >
          col-14 offset-4
        </Col>
      </Row>
      <Row>
        <Col span={2} style={{ ...defaultSytle, background: levelList[5] }}>
          col-2
        </Col>
        <Col
          span={4}
          offset={3}
          style={{ ...defaultSytle, background: levelList[7] }}
        >
          col-4 offset-3
        </Col>
        <Col
          span={10}
          offset={5}
          style={{ ...defaultSytle, background: levelList[9] }}
        >
          col-10 offset-5
        </Col>
      </Row>
    </>
  );
};
```

### 间隙 gutter

```tsx
import React from 'react';
import { Row, Col, useTheme } from 'neat-ui-react';

export default () => {
  const { palette } = useTheme();
  const style = {
    background: '#000',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
  };
  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <div style={style}>span-24</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
      </Row>
    </>
  );
};
```

```tsx
import React from 'react';
import { Row, Col, useTheme } from 'neat-ui-react';

export default () => {
  const { palette } = useTheme();
  const style = {
    background: '#000',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
  };
  return (
    <>
      <Row gutter={[8, 32]}>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
      </Row>
    </>
  );
};
```

### flex

```tsx
import React from 'react';
import { Row, Col, useTheme } from 'neat-ui-react';

export default () => {
  const { palette } = useTheme();
  const style = {
    background: '#000',
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
  };
  return (
    <>
      <Row gutter={16}>
        <Col flex={'1 1 500px'}>
          <div style={style}>flex: 1 1 500px</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>

        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col span={4}>
          <div style={style}>span-4</div>
        </Col>
        <Col flex={'auto'}>
          <div style={style}>flex-auto</div>
        </Col>
      </Row>
    </>
  );
};
```

## Col Component

<API src="./col.tsx"></API>

## Row Component

<API src="./row.tsx"></API>
