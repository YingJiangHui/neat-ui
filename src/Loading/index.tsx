import React, { FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import withDefaults from '@/utils/withDefaults';

const defaultProps = {
  size: 'normal',
  loading: false,
};

type LoadingProps = {
  loading: boolean;
  size: 'small' | 'normal' | 'large';
};
const sizeMap = {
  small: 12,
  normal: 14,
  large: 18,
};
type Props = typeof defaultProps & LoadingProps & HTMLAttributes<any>;

// 单纯的 loading 加在内容上的 loading
const Loading: FC<PropsWithChildren<Props>> = ({
  size,
  loading,
  children,
  ...rest
}) => {
  const content = () => {
    if (children) {
      return <div></div>;
    }
  };

  const LoadingAnimation = useMemo(
    () => (
      <>
        <div className="loading">
          <i />
          <i />
          <i />
        </div>
        <style jsx>{`
          .loading {
            > i {
              width: ${sizeMap[size]}px;
              height: ${sizeMap[size]}px;
              margin-right: ${sizeMap[size] / 1.5}px;
            }
          }
        `}</style>
        <style jsx>{`
          .loading {
            > i {
              display: inline-block;
              background: #dadada;
              border-radius: 50%;
              animation: loading-zoom 1.4s infinite both;
            }

            > i:nth-child(2) {
              animation-delay: 0.2s;
            }

            > i:nth-child(3) {
              animation-delay: 0.4s;
              margin-right: 0;
            }
          }

          @keyframes loading-zoom {
            0% {
              opacity: 0.2;
            }
            20% {
              opacity: 1;
            }
            100% {
              opacity: 0.2;
            }
          }
        `}</style>
      </>
    ),
    [size],
  );
  return (
    <div className="loading-container" {...rest}>
      {loading || !children ? LoadingAnimation : children}
      <style jsx>{`
        .loading-container {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default withDefaults(Loading, defaultProps);
