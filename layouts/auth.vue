<template>
  <div
    id="wrapper"
  >
    <div
      class="container"
    >
      <div class="row">
        <nuxt />
      </div>
    </div>
    <Preloader />
  </div>
</template>
<script>
import Preloader from '~/components/Preloader.vue'
export default {
  components:{
    Preloader,
  }
}
</script>