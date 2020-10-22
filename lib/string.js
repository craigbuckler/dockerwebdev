// string library

const reNorm = /\W/g;

// normalise a string
// no non-word characters and convert to lowercase
module.exports.normalise = str => {
  return String(str).replace(reNorm, '').toLowerCase();
};
