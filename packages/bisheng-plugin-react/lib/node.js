'use strict';

const transformer = require('./transformer');

module.exports = function(markdownData, { lang = 'react-example', noreact }) {
  const { content } = markdownData;

  markdownData.content = content.map(node => {
    const tagName = node[0];
    const attr = node[1];
    if (tagName === 'pre' && attr && attr.lang === lang) {
      const code = node[2][1];
      const processedCode = transformer(code, noreact);
      return {
        __BISHENG_EMBEDED_CODE: true,
        code: processedCode,
      };
    }
    return node;
  });

  return markdownData;
};