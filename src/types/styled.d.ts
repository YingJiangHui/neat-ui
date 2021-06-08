import React from 'react';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

declare module 'styled-jsx/css' {
  function css(chunks: TemplateStringsArray, ...args: any[]): JSX.Element;
  function global(chunks: TemplateStringsArray, ...args: any[]): JSX.Element;
  function resolve(
    chunks: TemplateStringsArray,
    ...args: any[]
  ): { className: string; styles: JSX.Element };

  // @ts-ignore
  export default css as typeof css & {
    resolve: typeof resolve;
    global: typeof global;
  };
}
