import React, { FC, HTMLAttributes, PropsWithChildren, useMemo } from 'react';
import withDefaults from '@/utils/with-defaults';
import LoadingContainer from '@/Loading/loading-container';
import { useTheme } from '@/hooks/use-theme';

interface LoadingProps {
  size?: 'small' | 'middle' | 'large';
  color?: string;
}

const defaultProps = {
  size: 'middle',
};
type Props = PropsWithChildren<
  typeof defaultProps & LoadingProps & HTMLAttributes<any>
>;
const sizeMap = {
  small: 4,
  middle: 6,
  large: 8,
};
const Loading: FC<Props> = ({ size, color, children, ...rest }) => {
  const width = useMemo(() => sizeMap[size], [size]);
  const theme = useTheme();
  return (
    <>
      <div className="loading-container" {...rest}>
        <div className="loading">
          <i />
          <i />
          <i />
        </div>
      </div>
      <style jsx>{`
        .loading > i {
          width: ${width}px;
          height: ${width}px;
          background: ${color || theme.palette.grayscale_8};
        }
      `}</style>
      <style jsx>{`
        .loading-container {
          display: inline-block;
        }

        .loading {
          display: flex;
          align-items: center;
        }

        .loading > i {
          margin-right: 2px;
          display: inline-block;
          border-radius: 50%;
          animation: loading-zoom 1.4s infinite both;
        }

        .loading > i:nth-child(2) {
          animation-delay: 0.2s;
        }

        .loading > i:nth-child(3) {
          animation-delay: 0.4s;
          margin-right: 0;
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
  );
};

type LoadingComponent<P = {}> = React.FC<P> & {
  Container: typeof LoadingContainer;
};
export default withDefaults(
  Loading,
  defaultProps,
) as LoadingComponent<LoadingProps>;
