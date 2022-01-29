// ignore-string-externalization
import { Language } from './Language';

export type TranslationEntry = {
  acceptanceCta: string;
  displayName: string;
  englishName: string;
  preambleSubtitle: string;
  preambleTitle: string;
  rtl: boolean;
};

// The default terms are in english
export const defaultTermsUrl =
  'https://www.spotify.com/us/legal/canvas-terms/plain';

export const getTermsUrl = (code: Language) =>
  process.env.NODE_ENV === 'development'
    ? `https://canvaz.scdn.co/t-and-c/${code}.html`
    : `https://www.spotify.com/${code}/legal/canvas-terms/plain`;

export const TranslationMap: Record<Language, TranslationEntry> = {
  us: {
    acceptanceCta: 'I agree to the terms',
    displayName: 'English',
    englishName: 'English',
    preambleSubtitle: 'First, let’s agree to some things:',
    preambleTitle: 'Ready to post your Canvas?',
    rtl: false,
  },
  'sa-ar': {
    displayName: 'العربية',
    englishName: 'Arabic',
    acceptanceCta: 'أنا أوافق على الشروط',
    preambleSubtitle: 'لنتفق على بعض الأمور أولاً:',
    preambleTitle: 'هل أنت جاهز لنشر Canvas الخاص بك؟',
    rtl: true,
  },
  tw: {
    displayName: '中國傳統的',
    englishName: 'Chinese (Traditional TW)',
    acceptanceCta: '我同意條款',
    preambleSubtitle: '首先，讓我們同意下列事項：',
    preambleTitle: '準備好要發佈您的 Canvas？',
    rtl: false,
  },
  cz: {
    displayName: 'Čeština',
    englishName: 'Czech',
    acceptanceCta: 'Souhlasím s těmito smluvními podmínkami',
    preambleSubtitle: 'Nejdříve je potřeba odsouhlasit pár věcí:',
    preambleTitle: 'Jste připraveni poslat své první video Canvas?',
    rtl: false,
  },
  nl: {
    displayName: 'Nederland',
    englishName: 'Dutch',
    acceptanceCta: 'Ik ga akkoord met de Voorwaarden',
    preambleSubtitle:
      'Eerst hebben we je toestemming nodig voor een aantal zaken:',
    preambleTitle: 'Ben je klaar om je Canvas te publiceren?',
    rtl: false,
  },
  fi: {
    displayName: 'Suomi',
    englishName: 'Finnish',
    acceptanceCta: 'Hyväksyn ehdot',
    preambleSubtitle: 'Sovitaan ensin muutamista asioista:',
    preambleTitle: 'Oletko valmis julkaisemaan Canvas-sisältösi?',
    rtl: false,
  },
  'ca-fr': {
    displayName: 'Français (Canada)',
    englishName: 'French (Canada)',
    acceptanceCta: 'J’accepte les conditions',
    preambleSubtitle: 'Vous devez d’abord nous fournir votre accord :',
    preambleTitle: 'Êtes-vous prêt à publier votre Canvas?',
    rtl: false,
  },
  fr: {
    displayName: 'Français (France)',
    englishName: 'French (France)',
    acceptanceCta: `J'accepte les conditions d'utilisation.`,
    preambleSubtitle: `Tout d'abord, acceptons certaines modalités :`,
    preambleTitle: `Prêt à publier votre visuel Canvas ?`,
    rtl: false,
  },
  de: {
    displayName: 'Deutsch',
    englishName: 'German',
    acceptanceCta: 'Ich erkläre mich mit den Bedingungen einverstanden',
    preambleSubtitle: 'Vorher brauchen wir noch kurz deine Zustimmung:',
    preambleTitle: 'Bereit, deinen Canvas zu posten?',
    rtl: false,
  },
  gr: {
    displayName: 'Ελληνικά',
    englishName: 'Greek',
    acceptanceCta: 'Συμφωνώ με τους Όρους',
    preambleSubtitle: 'Αρχικά, ας συμφωνήσουμε σε ορισμένα πράγματα:',
    preambleTitle: 'Έτοιμος να δημοσιεύσεις το Canvas σου?',
    rtl: false,
  },
  'il-he': {
    displayName: 'עברית',
    englishName: 'Hebrew',
    acceptanceCta: 'אני מאשר/ת את התנאים',
    preambleSubtitle: 'תחילה, עלינו להסכים על כמה דברים:',
    preambleTitle: 'מוכנים לשתף את הקנבס שלכם?',
    rtl: true,
  },
  hu: {
    displayName: 'Magyar',
    englishName: 'Hungarian',
    acceptanceCta: 'A Feltételeket elfogadom',
    preambleSubtitle: 'Először azonban meg kell állapodnunk néhány dologban:',
    preambleTitle: 'Készen áll a Canvas-tartalom közzétételére?',
    rtl: false,
  },
  id: {
    displayName: 'Bahasa Indonesia',
    englishName: 'Indonesian',
    acceptanceCta: 'Saya setuju dengan syarat',
    preambleSubtitle: 'Pertama, mari kita sepakati beberapa hal:',
    preambleTitle: 'Siap memposting Canvas Anda?',
    rtl: false,
  },
  it: {
    displayName: 'Italiano',
    englishName: 'Italian',
    acceptanceCta: 'Accetto i Termini',
    preambleSubtitle: 'Innanzitutto, acconsenti a quanto segue:',
    preambleTitle: 'Sei pronto a pubblicare il tuo Canvas?',
    rtl: false,
  },
  jp: {
    displayName: '英語',
    englishName: 'Japanese',
    acceptanceCta: '本規約に同意します',
    preambleSubtitle: '投稿前に以下について同意いただく必要があります: ',
    preambleTitle: 'Canvas に投稿する準備はできましたか？',
    rtl: false,
  },
  'kr-ko': {
    displayName: '한국어',
    englishName: 'Korean',
    acceptanceCta: '본인은 본 약관에 동의합니다.',
    preambleSubtitle: '우선, 동의 절차를 거쳐야 합니다.',
    preambleTitle: 'Canvas를 게시할 준비가 되셨나요?',
    rtl: false,
  },
  'my-ms': {
    displayName: 'Melayu',
    englishName: 'Malay',
    acceptanceCta: 'Saya bersetuju untuk menerima terma',
    preambleSubtitle: 'Anda perlu bersetuju untuk menerima terma dahulu:',
    preambleTitle: 'Bersedia untuk menyiarkan Canvas anda?',
    rtl: false,
  },
  pl: {
    displayName: 'Polski',
    englishName: 'Polish',
    acceptanceCta: 'Akceptuję warunki',
    preambleSubtitle: 'Najpierw musisz zaakceptować kilka rzeczy:',
    preambleTitle: 'Chcesz zamieścić animację?',
    rtl: false,
  },
  br: {
    displayName: 'Português (Brasil)',
    englishName: 'Portuguese (Brazil)',
    acceptanceCta: 'Concordo com os Termos',
    preambleSubtitle: 'Primeiro, vamos concordar com algumas coisas:',
    preambleTitle: 'Pronto para publicar seu Canvas?',
    rtl: false,
  },
  'ru-ru': {
    displayName: 'русский',
    englishName: 'Russian',
    acceptanceCta: 'Я принимаю условия',
    preambleSubtitle: 'Для начала необходимо принять некоторые условия:',
    preambleTitle: 'Вы готовы разместить материалы Canvas?',
    rtl: false,
  },
  mx: {
    displayName: 'Español',
    englishName: 'Spanish (Lat Am)',
    acceptanceCta: 'Acepto los Términos',
    preambleSubtitle: 'En primer lugar, vamos a aceptar algunos acuerdos:',
    preambleTitle: '¿Está listo para publicar su Canvas?',
    rtl: false,
  },
  es: {
    displayName: 'Español (España)',
    englishName: 'Spanish (Spain)',
    acceptanceCta: 'Acepto los términos',
    preambleSubtitle: 'Primero, hay que aceptar algunas cosas:',
    preambleTitle: '¿Preparado para publicar tu Canvas?',
    rtl: false,
  },
  se: {
    displayName: 'Svenska',
    englishName: 'Swedish',
    acceptanceCta: 'Jag godkänner villkoren',
    preambleSubtitle: 'Först vill vi att du godkänner några saker:',
    preambleTitle: 'Är du redo att publicera ditt canvas-innehåll?',
    rtl: false,
  },
  'th-th': {
    displayName: 'ภาษาไทย',
    englishName: 'Thai',
    acceptanceCta: 'ฉันยอมรับข้อกำหนด',
    preambleSubtitle: 'ก่อนอื่น มาทำข้อตกลงบางอย่างกันก่อน:',
    preambleTitle: 'พร้อมที่จะโพสต์ Canvas ของคุณหรือยัง',
    rtl: false,
  },
  tr: {
    displayName: 'Türk',
    englishName: 'Turkish',
    acceptanceCta: 'Şartları kabul ediyorum',
    preambleSubtitle: 'Öncesinde kabul etmeniz gereken bazı şartlar var:',
    preambleTitle: `Canvas'ınızı yayınlamaya hazır mısınız?`,
    rtl: false,
  },
  'vn-vi': {
    displayName: 'Tiếng Việt',
    englishName: 'Vietnamese',
    acceptanceCta: 'Tôi đồng ý với các điều khoản',
    preambleSubtitle: 'Trước tiên, hãy đồng ý với vài điều:',
    preambleTitle: 'Bạn đã sẵn sàng đăng Canvas đầu tiên của mình chưa?',
    rtl: false,
  },
};
