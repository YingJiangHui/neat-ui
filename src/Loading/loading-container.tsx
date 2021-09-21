import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import Loading from './loading';
import classnames from '@/shared/classnames';

interface LoadingContainerProps {
  /**
   * @description       自定义loading动画
   * @description.zh-CN 自定义loading动画
   * @default           <Loading/>
   */
  indicator?: React.ReactNode;
  /**
   * @description       加载中
   * @description.zh-CN 加载中
   * @default           false
   */
  loading?: boolean;
  /**
   * @description       遮罩透明度
   * @description.zh-CN 遮罩透明度
   * @default           0.5
   */
  opacity?: number;
  /**
   * @description       遮罩颜色
   * @description.zh-CN 遮罩颜色
   * @default           #fff
   */
  maskColor?: string;
  /**
   * @description       loading 动画的基础颜色
   * @description.zh-CN loading 动画的基础颜色
   * @default           随主题变化
   */
  iconColor?: string;
}

const defaultProps: LoadingContainerProps = {
  indicator: <Loading />,
  loading: false,
  opacity: 0.5,
  maskColor: '#fff',
};
type Props = PropsWithChildren<
  Partial<typeof defaultProps> & LoadingContainerProps & HTMLAttributes<any>
>;
const LoadingContainer: FC<Props> = (props) => {
  const {
    loading,
    indicator,
    children,
    opacity,
    maskColor,
    iconColor,
    ...rest
  } = { ...defaultProps, ...props };
  return (
    <div className="loading-container-wrapper">
      {loading && (
        <div className="loading-mask">
          <div className={'loading-animation'}>
            {React.isValidElement(indicator) &&
              React.cloneElement(indicator, {
                ...indicator.props,
                color: iconColor,
              })}
          </div>
        </div>
      )}
      <div
        className={classnames('loading-container', loading && 'loading-blur')}
        {...rest}
      >
        {children}
      </div>
      <style jsx>{`
        .loading-container-wrapper {
          position: relative;
        }

        .loading-animation {
          display: flex;
          z-index: 15;
        }

        .loading-mask {
          overflow: hidden;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-container {
          transition: opacity 0.25s;
        }

        .loading-blur::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${maskColor};
          transition: all 0.25s;
          z-index: 10;
          opacity: ${opacity};
        }
      `}</style>
    </div>
  );
};
export default LoadingContainer;
