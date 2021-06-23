<template>
  <div
    id="wrapper"
    :class="$store.state.drawer ? 'toggled' : ''"
  >
    <div class="overlay" />
    <Preloader />
    <!-- <Navbar
      :categories="categories"
      :currency="getCurrency"
      :active-lang="activeLang"
      :active-currency="getActiveCurrency"
    />
    <Drawer
      :categories="categories"
      :currency="getCurrency"
      :active-lang="activeLang"
      :active-currency="getActiveCurrency"
    /> -->
    <nuxt />
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
import Preloader from '~/components/Preloader.vue'
import Drawer from '~/components/Drawer'
import * as Cookies from 'js-cookie'

export default {
  components:{
    Navbar,
    Footer,
    Preloader,
    Drawer
  },

  data(){
    return {
      categories:[],
      stateLang : 'en',
      lang : [
        {
          'name' : 'Indonesia',
          'code' : 'id',
        },
        {
          'name' : 'English',
          'code' : 'en',
        },
        {
          'name' : 'Chinese',
          'code' : 'zh',
        },
      ],
      stateCurrency:'idr',

      currency:[
        {
          'name' : 'IDR',
          'code' : 'idr',
        },
        {
          'name' : 'USD',
          'code' : 'usd',
        },
        {
          'name' : 'CNY',
          'code' : 'yuan',
        },
        {
          'name' : 'PHP',
          'code' : 'php',
        },
      ],
    }
  },

  computed:{

    getCurrency(){
      return this.currency.filter(x => x.code !== this.stateCurrency)
    },

    getActiveCurrency(){
      let res =  this.currency.filter(x => x.code === this.stateCurrency)
      return res[0]
    },

    activeLang(){
      let lang = this.$i18n.locales.filter(x => x.code == this.$i18n.locale)[0]
      return lang
    }
  },

  created(){
    this.setLocalStorage()
  },

  mounted(){
    this.getCategories()
  },

  methods:{
    setLocalStorage(){
      let lang = Cookies.get('lang')
      if(!lang){
        Cookies.set('lang', 'en')
        lang = Cookies.get('lang')
      }

      let currency = Cookies.get('currency')
      if(!currency){
        Cookies.set('currency', 'idr')
        currency = Cookies.get('currency')
      }

      this.stateLang = lang
      this.stateCurrency = currency
    },

    async getCategories() {
      try {
        let cat = await this.$axios.$get('v2/category')
        this.categories = cat.data
      } catch (error) {
        throw error
      }
    },

    logout(){
      this.$store.dispatch('setCart', 'set')
      this.$store.dispatch('auth/LOGOUT')
    }
  }
  
}
</script>