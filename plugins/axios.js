import * as Cookies from 'js-cookie'

export default function ({app, $axios, redirect, store }) {
    $axios.onRequest(async(config) => {
      let token = store.state.auth.token
      let lang = app.i18n.locale
      let currency = Cookies.get('currency')
      if(token !== null || token !== 'null'){
        config.headers.common['Authorization'] = `Bearer ${token}`
        config.headers.common['lang'] = lang
        config.headers.common['currency'] = currency
      }
      config.headers.post['Content-Type'] = 'application/json'
      return config
    })

    $axios.onError(error => {
      if(error.response.status === 500) {
        return error.response.status
      }

      if(error.response.status === 404) {
        redirect('/sorry')
      }

      if(error.response.status === 401) {
        redirect('/login')
      }
    })
  }