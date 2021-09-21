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
import { Scroll, Loading } from 'neat-ui-react';

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

  return (
    <>
      <div style={{ width: 300, height: '50vh', border: '1px solid black' }}>
        <Scroll style={{ paddingLeft: '1em' }}>
          {data.map((data, index) => (
            <div>
              id：{index + 1}，姓名：{data.name}，年龄：{data.age}
            </div>
          ))}
          <div style={{ textAlign: 'center' }}>
            {loading ? <Loading /> : ''}
          </div>
        </Scroll>
      </div>
    </>
  );
};
```

### 下滑加载更多

```tsx
import React, { useState, useEffect } from 'react';
import { Scroll, Loading } from 'neat-ui-react';

let timer = 0;
const request = (): Promise<{ name: string; age: number }[]> => {
  return new Promise((resolve, reject) => {
    timer = window.setTimeout(() => {
      const a = new Array(40).fill({
        name: '小明',
        age: Math.floor(Math.random() * 100),
      });
      resolve(a);
    }, 10000);
  });
};
export default () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ name: string; age: number }[]>([]);
  const [status, setStatus] = useState('');
  useEffect(() => {
    setLoading(true);
    request().then((data) => {
      setData((d) => d.concat(data));
      setLoading(false);
    });
  }, []);
  console.log('out loading', loading);
  return (
    <>
      <div style={{ width: 300, height: '50vh', border: '1px solid black' }}>
        <Scroll
          style={{ paddingLeft: '1em' }}
          upGlideLoading={loading}
          enableUpGlideLoad={true}
          onUpGlideLoad={() => {
            console.log('load');
            setLoading(true);
            request().then((data) => {
              setData((d) => d.concat(data));
              setLoading(false);
            });
          }}
        >
          {data.map((data, index) => (
            <div>
              id：{index + 1}，姓名：{data.name}，年龄：{data.age}
            </div>
          ))}
        </Scroll>
      </div>
    </>
  );
};
```

### 下拉更新（移动端）

```tsx
import React, { useState, useEffect } from 'react';
import { Scroll, Loading } from 'neat-ui-react';

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
  const [status, setStatus] = useState('');
  useEffect(() => {
    setLoading(true);
    request().then((data) => {
      setData((d) => d.concat(data));
      setLoading(false);
    });
  }, []);
  const map = {
    updating: 'updating',
    updatable: '松开手指更新内容~',
    disUpdate: '下拉更新',
    completed: '更新完成',
    none: '',
  };
  const node = <div>{status === 'updating' ? <Loading /> : map[status]}</div>;
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
          pullDownUpdating={loading}
          enablePullDownUpdate={true}
          onPullDownUpdate={(status) => {
            setStatus(status);
            const map: { [key in typeof status]: () => void } = {
              updating: () => {
                setLoading(true);
                request().then((data) => {
                  setData(data);
                  setLoading(false);
                });
              },
              disUpdate: () => {
                clearTimeout(timer);
              },
            };
            map[status]?.();
          }}
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
