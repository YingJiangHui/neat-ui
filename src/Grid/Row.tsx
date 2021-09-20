import React, { FC, PropsWithChildren, useMemo } from 'react';
import classnames from '@/shared/classnames';
import RowContext from '@/Grid/RowContext';

const defaultProps = {
  gutter: 0,
};

type SelfAdaptionMap = {
  [key in selfAdaptionSize]: number;
};

interface Props extends React.HTMLAttributes<any> {
  /**
   * @description       row 和 col 之间的间隙
   * @description.zh-CN row 和 col 之间的间隙
   * @default           0
   */
  gutter: number | [number, number];
}

type RowProps = Props & Partial<typeof defaultProps>;
const Row: FC<PropsWithChildren<RowProps>> = (props) => {
  const {
    className,
    gutter: _gutter,
    children,
  } = { ...defaultProps, ...props };
  const sizeMap = {
    xs: 578,
    sm: 768,
    md: 992,
    lg: 10000,
  };

  const gutter: [number, number] = useMemo(() => {
    if (Array.isArray(_gutter)) return _gutter;
    return [_gutter, _gutter];
  }, [_gutter]);

  return (
    <RowContext.Provider value={{ gutter }}>
      <div className={classnames(className, 'neat-row')}>
        {children}
        <style jsx>{`
          .neat-row {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            row-gap: ${gutter[0] || 0}px;
            margin-left: ${-gutter[0] / 2}px;
            margin-right: ${-gutter[0] / 2}px;
          }
        `}</style>
      </div>
    </RowContext.Provider>
  );
};

export default Row;
