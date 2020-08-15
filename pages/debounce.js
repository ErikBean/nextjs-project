export function debounce(callback, time) {
  let interval;
  return () => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;

      // eslint-disable-next-line
      callback();
    }, time);
  };
}
