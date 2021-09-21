---
nav:
  title: Icon

  path: /components
group:
  title: 通用
---

## Icon

### 基础使用

目前支持的 Icon，可在手动在项目中使用 svg symbol 的形式引用 icon

```tsx
import React from 'react';
import { Icon, Row, Col } from 'neat-ui-react';

export default () => {
  return (
    <>
      <Row>
        <Col flex={1}>
          Close：
          <Icon name="close" />
        </Col>
        <Col flex={1}>
          Top：
          <Icon name="top" />
        </Col>
        <Col flex={1}>
          Bottom：
          <Icon name="bottom" />
        </Col>
        <Col flex={1}>
          Left：
          <Icon name="left" />
        </Col>
        <Col flex={1}>
          Right：
          <Icon name="right" />
        </Col>
        <Col flex={1}>
          Line：
          <Icon name="line" />
        </Col>
        <Col flex={1}>
          True：
          <Icon name="true" />
        </Col>
      </Row>
    </>
  );
};
```

<API src="./icon.tsx"></API>
