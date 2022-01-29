import _defineProperty from "/var/jenkins_home/workspace/tingle.21c5eb3c-0d32-4d5b-a576-01fc3c1d4341/workspace/node_modules/next/node_modules/@babel/runtime/helpers/esm/defineProperty";
import { useT } from '@mrkt/features/i18n';
import { dataDarkBlue, dataDarkPurple, dataLightBlue, dataLightPink } from '@mrkt/features/creator-color-tokens';
export var GenderIdentity;

(function (GenderIdentity) {
  GenderIdentity["FEMALE"] = "female";
  GenderIdentity["MALE"] = "male";
  GenderIdentity["NON_BINARY"] = "nonbinary";
  GenderIdentity["OTHERS"] = "unknown";
})(GenderIdentity || (GenderIdentity = {}));

export var useGenderColorSpecs = function useGenderColorSpecs() {
  var _GENDER_COLOR_SPECS;

  var t = useT();
  var GENDER_COLOR_SPECS = (_GENDER_COLOR_SPECS = {}, _defineProperty(_GENDER_COLOR_SPECS, GenderIdentity.FEMALE, {
    message: t('GENDER_COLOR_SPECS_63b6d1', 'Female', ''),
    color_hex: dataDarkBlue
  }), _defineProperty(_GENDER_COLOR_SPECS, GenderIdentity.MALE, {
    message: t('GENDER_COLOR_SPECS_13f198', 'Male', ''),
    color_hex: dataLightBlue
  }), _defineProperty(_GENDER_COLOR_SPECS, GenderIdentity.NON_BINARY, {
    message: t('GENDER_COLOR_SPECS_fa0e4c', 'Non-binary', ''),
    color_hex: dataLightPink
  }), _defineProperty(_GENDER_COLOR_SPECS, GenderIdentity.OTHERS, {
    message: t('GENDER_COLOR_SPECS_83e729', 'Not specified', ''),
    color_hex: dataDarkPurple
  }), _GENDER_COLOR_SPECS);
  return GENDER_COLOR_SPECS;
};