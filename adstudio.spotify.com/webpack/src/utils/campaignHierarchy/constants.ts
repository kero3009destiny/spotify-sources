import { CreateFormValues } from 'types/common/campaignHierarchy/types';

export const COLDSTART_CAMPAIGN_PREFIX: keyof CreateFormValues = 'campaign';
export const COLDSTART_FLIGHT_PREFIX: keyof CreateFormValues = 'flights';
export const COLDSTART_CREATIVE_PREFIX: keyof CreateFormValues = 'creatives';

export const GA_X_BUTTON_CLICKED = 'x_button_clicked';
export const GA_NEXT_CLICKED = 'next_button_success';
export const GA_PREV_CLICKED = 'back_button_success';
export const GA_NAV_CLICKED = 'nav_icon_click';
export const GA_PLACE_ORDER = 'place_order';
export const GA_PLACE_ORDER_FAILED = 'place_order_failed';
export const GA_FORM_SECTION = 'form_section';
export const GA_TABLE_SEARCH_FILTER_CHANGE = 'Text_entered_table_filter';
export const GA_STATUS_FILTER_SELECTED = 'Status_filter_selected';
export const GA_DRAFT_TOGGLE_CLICKED = 'All_or_drafts_table_toggle_clicked';
export const GA_ENTITY_NAME_CLICKED = 'Entity_name_clicked';
export const GA_ENTITY_FILTER_CLEARED = 'Entity_filter_cleared';

export const DEFAULT_SUCCESS_BANNER_DISPLAY_TIME = 2000;

// FIXME: router actions appear to be dispatching asynchronously such that any state resetting can't reliably me made before a router action is dispatched.
export const ROUTER_ACTION_DISPATCH_TIMEOUT = 500;

// After creating resources, wait for this timeout before showing a user a success screen to cut the possibilitis of catalogue views missing new entities.
export const FLUSH_SYNC_WAIT_TIMEOUT = 1000;
