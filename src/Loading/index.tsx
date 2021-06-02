import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';

const defaultProps = {};

type LoadingProps = {};
type Props = typeof defaultProps & LoadingProps & HTMLAttributes<any>;
const Loading: FC<PropsWithChildren<Props>> = ({ ...rest }) => {
  return (
    <div className="loading-container">
      <div className="loading">
        <i />
        <i />
        <i />
      </div>
      <style jsx>{`
        .loading {
          > i {
            margin-right: 10px;
            display: inline-block;
            width: 0.8em;
            height: 0.8em;
            background: #dadada;
            border-radius: 50%;
            animation: loading-zoom 1.4s infinite both;
          }

          > i:nth-child(2) {
            animation-delay: 0.2s;
          }

          > i:nth-child(3) {
            animation-delay: 0.4s;
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
    </div>
  );
};

export default Loading;
