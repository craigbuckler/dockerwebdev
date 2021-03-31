// format number of words and reading time
const
  roundTo     = 100,
  readPerMin  = 200,
  numFormat   = new Intl.NumberFormat('en');

// calculate approximate number of words
function countCalc(count) {

  // count seems twice as high as it should be?
  count /= 2;
  return Math.ceil(count / roundTo) * roundTo;

}

// raw format
module.exports.wordcount = count => {

  return countCalc(count);

};


// friendly format
module.exports.friendly = count => {

  const
    words     = countCalc(count),
    mins      = Math.ceil(words / readPerMin);

  return `${ numFormat.format(words) } words, ${ numFormat.format(mins) }-minute read`;

};
