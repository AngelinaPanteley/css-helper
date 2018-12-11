export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const calcStyles = (styles, controlValues, controls) => {
  const calculatedStyles = {};

  for (let styleKey in styles) {
    let styleValue = styles[styleKey];

    if (styleValue.indexOf('{') > -1) {
      while (styleValue.indexOf('{') > -1) {
        let index = styleValue.indexOf('{');
        let lastIndex = styleValue.indexOf('}');
        const property = styleValue.slice(index + 1, lastIndex);

        if (controls[property].units) {
          styleValue = styleValue.slice(0, index) + controlValues[property]
            + controls[property].units + styleValue.slice(++lastIndex);
        } else {
          styleValue = styleValue.slice(0, index) + controlValues[property]
            + styleValue.slice(++lastIndex);
        }
      }
    }

    calculatedStyles[styleKey] = styleValue;
  }

  return calculatedStyles;
}