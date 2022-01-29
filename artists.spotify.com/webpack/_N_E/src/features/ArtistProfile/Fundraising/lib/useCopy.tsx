import { useT } from '@mrkt/features/i18n';
export function useCopy() {
  var t = useT();
  return {
    errors: {
      linkValidation: t('artistprofile_fundraising_lib_1', 'Make sure your fundraising link is valid and matches the provider you chose', 'The link artists put in for people to donate should be a link from the fundraising provider they chose.'),
      orgValidation: t('artistprofile_fundraising_lib_2', 'You must choose a Music Relief organization', '')
    }
  };
}