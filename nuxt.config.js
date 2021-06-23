
require('dotenv').config()
const webpack = require('webpack')
module.exports = {
  server: {
    port: process.env.APP_PORT, // default: 3000
    host: process.env.APP_HOST, // default: localhost
  },
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },

      { rel: 'icon', type: 'image/png', sizes:'192x192', href: '/favicon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes:'32x32', href: '/favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes:'96x96', href: '/favicon/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes:'16x16', href: '/favicon/favicon-16x16.png' },
      
      { rel: 'manifest', href: '/favicon/manifest.json' },

      { rel: 'stylesheet', type: 'text/css', href: 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'},
      { rel: 'stylesheet', type: 'text/css', href: '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css'},
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'},
    ],
    
    script: [
     
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#ffd600' },
  /*
  ** Global CSS
  */
  css: [
      { src: '~/assets/template-v1/_app.scss', lang: 'scss' }
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~plugins/bootstrap.js", ssr:false},
    { src: "~plugins/slick-slide.js", ssr: false },
    { src: "~plugins/MyHelper.js", ssr: true },
    { src: "~plugins/ctx-inject.js"},
    { src: "~plugins/axios", ssr:true},
    { src: "~plugins/vue-swal", ssr:false},
    { src: '~plugins/localStorage.js', ssr: false },
    { src: '~plugins/vee-validate.js', ssr: true}
    // { src:  '~/plugins/i18n.js', ssr: true }
  ],
  generate: {
    // routes: ['/']
  },
  /*
  ** Nuxt.js dev-modules
  */
  devModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/axios',
    'nuxt-i18n',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-M5KG5FD', pageTracking: true }],
    ['@nuxtjs/google-tag-manager', { id: 'GTM-MF6RFH2', pageTracking: true }],
    // ['@nuxtjs/google-tag-manager', { id: 'GTM-T8XQLNL', pageTracking: true }],
    'nuxt-socket-io'
  ],

  io: {
    sockets: [
      {
        name: 'dropi',
        url: process.env.APP_HOST+':'+process.env.APP_PORT,
        default: true,
        // vuex: { // optional
        //   mutations: [{ progress: 'examples/SET_PROGRESS' }], // pass in the evt --> mutation map OR array of actions
        //   actions: [{ chatMessage: 'FORMAT_MESSAGE' }, 'SOMETHING_ELSE' ], // pass in the evt --> action map OR array of actions or mixed!,
        //   emitBacks: ['examples/sample', { 'examples/sample2': 'sample2' }] // pass in the state props you want to listen for changes on. When those props thance, they'll fire these "emitBack" events. If the emitBack is a string, it will send the string, otherwise, if it's an object, it will send the mapped string. (see the updated examples in the page/examples.vue, where I also use a "mapState2Way" function in the component).
        // },
        namespaces: { /* See next section */ }
      },
    ]
  },

  axios: {
    baseURL: process.env.BASE_URL,
  },

  i18n: {
    locales: [
      // {name:'Indonesia', code:'id'},
      // {name:'English', code:'en'}
      'id',
      'en'
    ],
    // langDir: 'locales/',
    defaultLocale: 'id',
    vueI18n:{
      fallbackLocale:'id',
      messages: {
        en:require('./locales/en.json'),
        id:require('./locales/id.json')
      }
    }
  },
  /*
  ** Build configuration
  */
  router: {
    middleware: ['init']
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    transpile: ["vee-validate/dist/rules"],
    vendor: ['jquery', 'bootstrap'],
    plugins: [
      // set shortcuts as global for bootstrap
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ],

    postcss: {
      'postcss-cssnext': {
        browsers: ['last 2 versions', 'ie >= 9']
      },
      preset: {
        autoprefixer: {
          // grid: true
        }
      }
    },

    extend (config, ctx) {

      if (ctx.isDev && ctx.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
    
        const vueLoader = config.module.rules.find(({loader}) => loader === 'vue-loader')
        const { options: {loaders} } = vueLoader || { options: {} }
        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
          }
        }
        config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
      }
    }
  }
}

function changeLoaderOptions (loaders) {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['./assets']
        })
      }
    }
  }
}