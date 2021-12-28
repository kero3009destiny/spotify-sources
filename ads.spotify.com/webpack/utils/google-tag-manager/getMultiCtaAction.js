import { ACTIONS_MULTI_CTA } from 'utils/google-tag-manager';
import { CTA_OVERRIDES } from 'constants/cta-overrides';
import { isExternalLink } from 'utils/is-external-link';

/**
 * Returns an action according with Cta behavior, matches with ACTIONS_MULTI_CTA
 * @param {object} ctaInfo - The objet with contentful Cta info
 * @param {boolean} isModalFormOpen - The modal form flag before context mutation
 */

const getMultiCtaAction = (ctaInfo, isModalFormOpen) => {
  const { overrideFunctionality, url } = ctaInfo;

  if (overrideFunctionality) {
    if (overrideFunctionality === CTA_OVERRIDES.ADSTUDIO_LOGIN) {
      return ACTIONS_MULTI_CTA.adStudio;
    }

    if (isModalFormOpen) {
      return ACTIONS_MULTI_CTA.closeModalForm;
    }
    return ACTIONS_MULTI_CTA.openModalForm;
  }
  if (isExternalLink(url)) {
    return ACTIONS_MULTI_CTA.externalUrl;
  }
  return ACTIONS_MULTI_CTA.internalUrl;
};

export default getMultiCtaAction;
