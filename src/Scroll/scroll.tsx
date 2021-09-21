import React, { FC } from 'react';
import useScrollLogic, { PullDownStatus } from '@/Scroll/useScrollLogic';
import classnames from '@/shared/classnames';
import { Loading } from '@/Loading';

const defaultProps = {
  loadingNode: <Loading />,
  enableUpGlideLoad: false,
  enablePullDownUpdate: false,
};

interface Props extends React.HTMLAttributes<any> {
  /**
   * @description       更新时内容于顶部的距离
   * @description.zh-CN 更新时内容于顶部的距离
   * @default           60px
   */
  stayDistance?: number;
  /**
   * @description       下拉到多少距离可以触发更新
   * @description.zh-CN 下拉到多少距离可以触发更新
   * @default           100px
   */
  updatableDistance?: number;
  /**
   * @description       最大可下拉的距离
   * @description.zh-CN 最大可下拉的距离
   * @default           9999px
   */
  maxPullDownDistance?: number;
  /**
   * @description       更新成功后下拉动画停留的时间
   * @description.zh-CN 更新成功后下拉动画停留的时间
   * @default           0
   */
  completedStayTime?: number;
  /**
   * @description       下滑加载，加载中
   * @description.zh-CN 下滑加载，加载中
   * @default           false
   */
  upGlideLoading?: boolean;
  /**
   * @description       下拉更新，加载中
   * @description.zh-CN 下拉更新，加载中
   * @default           false
   */
  pullDownUpdating?: boolean;
  /**
   * @description       启用下滑加载
   * @description.zh-CN 启用下滑加载
   * @default           false
   */
  enableUpGlideLoad?: boolean; // 启用下滑加载 default false

  /**
   * @description       启用下拉更新
   * @description.zh-CN 启用下拉更新
   * @default           false
   */
  enablePullDownUpdate?: boolean;
  /**
   * @description       下拉更新事件
   * @description.zh-CN 下拉更新事件
   * @default           -
   */
  onPullDownUpdate?: (status: PullDownStatus) => void;
  /**
   * @description       下滑加载事件
   * @description.zh-CN 下滑加载事件
   * @default           -
   */
  onUpGlideLoad?: () => void;
  /**
   * @description       自定义下拉更新动画
   * @description.zh-CN 自定义下拉更新动画
   * @default           -
   */
  customPullingAnimation?: (
    status: PullDownStatus,
    updatableRate: number,
  ) => React.ReactNode;
  /**
   * @description       定义加载动画
   * @description.zh-CN 定义加载动画
   * @default           <Loading/>
   */
  loadingNode?: React.ReactNode;
}

export type ScrollProps = Props & Partial<typeof defaultProps>;
const Scroll: FC<React.PropsWithChildren<ScrollProps>> = (props) => {
  const {
    children,
    loadingNode,
    className,
    style,
    customPullingAnimation,
    ...rest
  } = {
    ...defaultProps,
    ...props,
  };
  const { getScrollPropsMap, status, updatableRate } = useScrollLogic(rest);
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
          {customPullingAnimation?.(status, updatableRate)}
        </div>
        <div
          className={classnames(className, 'content')}
          {...getScrollContainerProps?.({ style })}
        >
          {children}
          {props.upGlideLoading ? (
            <div className="loading-wrapper">{loadingNode}</div>
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
