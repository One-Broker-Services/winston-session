const clone = (obj) => JSON.parse(JSON.stringify(obj));

const merge = (oldData, newData, overwrite = false) => {
  let result = {};
  if (overwrite) result = { ...clone(oldData), ...clone(newData) };
  else result = { ...clone(newData), ...clone(oldData) };
  return result;
};

module.exports = {
  clone,
  merge,
};
