interface hexConvertForRGBAparams {
  hex: string;
  alpha: number;
}

const hexConvertForRGBA = ({ hex, alpha }: hexConvertForRGBAparams) => {
  let HEXcode = hex;

  if (HEXcode.startsWith("#")) {
    HEXcode = hex.replace(/#/g, "");
  }

  const rgbList = HEXcode.match(/.{2}/g)?.map((replacer) => parseInt(replacer, 16) || 0) || [0];

  return `rgba(${rgbList.join(",")},${alpha})`;
};

export default hexConvertForRGBA;
