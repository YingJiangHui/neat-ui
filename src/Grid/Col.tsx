import React, { FC, PropsWithChildren, useContext, useMemo } from 'react';
import classnames from '@/shared/classnames';
import RowContext from '@/Grid/RowContext';

const defaultProps = {
  span: 24,
  offset: 0,
};

interface Props extends React.HTMLAttributes<any> {
  /**
   * @description       宽度1/24
   * @description.zh-CN 宽度1/24
   * @default           -
   */
  span?: number;
  /**
   * @description       偏移量1/24
   * @description.zh-CN 偏移量1/24
   * @default           0
   */
  offset?: number;
  /**
   * @description       flex 布局属性
   * @description.zh-CN flex 布局属性
   * @default           -
   */
  flex: number | string;
}

type ColProps = Props & Partial<typeof defaultProps>;
const Col: FC<PropsWithChildren<ColProps>> = (props) => {
  const {
    span,
    offset: _offset,
    flex: _flex,
    className,
    style,
    children,
    ...rest
  } = { ...defaultProps, ...props };
  const width = useMemo(() => (100 / 24) * span + '%', [span]);
  const flex = useMemo(() => {
    if (_flex) return _flex;
    if (span) {
      return `${0} ${0} ${width}`;
    }
  }, [_flex, width]);
  const offset = useMemo(() => (100 / 24) * _offset + '%', [span]);
  const { gutter } = useContext(RowContext);
  return (
    <div {...rest} className={classnames(className, 'neat-col')} style={style}>
      {children}
      <style jsx>{`
        .neat-col {
          flex: ${flex};
          max-width: ${width};
          margin-left: ${offset};
          padding-left: ${(gutter?.[1] || 0) / 2}px;
          padding-right: ${(gutter?.[1] || 0) / 2}px;
        }

        .neat-col {
          position: relative;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default Col;
