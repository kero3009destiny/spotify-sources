export const CreativeRotationFormData = {
  id: 'creative-rotation-form',
  Fields: {
    RotationType: 'creativeRotationType',
    Creatives: 'creatives',
  },
};

export enum CreativeRotationTypeOption {
  EVENLY = 'EVENLY',
  WEIGHTED = 'WEIGHTED',
  SEQUENTIAL = 'SEQUENTIAL',
  UNKNOWN = 'UNKNOWN',
}

export const GA_EVENTS = {
  CLICK_ADJUST_DELIVERY_BUTTON: 'Click_adjust_delivery_button',
  SELECT_AD_DELIVERY_OPTION: 'Select_ad_delivery_option',
  SAVE_AD_DELIVERY_OPTION_SUCCESS: 'Save_ad_delivery_option_success',
  SAVE_AD_DELIVERY_OPTION_FAILED: 'Save_ad_delivery_option_failed',
  CANCEL_AD_DELIVERY_POPUP: 'Cancel_ad_delivery_popup',
  CLICK_X_AD_DELIVERY_POPUP: 'Click_x_ad_delivery_popup',
};

export const GA_SELECTION_LABELS: Record<CreativeRotationTypeOption, {}> = {
  EVENLY: { selection: 'Evenly' },
  SEQUENTIAL: { selection: 'Sequential' },
  WEIGHTED: { selection: 'Weighted' },
  UNKNOWN: { selection: 'Unknown' },
};
