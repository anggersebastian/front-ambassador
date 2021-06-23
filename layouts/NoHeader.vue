<template>
  <div
    id="no-header"
    :class="$store.state.drawer ? 'toggled' : ''"
  >
    <div class="overlay" />
    <Preloader />
    <nuxt />
  </div>
</template>

<script>
import Preloader from '~/components/Preloader.vue'
import logo from '../assets/images/logo.png'
import * as Cookies from 'js-cookie'

export default {

  components:{
    Preloader,
  },

  data(){
    return{
      logo:logo
    }
  },
}
</script>
<style lang="scss">
    
</style>