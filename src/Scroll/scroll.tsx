import React, { FC } from 'react';
import useScrollLogic, { PullDownStatus } from '@/Scroll/useScrollLogic';
import classnames from '@/shared/classnames';
import { Loading } from '@/Loading';

const defaultProps = {
  customLoadingNode: <Loading />,
  enableUpGlideLoad: false,
  enablePullDownUpdate: false,
};

interface Props extends React.HTMLAttributes<any> {
  whenPullingReactNode?: React.ReactNode;
  waitingDistance?: number;
  updatableDistance?: number;
  maxPullDownDistance?: number;
  completedWaitTime?: number;
  upGlideLoading?: boolean;
  pullDownUpdating?: boolean;
  enableUpGlideLoad?: boolean; // 启用下滑加载 default false
  enablePullDownUpdate?: boolean; // 禁用下拉更新 default false
  onPullDownUpdate?: (status: PullDownStatus) => void;
  onUpGlideLoad?: () => void;
  onChange?: (status: PullDownStatus, updatableRate: number) => void;
  customLoadingNode?: React.ReactNode;
}

export type ScrollProps = Props & Partial<typeof defaultProps>;
const Scroll: FC<React.PropsWithChildren<ScrollProps>> = (props) => {
  const {
    children,
    upGlideLoading,
    customLoadingNode,
    className,
    style,
    whenPullingReactNode,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };
  const { getScrollPropsMap } = useScrollLogic(rest);
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
        <div
          className={classnames(className, 'content')}
          {...getScrollContainerProps?.({ style })}
        >
          {children}
          {upGlideLoading ? (
            <div className="loading-wrapper">{customLoadingNode}</div>
          ) : (
            ''
          )}
        </div>
        <div className="bar-track" {...getTrackProps?.()}>
          <div className="bar" {...getScrollBarProps?.()} />
        </div>
      </div>
      <style jsx>{`
        .neat-scroll {
          position: relative;
          overflow: hidden;
          height: 100%;
        }

        .pull-animation-wrapper {
          width: 100%;
          position: absolute;
          display: flex;
          justify-content: center;
        }

        .content {
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

        .loading-wrapper {
          text-align: center;
          margin-top: 0.5em;
          margin-bottom: 0.5em;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Scroll;
