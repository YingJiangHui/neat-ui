import React from 'react';
const withDefaults = <P, DP>(component: React.FC<P>, defaultProps: DP) => {
  type Props = Partial<P> & Omit<P, keyof DP>; // 可选的所有类型 & 在所有类型中排除默认的 效果：可以不填有默认的值，必须填没有默认的值
  component.defaultProps = defaultProps;
  return component as React.FC<Props>;
};

export default withDefaults;
