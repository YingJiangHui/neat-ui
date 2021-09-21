---
nav:
  title: Scroll

  path: /components
group:
  title: 数据展示
---

## Scroll

### 基础使用

```tsx
import React, { useState, useEffect } from 'react';
import { Scroll, useScroll } from 'neat-ui-react';
let timer = 0;
const request = (): Promise<{ name: string; age: number }[]> => {
  return new Promise((resolve, reject) => {
    timer = window.setTimeout(() => {
      const a = new Array(40).fill({
        name: '小明',
        age: Math.floor(Math.random() * 100),
      });
      resolve(a);
    }, 1000);
  });
};
export default () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ name: string; age: number }[]>([]);
  useEffect(() => {
    setLoading(true);
    request().then((data) => {
      setData((d) => d.concat(data));
      setLoading(false);
    });
  }, []);
  const { getScrollPropsMap, status, ...reset } = useScroll({
    upGlideLoading: loading,
    pullDownUpdating: loading,
    disablePullDownUpdate: false,
    enableUpGlideLoad: true,
    completedWaitTime: 1000,
    onEvent: () => {
      return {
        onCanceledUpdating: () => {
          console.log('cancel');
          clearTimeout(timer);
        },
        onUpdating: () => {
          console.log('update');
          setLoading(true);
          request().then((data) => {
            setData(data);
            setLoading(false);
          });
        },
        onUpGlideLoad: () => {
          setLoading(true);
          request().then((data) => {
            setData((d) => d.concat(data));
            setLoading(false);
          });
        },
      };
    },
  });
  // console.log(reset)
  const map = {
    updating: 'updating',
    updatable: 'updatable',
    disUpdate: 'disUpdate',
    completed: 'completed',
    none: 'none',
  };
  const node = <div>{map[status]}</div>;
  return (
    <>
      <button
        onClick={() => {
          setLoading((loading) => !loading);
        }}
      >
        trigger
      </button>
      <div style={{ width: 200, height: '30vh' }}>
        <Scroll
          getScrollPropsMap={getScrollPropsMap}
          whenPullingReactNode={node}
        >
          {data.map((d) => (
            <div>
              姓名：{d.name}年龄：{d.age}
            </div>
          ))}
          {loading ? '加载中...' : ''}
        </Scroll>
      </div>
    </>
  );
};
```
