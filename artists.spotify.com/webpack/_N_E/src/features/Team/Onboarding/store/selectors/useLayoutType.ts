// ignore-string-externalization
export var useLayoutType = function useLayoutType(layoutType) {
  return layoutType === 'full' ? {
    popoverPlacement: 'bottom',
    popoverArrow: 'top',
    buttonSize: 'md',
    iconSize: 48
  } : {
    popoverPlacement: 'bottomLeft',
    popoverArrow: 'topRight',
    buttonSize: 'sm',
    iconSize: 32
  };
};