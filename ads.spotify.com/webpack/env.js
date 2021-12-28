// default env

let env = {
  CONTENTFUL_ACCESS_TOKEN: 'jIL_9YsfQG59oCMeEcQVcwnYkslSaCRkBZBfa7obOvo',
  CONTENTFUL_ACCESS_TOKEN_CDA: '32GIyVHs0EPrHEkYZaEWtPiyfpjfQthpRw4-2eqSocQ',
  CONTENTFUL_ENVIRONMENT: 'development',
  CONTENTFUL_PREVIEW: 'true',
  CONTENTFUL_SPACE_ID: 'tvhwpwv117no',
  CACHE_ENABLED: 'false',
  SPOTIFY_CLIENT_ID: '4e02d7195f814c8996abc710e9a5bc60',
  GA_TRACK_ID: 'UA-5784146-82',
  RECAPTCHA_KEY: '6LdHe8oZAAAAALI5PoFg_b_fwfpRUP5lL4LLNjra',
  RECAPTCHA_SECRET: '6LdHe8oZAAAAABA8H3xCMbaY_rtJyHkbj-86E2YG',
  SENTRY_DNS:
    'https://63802abf196144bf8a4d527463f313e8@o22381.ingest.sentry.io/5924516',
};

if (process.env.CONTENTFUL_ENV === 'staging') {
  env = {
    CONTENTFUL_ACCESS_TOKEN: '32GIyVHs0EPrHEkYZaEWtPiyfpjfQthpRw4-2eqSocQ',
    CONTENTFUL_ENVIRONMENT: 'staging',
    CONTENTFUL_SPACE_ID: 'tvhwpwv117no',
    CACHE_ENABLED: 'true',
    SPOTIFY_CLIENT_ID: '4e02d7195f814c8996abc710e9a5bc60',
    GA_TRACK_ID: 'UA-5784146-82',
    RECAPTCHA_KEY: '6LdHe8oZAAAAALI5PoFg_b_fwfpRUP5lL4LLNjra',
    RECAPTCHA_SECRET: '6LdHe8oZAAAAABA8H3xCMbaY_rtJyHkbj-86E2YG',
    SENTRY_DNS:
      'https://63802abf196144bf8a4d527463f313e8@o22381.ingest.sentry.io/5924516',
  };
}

if (process.env.CONTENTFUL_ENV === 'preview') {
  env = {
    CONTENTFUL_ACCESS_TOKEN: 'jIL_9YsfQG59oCMeEcQVcwnYkslSaCRkBZBfa7obOvo',
    CONTENTFUL_ACCESS_TOKEN_CDA: '32GIyVHs0EPrHEkYZaEWtPiyfpjfQthpRw4-2eqSocQ',
    CONTENTFUL_ENVIRONMENT: 'master',
    CONTENTFUL_PREVIEW: 'true',
    CONTENTFUL_SPACE_ID: 'tvhwpwv117no',
    CACHE_ENABLED: 'false',
    SPOTIFY_CLIENT_ID: '4e02d7195f814c8996abc710e9a5bc60',
    GA_TRACK_ID: 'UA-5784146-82',
    RECAPTCHA_KEY: '6LdHe8oZAAAAALI5PoFg_b_fwfpRUP5lL4LLNjra',
    RECAPTCHA_SECRET: '6LdHe8oZAAAAABA8H3xCMbaY_rtJyHkbj-86E2YG',
    SENTRY_DNS:
      'https://63802abf196144bf8a4d527463f313e8@o22381.ingest.sentry.io/5924516',
  };
}

if (process.env.CONTENTFUL_ENV === 'production') {
  env = {
    CONTENTFUL_ACCESS_TOKEN: '32GIyVHs0EPrHEkYZaEWtPiyfpjfQthpRw4-2eqSocQ',
    CONTENTFUL_ENVIRONMENT: 'master',
    CONTENTFUL_SPACE_ID: 'tvhwpwv117no',
    CACHE_ENABLED: 'true',
    SPOTIFY_CLIENT_ID: '4e02d7195f814c8996abc710e9a5bc60',
    GA_TRACK_ID: 'UA-5784146-56',
    RECAPTCHA_KEY: '6LclIcQZAAAAALpSmSLGhl-TQXqyhHuXGceiHGEN',
    RECAPTCHA_SECRET: '6LclIcQZAAAAAIy5p-csM9CVRS6xvkbNjNRw698D',
    SENTRY_DNS:
      'https://63802abf196144bf8a4d527463f313e8@o22381.ingest.sentry.io/5924516',
  };
}

Object.assign(process.env, env);

module.exports = env;