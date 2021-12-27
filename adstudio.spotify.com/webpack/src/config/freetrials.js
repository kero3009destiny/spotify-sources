import lang from './lang';

export const FREE_TRIAL_NULL_VALUE = 'All';
export const FREE_TRIAL_ELIGIBLE = 'Eligible';
export const FREE_TRIAL_INELIGIBLE = 'Ineligible';

export default new Map([
  [FREE_TRIAL_NULL_VALUE, lang('all', 'All')],
  [FREE_TRIAL_ELIGIBLE, lang('eligible', 'Eligible')],
  [FREE_TRIAL_INELIGIBLE, lang('ineligible', 'Ineligible')],
]);
