// output Ajax data files
const
  path = require('path'),
  fsp = require('fs').promises;

module.exports = async (content, outputPath) => {

  if (!String(outputPath).endsWith('.html')) return content;

  const
    extract = ['title', 'main'], // HTML content tags to extract
    html = content.replace(/\t|\r|\n|\v|\f/g, ''),
    datafile = outputPath.slice(0, -4) + 'json',
    data = {};

  // extract content
  extract.forEach(t => {

    const m = html.match(new RegExp(`<${t}([^>]*)>(.+?)</${t}>`, 'i'));
    data[t] = (m && m.length > 1 ? m[2] : '');

  });

  // output JSON data
  await fsp.mkdir(path.parse(datafile).dir, { recursive: true });
  await fsp.writeFile(datafile, JSON.stringify(data));

  return content;

};
