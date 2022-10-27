module.exports.queryObj = function (url, params) {
  let query = '';
  const keys = Object.keys(params);
  if (keys.length) {
    query = '?';
  }
  for (let i = 0; i < keys.length; i++) {
    query += `${keys[i]}=${params[keys[i]]}`;
    if (i < keys.length - 1) {
      query += '&';
    }
  }
  return `${url}${query}`;
};
