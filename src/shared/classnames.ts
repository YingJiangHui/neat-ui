export const classnames = (
  ...classes: (string | boolean | undefined | null)[]
) => {
  return classes.filter((className) => className).join(' ');
};

export default classnames;
