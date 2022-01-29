import { useT } from '@mrkt/features/i18n';
export var useStackedAriaLabelGenerator = function useStackedAriaLabelGenerator(dataItem) {
  var t = useT();
  return t('STACKED_ARIA_LABEL_402aa2', 'Age range {message} {percentage} of listeners, female {femaleValue} listeners, male {maleValue}, non-binary {nonbinaryValue}, not specified {notSpecifiedValue}', 'Aria label. Example Usage: Age range <18 1% of listeners, female 35,258 listeners, male 17,550, non-binary 1,795, not specified 861.', {
    message: dataItem.message.defaultMessage,
    percentage: dataItem.percentage_formatted,
    femaleValue: dataItem.female_value_formatted,
    maleValue: dataItem.male_value_formatted,
    nonbinaryValue: dataItem.nonbinary_value_formatted,
    notSpecifiedValue: dataItem.unknown_value_formatted
  });
};