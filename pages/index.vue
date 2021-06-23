<template>
  <div
    id="rts-home"
    class="container"
  >   
    <!-- <div class="row">
      <div class="new-section">
        <div class="col-lg-12">
          <HomeSlide :product="banner" />
        </div>
      </div>
    </div>
    <div
      v-if="flashSale"
      class="row"
    >
      <div class="new-section">
        <HomeFlashSale
          :product="firstCategory.product"
          :loader="firstloading"
        />
      </div>
    </div>
    <div class="row">
      <div class="new-section">
        <WidgetContent
          :product="firstCategory"
          :loader="firstloading"
        />
      </div>
    </div>
    <div class="row">
      <div class="new-section">
        <WidgetContent
          :product="secondCategory"
          :loader="secondloading"
        />
      </div>
    </div>
    <PopupPackage /> -->
  </div>
</template>

<script>
// import HomeSlide from '~/components/carousel/HomeSlide.vue'
// import HomeFlashSale from '~/components/carousel/HomeFlashSale.vue'
// import WidgetContent from '~/components/home/WidgetContent.vue'
// import WidgetProduct from '~/components/home/WidgetProduct.vue'
// import HomeLogo from '~/components/DropyHomeLogo'
// import PopupPackage from '~/components/modal/PackagePopup.vue'
export default {
  layout:'default',

  name:'Index',
  middleware: '',

  components:{
    // HomeLogo,
    // HomeSlide,
    // WidgetContent,
    // HomeFlashSale,
    // WidgetProduct
    // PopupPackage
  },
    
  data(){
    return {
      categories: [],
      productFlag:[],
      productFlagType:false,
      banner:[],

      // new state for category
      firstCategory: {},
      firstloading:true,
      secondCategory:{},
      secondloading:true,

      // widget content loader
      fashionLoader:true,

      flashSale:false,

      // best view
      productBestView:[],
      loaderBestView:true
    }
  },

  mounted(){
    this.getCategories()
    this.getListProductFooter()
    this.fetchHomeBanner()
    // this.getBestView()
    // this.showPackagePopup()
  },

  methods: {
    getCategories() {
      this.$axios
        .$get('/category/categories')
        .then(response => {
          this.categories = response.body.data.categories
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
    },
    getListProductFooter() {
      this.$axios
        .$get(`v2/category/petshop/product?limit=10`)
        .then(response => {
          if(response.status){

            this.firstCategory = response.data
            this.loading = false
            this.firstloading = false
          }
        })
        .catch(error => {
          throw error
        })
        .finally(() => this.firstloading = false)
      this.$axios
        .$get(`v2/category/fashion/product?limit=10`)
        .then(response => {
          if(response.status){
            this.secondCategory = response.data
            this.secondloading = false
          }
        })
        .catch(error => {
          throw error
        })
        .finally(() => this.secondloading = false)
    },

    async fetchHomeBanner(){
      try {
        let banner = await this.$axios.$get('/v2/home/banner')
        if(banner.status){
          this.banner = banner.data.data
        }
      } catch (error) {
        throw error
      }
    },

    async getBestView(){
      try {
        let product = await this.$axios.$get('/v2/product/best-view')
        this.loaderBestView = false    
        if(product.status){
          this.productBestView = product.data
        }
      } catch (error) {
        throw error
      }
    }
  },
}
</script>
<style lang="scss" scoped>
    @media only screen and (min-width: 767px) {
        .category{
            display: none;
        }
    }
</style>
