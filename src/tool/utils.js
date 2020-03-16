export function flat(data) {
  return data.reduce(
    (acc, cur) => acc.concat(Array.isArray(cur) ? flat(cur) : cur),
    []
  );
}
