module.exports = function(str) {
  let s = String(str);
   
  let opt = {
  	'delimiter': '-',
  	'lowercase': true
  };
  
  // Replace non-alphanumeric characters with our delimiter
  let alnum = (typeof(XRegExp) === 'undefined') ? RegExp('[^a-z0-9]+', 'ig') : XRegExp('[^\\p{L}\\p{N}]+', 'ig');
  s = s.replace(alnum, opt.delimiter);
  
  // Remove duplicate delimiters
  s = s.replace(RegExp('[' + opt.delimiter + ']{2,}', 'g'), opt.delimiter);
  
  // Remove delimiter from ends
  s = s.replace(RegExp('(^' + opt.delimiter + '|' + opt.delimiter + '$)', 'g'), '');
  
  return opt.lowercase ? s.toLowerCase() : s;
}