import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import './index.less';
import '@/vars.less';
import styled from '@emotion/styled';
const defaultProps = {};

type LoadingProps = {};

const LoadingStyle = styled.ul`
  list-style: none;
  > li {
    margin-right: 10px;
    display: inline-block;
    width: 1em;
    height: 1em;
    background: #dadada;
    border-radius: 50%;
  }
`;

type Props = typeof defaultProps & LoadingProps & HTMLAttributes<any>;
const Loading: FC<PropsWithChildren<Props>> = ({ ...rest }) => {
  return (
    <LoadingStyle {...rest}>
      {[0.3, 0.6, 0.9].map((timeout) => (
        <li style={{ animation: `zoom infinite .8s linear ${timeout}s` }} />
      ))}
    </LoadingStyle>
  );
};

export default Loading;
