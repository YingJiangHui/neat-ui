import React, { FC } from 'react';
import { useTheme } from '@/hooks';

const defaultProps = {
  level: 2,
};

interface Props {
  /**
   * @description       color深度等级 1 ~ 9
   * @description.zh-CN color深度等级 1 ~ 9
   * @default           2
   */
  level?: number; // 1 ~ 9
}
type LineProps = Props & Partial<typeof defaultProps>;
const Line: FC<LineProps> = (props) => {
  const { level } = { ...defaultProps, ...props };
  const theme = useTheme();
  const { palette } = theme;
  const levelList = [
    undefined,
    palette.grayscale_1,
    palette.grayscale_2,
    palette.grayscale_3,
    palette.grayscale_4,
    palette.grayscale_5,
    palette.grayscale_6,
    palette.grayscale_7,
    palette.grayscale_8,
    palette.grayscale_9,
  ];
  return (
    <>
      <hr />
      <style jsx>
        {`
          hr {
            background-color: ${levelList[level]};
          }
          hr {
            border: none;
            height: 1px;
            width: 100%;
            margin-top: 0.3em;
            margin-bottom: 0.3em;
          }
        `}
      </style>
    </>
  );
};

export default Line;
