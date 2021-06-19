import React, { FC, HTMLAttributes, PropsWithChildren } from 'react';
import withDefaults from '@/utils/with-defaults';

const defaultProps = {};

type SwitchProps = {
  toggle: boolean;
};

type Props = typeof defaultProps & SwitchProps & HTMLAttributes<any>;
const Switch: FC<PropsWithChildren<Props>> = ({ ...rest }) => {
  return <div {...rest}></div>;
};

export default withDefaults(Switch, defaultProps);
