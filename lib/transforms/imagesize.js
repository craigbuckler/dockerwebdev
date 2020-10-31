// add width and height dimensions to all images unless defined
/* global src */
const
  imageSize = require('util').promisify( require('image-size') ),
  reImg = /<img\s.*?>/gi,
  reSrc = /src=['|"]*(.+?)['|"|>|\s]/i;

module.exports = async(content, outputPath = '.html') => {

  if (!String(outputPath).endsWith('.html')) return content;

  const images = (content.match(reImg) || []).filter(i => !i.toLowerCase().includes('width='));

  if (images.length) {

    // fetch image dimensions
    const
      isize = await Promise.allSettled(

        images.map(img => {

          let srcAttr = img.match(reSrc);
          if (srcAttr && srcAttr.length === 2) {
            return imageSize(`./${src}` + srcAttr[1]);
          }
          return true;

        })

      );

    // add width and height attributes
    if (isize) {
      images.forEach((img, idx) => {

        const dim = isize[idx].value;
        if (dim) {

          let imgD = img.replace(/\s*\/*>/i, ` width="${ dim.width }" height="${ dim.height }" loading="lazy" />`);
          content = content.replace(img, imgD);

        }

      });
    }

  }

  return content;

};
