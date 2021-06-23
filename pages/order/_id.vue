<template>
  <div
    id="product_id"
    class="container rts-product-detail"
  >
    <div class="row">
      <Breadcrumb :list="[{name:'Order', slug:'/order'}, {name:'Detail', slug:'/order/'+$route.params.id}]" />
    </div>

    <div
      v-if="detailProd != null"
      class="row"
    >
      <div class="col-lg-12">
        <div class="order-detail">
          <div class="alert alert-warning">
            <strong>Alamat yang digunakan :</strong>
            <span>{{ infoAddress.username }}</span>
            <span>{{ infoAddress.phone }}</span>
            <span>{{ infoAddress.address }}, {{ infoAddress.district }}, {{ infoAddress.city }}, {{ infoAddress.province }}, {{ infoAddress.post_code }}, {{ infoAddress.country }}</span>
          </div>

          <!-- <div class="alert alert-warning">
                        <strong>Alamat yang digunakan :</strong>
                        <span>COD di gudang importir</span>
                    </div> -->

          <ul class="order-detail-list">
            <li class="order-detail-header">
              <div class="row">
                <div class="col-md-12">
                  <h1 class="order-detail-heading">
                    Invoice Detail
                  </h1>
                </div>
              </div>
            </li>
            <li class="order-detail-item">
              <div class="row">
                <div class="col-md-1">
                  <div class="order-detail-invoice">
                    <strong>YG{{ infoAddress.yg_order_id }}</strong>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="order-detail-product">
                    <div class="order-detail-thumbnail">
                      <img
                        :src="infoAddress.image"
                        alt=""
                        class="img-responsive"
                      />
                    </div>
                    <div class="order-detail-title">
                      {{ infoAddress.title }}
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="order-detail-quantity">
                    Jumlah {{ infoAddress.quantity }}
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="order-detail-date">
                    19 Agustus 2019
                  </div>
                </div>
              </div>
            </li>
            <li class="order-detail-note">
              <p><strong>NOTE :</strong> {{ infoAddress.note }}</p>
            </li>
          </ul>
          <div class="alert alert-success">
            <strong>Shipping detail :</strong>
            <span>Cbm / Berat : {{ infoAddress.cbm }} / {{ infoAddress.weight }}Kg</span>
            <span>Jenis Pengiriman {{ infoAddress.delivery_type }}</span>
            <span><strong>Admin Note :</strong> {{ infoAddress.admin_note }}</span>
          </div>
          <ul class="order-detail-list">
            <li class="order-detail-header">
              <div class="row">
                <div class="col-md-12">
                  <h1 class="order-detail-heading">
                    Detail Tagihan
                  </h1>
                </div>
              </div>
            </li>
            <li class="order-detail-item">
              <div class="row">
                <div class="col-md-4 col-sm-12">
                  <div class="row">
                    <div class="col-md-6 col-sm-12">
                      <span>Harga Produk</span>
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <span>Total Produk</span>
                    </div>
                  </div>
                  <div
                    v-for="(price, pI) in infoAddress.prices"
                    :key="pI"
                    class="row"
                  >
                    <div class="col-md-6 col-sm-12">
                      <span>{{ price.price }}</span>
                    </div>
                    <div class="col-md-6 col-sm-12">
                      <span>{{ price.qty }}</span>
                    </div>
                  </div>
                </div>
                <div class="col-md-2 col-sm-12">
                  <span>Biaya Pajak</span>
                  <span>{{ infoAddress.tax }}</span>
                </div>
                <div class="col-md-2 col-sm-12">
                  <span>Biaya Pengiriman</span>
                  <span>{{ infoAddress.delivery }}</span>
                </div>
                <div class="col-md-2 col-sm-12">
                  <span>Biaya Penanganan</span>
                  <span>{{ infoAddress.handling }}</span>
                </div>
                <div class="col-md-2 col-sm-12">
                  <span>Total</span>
                  <span>{{ infoAddress['price-total'] }}</span>
                </div>
              </div>
            </li>
          </ul>

          <ul
            v-if="detailProd.bills.length"
            class="order-detail-list"
          >
            <li class="order-detail-info text-center">
              <nuxt-link :to="localePath({path:`/bill/${detailProd.bills[0].id}`})">
                Kehalaman Pembayaran <i
                  class="fa fa-chevron-right"
                  aria-hidden="true" 
                />
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import { mapActions } from 'vuex'

export default {
  middleware: ['auth'],

  components:{
    Breadcrumb
  },

  data(){
    return{
      detailProd: null,
      infoAddress: null
    }
  },

  mounted(){
    this.getDetailHistory()
  },

  methods: {
    ...mapActions({
      'setLoading' : 'setLoading',
    }),
    getDetailHistory(){
      this.$store.dispatch('setLoading', true)
      this.$axios
        .$get(`/v2/order/${this.$route.params.id}`)
        .then(response => {
          this.$store.dispatch('setLoading', false)

          if(response.status){
            this.detailProd     = response.data
            this.infoAddress    = this.detailProd.detailOrders[0]
          }
                    
        })
        .catch(error => {
          this.$store.dispatch('setLoading', false)

          throw error
        })
    }
  },
}
</script>