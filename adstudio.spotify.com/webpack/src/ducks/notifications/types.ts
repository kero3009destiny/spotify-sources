import { FlattenSimpleInterpolation } from 'styled-components';

export interface BannerCustomization {
  props: {
    onClose?: () => void;
    renderIcon?: React.ComponentType;
    renderCloseButton?: React.ComponentType;
  };
  styles: string;
  transition: FlattenSimpleInterpolation;
}

export const DISPLAY_NOTIFICATION = 'DISPLAY_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';
