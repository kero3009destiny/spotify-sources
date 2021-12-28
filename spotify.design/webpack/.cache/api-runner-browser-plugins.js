module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"Spotify Design","short_name":"Design","start_url":"/","background_color":"#ffffff","theme_color":"#191414","display":"standalone","legacy":false,"icons":[{"src":"/favicons/favicon.svg","type":"image/svg+xml"},{"src":"/favicons/favicon.ico","type":"image/x-icon","sizes":"48x48"},{"src":"/favicons/favicon-16x16.png","type":"image/png","sizes":"16x16"},{"src":"/favicons/favicon-32x32.png","type":"image/png","sizes":"32x32"},{"src":"/favicons/favicon-48x48.png","type":"image/png","sizes":"48x48"},{"src":"/favicons/android-chrome-192x192.png","type":"image/png","sizes":"192x192"},{"src":"/favicons/android-chrome-512x512.png","type":"image/png","sizes":"512x512"}]},
    },{
      plugin: require('../node_modules/gatsby-plugin-canonical-urls/gatsby-browser.js'),
      options: {"plugins":[],"siteUrl":"https://spotify.design"},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js'),
      options: {"plugins":[],"id":"GTM-TKJFZ4G","includeInDevelopment":false},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
