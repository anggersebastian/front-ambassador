<template>
  <div
    id="product_id"
    class="container"
  >
    <div class="row">
      <Breadcrumb :list="[{name:'cart', slug:'/cart'}]" />
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="cart">
          <div class="cart-header bg-white">
            <ul class="cart-list">
              <li class="cart-item">
                <div class="row">
                  <div class="col-md-4">
                    <span class="cart-header-product">
                      Product
                    </span>
                  </div>
                  <div class="col-md-2 ">
                    <span class="cart-header-price">
                      Harga Produk
                    </span>
                  </div>
                  <!-- <div class="col-md-2 ">
                    <span class="cart-header-price">
                      Warehouse Delivery Fee
                    </span>
                  </div> -->
                  <div class="col-md-4">
                    <span class="cart-header-note">
                      Note
                    </span>
                  </div>
                  <div class="col-md-2">
                    <span class="cart-header-action">
                      Action
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="cart-body bg-white">
            <ul
              v-if="cart.length > 0"
              class="cart-list"
            >
              <li 
                v-for="(item, index) in cart" 
                :key="index"
                class="cart-item"
              >
                <div class="row">
                  <div class="col-md-4 col-sm-12">
                    <div class="cart-product">
                      <div class="cart-product-thumbnail">
                        <img
                          :src="item.image"
                          class="img-responsive"
                        />
                      </div>
                      <div class="cart-product-title">
                        <nuxt-link  
                          :to="`/products/details/${item.prd_id}`"
                          target="_blank"
                        >
                          <span>
                            {{ item.title }}
                          </span>
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-2 cart-price col-sm-12">
                    <span>{{ $currencyType() }} {{ $formatNumber(item.product_price) }}</span>
                  </div>
                  <!-- <div class="col-md-2 cart-price col-sm-12">
                    <span>{{ $currencyType() }} {{ $formatNumber(item.warehouse_delivery_fee) }}</span>
                  </div> -->
                  <div class="col-md-4">
                    <div class="cart-note">
                      <span
                        v-for="(note, i) in $productNote(item.note)"
                        :key="i"
                        class="cart-note-list"
                      >
                        &nbsp;<i class="fa fa-tag" />{{ note.notes }} <strong>{{ note.quantity }}</strong>
                      </span>
                    </div>
                  </div>
                  <div class="col-md-2 col-sm-12">
                    <div class="cart-action">
                      <a
                        href="javascript:;"
                        @click="deleteCart(item, index)"
                      >
                        <i class="fa fa-trash" /> Remove
                      </a>
                      <!-- <a href="#">
                                                <i class="fa fa-heart" />Add to wishtlist
                                            </a> -->
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul v-if="!loading && cart.length < 1">
              <li class="cart-item">
                <div class="row">
                  <div class="col-lg-12">
                    <p class="text-center">
                      Cart Not found
                    </p>
                  </div>
                </div>
              </li>
            </ul>
            <ul v-if="loading">
              <li class="cart-item">
                <div class="row">
                  <div class="col-md-12">
                    <CartLoader />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div
            v-if="cart.length > 0"
            class="cart-footer bg-white"
          >
            <ul class="cart-list">
              <li class="cart-item">
                <div class="row">
                  <div class="col-md-12">
                    <div class="cart-footer-body">
                      <div class="cart-footer-info">
                        <span>Total Belanja : {{ order !== null ? order.quantity : 0 }}</span>
                        <span>{{ $currencyType() }}{{ order !== null ? $formatNumber(order.total) : 0 }}</span>
                      </div>
                      <div class="cart-footer-action">
                        <nuxt-link
                          class="btn btn-lg btn-danger"
                          :to="localePath({path:'/cart/formshipment'})"
                        >
                          Process
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import CartLoader from '~/components/contentLoader/cartLoader.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  middleware: ['auth'],
    
  components:{
    Breadcrumb,
    CartLoader
  },

  data(){
    return{
      cart: [],
      order:null,
      loading:true
    }
  },

  computed:{
    ...mapGetters({
      cartVuex : 'cart',
      totalCart:'totalCart'
    })
  },

  mounted(){
    this.fetchCart()
  },


  methods:{
    ...mapActions({
      setCart : 'setCart'
    }),

    async fetchCart(){
      try {
        let cart = await this.$axios.$get('/v2/cart')
        if(cart.status){
          this.cart = cart.data.detail
          this.order = cart.data.order
        }
        this.loading = false
      } catch (error) {
        throw error
      }
    },

    async deleteCart(item, index){
      this.$swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this cart",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          try {
            this.$axios.delete(`/v2/cart/${this.order.order_id}/${item.id}`)
            this.cart.splice(index, 1)
            let cartVuex = this.cartVuex.filter(x=> x.product_id !== item.product_id)
            this.setCart(cartVuex)
            this.order.total = this.order.total - item.price_total
            this.order.quantity = this.order.quantity - item.quantity
                
          } catch (error) {
            throw error
          }
        }
      })
    }
  }
}
</script>