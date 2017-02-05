import urlSlug from './url_slug';

export default (str) => {
  // Handle special cases
  if (str.indexOf('MULE') > -1) {
    return 'calldown-mule';
  }

  if (str.indexOf('64') > -1) {
    return 'tlv-64-kb-marathon';
  }

  if (str.indexOf('Archon') > -1 && str.indexOf('Pure') > -1) {
    return 'archon-pure-power';
  }

  if (str.indexOf('thun') > -1 && str.indexOf('gift') > -1) {
    return 'c-thun-s-gift';
  }

  return urlSlug(str);
};
