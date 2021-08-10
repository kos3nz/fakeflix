export const truncate = (text, chars) => {
  return text?.length > chars ? text.slice(0, chars) + '...' : text;
};
