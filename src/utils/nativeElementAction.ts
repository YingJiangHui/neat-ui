import { unmountComponentAtNode } from 'react-dom';

export const unmountElement = (container: HTMLElement | null) => {
  // 退出时进行清理
  unmountComponentAtNode(container as HTMLDivElement);
  container!.remove();
  container = null;
};

export const mountElement = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
};
