const handlers = new Map();

const  resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) 
      handlers.get(entry.target)(entry);
});

export default function resize (resizer, callback) {
  if (typeof callback !== 'function')
    return console.warn('Please set callback function in use:resize')
  handlers.set(resizer, callback);
  resizeObserver.observe(resizer);

  return {
    destroy() {
      handlers.delete(resizer);
      resizeObserver.unobserve(resizer);
    }
  }
}