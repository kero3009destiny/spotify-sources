import { useT } from '@mrkt/features/i18n';
var partnerDisplayNames = {
  afac: 'The Arab Fund for Arts and Culture',
  cashapp: 'Cash App',
  cnv: 'Centre National de la Musique',
  deutscheorchesterstifftung: 'Nothilfefonds',
  fonutovendekunstnere: 'Fond for utøvende kunstnere',
  gofundme: 'GoFundMe',
  givealittle: 'Givealittle',
  helpmusicians: 'Help Musicians',
  initiativemusik: 'Hilfsprogramm Musikerinnen',
  irishmusicindustryrelief: 'Irish Music Industry Relief',
  mercadopago: 'Mercado Pago',
  musicamexico: 'Fondo Música México',
  musicares: 'MusiCares',
  musicinnovationhub: 'Music Innovation Hub',
  musichealthalliance: 'Music Health Alliance',
  musichelps: 'MusicHelps',
  musikerforbundet: 'Musikerförbundets Krisfond',
  neworleansjazzheritage: 'Jazz & Heritage Music Relief Fund',
  noodfundsmuziek: 'Noodfunds Muziek',
  paypal: 'PayPal',
  payu_latam: 'PayU',
  payu_turkey: 'Iyzico',
  preservationhallfoundation: 'The Preservation Hall Foundation',
  prsfoundation: 'PRS Foundation',
  supportact: 'Support Act',
  ubc: 'União Brasileira de Composores (UBC)',
  uniondemusicosindependientes: 'La Unión de Músicxs Independientes (UMI)',
  unisonfund: 'The Unison Benevolent Fund'
};
export function useTitle(partner) {
  var t = useT();
  if (!(partner in partnerDisplayNames)) return '';
  var partnerDisplayName = // partner comes from API so it's safer to treat it as a string before now
  partnerDisplayNames[partner];
  return t('artistprofile_fundraising_artistfundraisingpick_artistfundraisingpickupdate_lib_usetitle_1', 'via {partnerDisplayName}', '', {
    partnerDisplayName: partnerDisplayName
  });
}