import React, { FC } from 'react';
import { GetScrollPropsMap } from '@/Scroll/useScroll';

const defaultProps = {};

interface Props extends React.HTMLAttributes<any> {
  whenPullingReactNode?: React.ReactNode;
  getScrollPropsMap?: GetScrollPropsMap;
}

type ScrollProps = Props & Partial<typeof defaultProps>;
const Scroll: FC<React.PropsWithChildren<ScrollProps>> = (props) => {
  const { children, whenPullingReactNode, getScrollPropsMap } = {
    ...defaultProps,
    ...props,
  };
  const {
    getPullingAnimationProps,
    getScrollContainerProps,
    getTrackProps,
    getScrollBarProps,
  } = getScrollPropsMap || {};
  return (
    <>
      <div className="neat-scroll">
        <div
          className="pull-animation-wrapper"
          {...getPullingAnimationProps?.()}
        >
          {whenPullingReactNode}
        </div>
        <main {...getScrollContainerProps?.()}>{children}</main>
        <div className="bar-track" {...getTrackProps?.()}>
          <div className="bar" {...getScrollBarProps?.()} />
        </div>
      </div>
      <style jsx>{`
        .neat-scroll {
          position: relative;
          border: 1px solid red;
          overflow: hidden;
          height: 100%;
        }

        .pull-animation-wrapper {
          width: 100%;
          position: absolute;
          display: flex;
          justify-content: center;
        }

        main {
          border: 1px solid blue;
          overflow: auto;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
        }

        .bar-track {
          position: absolute;
          right: 0;
          top: 3px;
          bottom: 3px;
        }

        .bar {
          transition: 0.3s opacity;
          border-radius: 10px;
          height: 50px;
          width: 75%;
          position: absolute;
          left: 10%;
          background: rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </>
  );
};

export default Scroll;
