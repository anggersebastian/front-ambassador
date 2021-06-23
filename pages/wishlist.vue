<template>
  <div
    id="rts-home"
    class="container"
  >
    <div class="row">
      <Breadcrumb :list="[{name:'Wishlist', slug:'/wishlist'}]" />
    </div>
    <div class="row">
      <ProductList
        :product="wishlist"
        :loader="loader"
        :show-header="false"
        :deleted="destroyWishlist"
      />
    </div>
  </div>
</template>

<script>
import ProductList from '~/components/wishlist/Product.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  middleware: ['auth'],

  components:{
    ProductList,
    Breadcrumb
  },

  data(){
    return{
      wishlist:[],
      loader:true
    }
  },

  mounted(){
    this.fetchWishlist()
  },

  methods:{
    async fetchWishlist(){
      try {
        let wishlist = await this.$axios.$get('/v2/wishlist')
        console.log(wishlist, 'sksk')

        if(wishlist.status){
                    
          wishlist = wishlist.data.map(x => {
            x.product.wishlist_id = x.id
            return x.product
          })
          console.log(wishlist, 'sksk')
          this.wishlist = wishlist
          this.loader = false
        }
      } catch (error) {
        throw error
      }
    },

    destroyWishlist(item, index){
      try {
        this.$swal({
          title: "Info?",
          text: "Are you sure to deleted this wishlist",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then( async(willDelete) => {
          if (willDelete) {
            let wishlist = await this.$axios.$delete(`/v2/wishlist/${item.wishlist_id}`)
            if(wishlist.status){
              let state = this.wishlist
              state.splice(index, 1)
              this.wishlist = state
            }
          }
        })
                
      } catch (error) {
        throw error
      }
    }
  }
}
</script>