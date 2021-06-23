<template>
  <div
    id="rts-home"
    class="container"
  >
    <div class="row">
      <Breadcrumb :list="[{name:'Category', slug:'/category'}]" />
    </div>
        
    <!-- <ChildSlide 
      v-if="children.length > 0"
      :category="children"
      :parent="$route.params.slug"
    /> -->
       
    <div class="row">
      <ProductList 
        :product="product"
        :loader="loader"
        :show-header="false"
      />
      <preloaderScroll :show="loadScroll" />
    </div>
    <PopupPackage />
  </div>
</template>
<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import ProductList from '~/components/category/ProductList.vue'
import ChildSlide from '~/components/carousel/ChildSlide.vue'
import preloaderScroll from '~/components/category/PreloaderScroll.vue'
import PopupPackage from '~/components/modal/PackagePopup.vue'


export default {
  name:'CategorySlug',
    
  components:{
    Breadcrumb,
    ProductList,
    // ChildSlide,
    preloaderScroll,
    PopupPackage
  },

  data(){
    return{
      product:null,
      loader:true,
      children:[],
      url:'fashion',
      page:1,
      loadScroll:false,
      emptyData:false
    }
  },

  watch: {
    '$route' (to, from) {
      this.loader = true
      this.fetchCategory()
    }
  },

  mounted(){
    this.fetchCategory(false)
    // this.fetchChildren()
    this.scroll()
  },

  methods:{
    async fetchCategory(status){
      this.url = this.$route.params.slug
      if(this.$route.query.child){
        this.url = this.$route.query.child
      }
      try {
        this.loadScroll = true
        let product = await this.$axios.$get(`v2/category/${this.url}/product?page=${this.page}`)
        console.log(product, 'slsl')
        if(product.status){
          // cek if data is empty
          console.log(product.data.product[0])
          if(product.data.product.length < 1) {
            this.loader = false
            this.loadScroll = false
            this.emptyData = true
            return
          }
          if(status){
            let prdApi = product.data.product
            let result = this.product
            let arrConcat = result.product.concat(prdApi)
            result.product = arrConcat
            this.product = result
          } else{
            this.product = product.data
          }
          this.loader = false
          this.loadScroll = false
        }
      } catch (error) {
        throw error
      }
    },

    // async fetchChildren(){
    //   try {
    //     let children = await this.$axios.$get(`v2/category/${this.url}/child`)
    //     this.children = children.data.children
    //   } catch (error) {
    //     throw error
    //   }
    // },

    scroll(){
      window.onscroll = async() => {
        if (((document.documentElement.scrollTop + window.innerHeight) >= (document.documentElement.offsetHeight - 1)) && this.loadScroll ===  false) {
          if(this.emptyData) return
          this.page++
          await this.fetchCategory(true)
        }
      }
    },
  }

}
</script>

<style lang="scss" scoped>
    #rts-home{
        min-height: 65vh;
        margin-top:12rem;
    }
</style>