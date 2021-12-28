import get from 'lodash/get';

/**
 * Provides a method to return an array of styles used to augment a
 * styled component.
 * @param {Object} props The styled component props.
 * @param {Object} styleMap The object that maps the `modifier` prop to the
 *    `componentName` and associated styles.
 * @param {string} componentName The name of the styled component to modify.
 * @returns {Array} An array of styles, as provided by the styled components
 *    `css` method in the local component.
 */
const getModifierStyles = (props = {}, styleMap = {}, componentName = '') => {
  const modifier = get(props, 'modifier');
  const path = componentName ? `${componentName}.${modifier}` : modifier;
  const styles = get(styleMap, path, null);

  if (!styles) {
    console.warn(
      `No styles associated with ${componentName}. \n Available namespaced components: ${Object.keys(
        styleMap,
      )}`,
    );
  }

  return styles;
};

export default getModifierStyles;
