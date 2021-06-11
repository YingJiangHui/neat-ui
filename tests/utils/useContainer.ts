import { unmountComponentAtNode } from 'react-dom';

const useContainer = () => {
  let element: null | HTMLElement = null;
  const mount = () => {
    element = document.createElement('div');
    document.body.appendChild(element);
  };
  const unMount = () => {
    unmountComponentAtNode(element as HTMLDivElement);
    element!.remove();
    element = null;
  };
  const getContainer = () => {
    return element;
  };
  return {
    getContainer,
    mount,
    unMount,
  };
};

export default useContainer;
