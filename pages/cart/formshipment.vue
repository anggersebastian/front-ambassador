<template>
  <div
    id="product_id"
    class="container"
  >
    <div class="row">
      <Breadcrumb :list="[{name:'Form shipment', slug:'/cart/formshipment'}]" />
    </div>
    <div
      v-if="order"
      class="row"
    >
      <div class="col-lg-8">
        <div class="shipment">
          <ul class="shipment-content">
            <li class="shipment-body bg-white">
              <div class="row">
                <div class="col-lg-12">
                  <div class="shipment-address">
                    <div class="shipment-address-header">
                      <span>Alamat Pengiriman</span>
                    </div>
                    <no-ssr>
                      <ul
                        v-if="actAddress"
                        class="shipment-address-body"
                      >
                        <li class="shipment-address-item">
                          <strong>{{ actAddress.receiver_name }}</strong>
                        </li>
                        <li class="shipment-address-item">
                          {{ actAddress.phone }}
                        </li>
                        <li class="shipment-address-item">
                          Label : {{ actAddress.label }}
                        </li>
                        <li class="shipment-address-item">
                          {{ actAddress.address }}, {{ actAddress.ro_district ? actAddress.ro_district+',' : '' }} {{ actAddress.ro_city ? actAddress.ro_city+',' : '' }} 
                          {{ actAddress.ro_province ? actAddress.ro_province+',' :'' }} {{ actAddress.pos_code }}, <strong>{{ actAddress.country.name }}</strong>
                        </li>
                      </ul>
                    </no-ssr>
                    <div class="shipment-address-footer">
                      <button
                        class="btn btn-sm bg-yellow"
                        @click="newAddress"
                      >
                        Add alamat
                      </button>
                      <button
                        class="btn btn-default btn-sm"
                        @click="listAddress(false)"
                      >
                        Change alamat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li
              v-for="(nCart, i) in cart"
              :key="i"
              class="shipment-body bg-white"
            >
              <div class="row">
                <div class="col-lg-12">
                  <div class="shipment-body-product">
                    <div class="shipment-thumbnail">
                      <img
                        :src="nCart.image"
                        class="img-responsive"
                      />
                    </div>
                    <div class="shipment-body-title">
                      <span>
                        {{ $capitalizeFirstLetter(nCart.title) }}
                      </span>
                      <p class="shipment-body-info">
                        Jumlah : {{ nCart.quantity }} <br />
                        Harga : {{ $currencyType() + $formatNumber(nCart.product_price) }} <br />
                      </p>
                    </div>
                  </div>
                  <div class="form-group shipment-form">
                    <label for="logistic">
                      Pilih Logistik :
                    </label>
                    <select
                      v-model="nCart.logistict"
                      class="form-control" 
                      placeholder="Select Shipping Method"
                      @change="onSelectedLogistict($event, i)"
                    >
                      <option value="default">
                        Pilih Kurir
                      </option>
                      <option
                        v-for="(ongkir, iOngkir) in logistict"
                        :key="iOngkir"
                        :value="ongkir.value + ',' + ongkir.ongkir.value"
                      >
                        {{ ongkir.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="shipment isfixed">
          <div class="panel panel-default">
            <div class="panel-heading">
              Ringkasan Belanja
            </div>
            <div class="panel-body">
              <ul class="shipment-list">
                <li class="shipment-item">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td>Harga product</td>
                        <td>{{ $currencyType() }}{{ order !==null ? $formatNumber(order.productPrice) : 0 }}</td>
                      </tr>
                      <!-- <tr>
                        <td>Warehouse delivery fee</td>
                        <td>{{ $currencyType() + $formatNumber(order.deliveryFee) }}</td>
                      </tr> -->
                      <tr>
                        <td>Ongkos kirim lokal</td>
                        <td>{{ $currencyType() + $formatNumber(totalOngkir) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-heading">
              Tax & Pengiriman Internasional
            </div>
            <div class="panel-body">
              <ul class="shipment-list">
                <li class="shipment-item">
                  <table class="table table-striped">
                    <tbody>
                      <tr>
                        <td>Pajak & Pengiriman ke indonesia</td>
                        <td>{{ $currencyType() + $formatNumber(internationalShp) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>
          </div>
          <div class="panel panel-default">
            <div class="panel-body">
              <ul class="shipment-list">
                <li class="shipment-item-info">
                  <span>Total :</span>
                  <span>{{ $currencyType() }}{{ $formatNumber(total) }}</span>
                </li>
                <li class="shipment-item-action">
                  <button
                    class="btn btn-block btn-danger"
                    @click="checkout"
                  >
                    Checkout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="row"
    >
      <div class="col-lg-12">
        <p>Cart is empty</p>
      </div>
    </div>
    <NewAddressModal
      ref="newAddress"
      :onsubmit="postNewAddress"
      :actaddress="actAddress"
      :listprovinces="listProvinces"
      :getlistcities="getListCities"
      :listcities="listCities"
      :getlistdistricts="getListDistricts"
      :listdistricts="listDistricts"
    />
    <AddressListModal
      v-if="allAddress"
      ref="listAddress"
      :listaddress="allAddress"
      :onpresscust="setActAddress"
    />
  </div>
</template>
<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import NewAddressModal from '~/components/modal/NewAddressModal.vue'
import AddressListModal from '~/components/modal/AddressListModal.vue'
import {mapGetters} from 'vuex'

export default {
  name:'Formshipment',
  middleware: ['auth'],

  components:{
    Breadcrumb,
    NewAddressModal,
    AddressListModal
  },

  head () {
    return {
      title: 'Form Shipment',
      meta: [
        { hid: 'description', name: 'description', content:'List data formshipment'}
      ]
    }
  },

  data(){
    return{
      item:4,
      cart: [],
      ongkirs: [],
      order: null,
      actAddress: null,
      allAddress: [],
      listProvinces: [],
      listCities: [],
      listDistricts: [],
      country : 'id',
      orderId : null,
      logistict :[],
      totalOngkir:0
    }
  },

  computed:{
    total(){
      if(!this.order) return 0
      return this.totalOngkir + this.order.total + this.internationalShp
    },

    internationalShp(){
      if(!this.order) return 0
      const t =  ((this.order.total * this.percentage) /100)
      return t
    },

    ...mapGetters({
      activePackage:'auth/package',
    }),

    percentage(){
      if(this.activePackage){
        if(this.activePackage == 'Affliate') return 77.5
        if(this.activePackage == 'Dropship') return 67.5
        if(this.activePackage == 'Offline') return 47.5
      }
      return 97.5
    }
  },

  watch: {
    actAddress(newValue){
      if(newValue !== null){
        this.fetchOngkir()
      }
    }
  },

  mounted(){
    this.fetchFormShipment()
    this.getAllAddress()
    this.getListProvinces()
  },

  methods:{
    async fetchFormShipment(){
      this.$store.dispatch('setLoading', true)
      let cartForm = await this.$axios.$get('/v2/cart')
      this.$store.dispatch('setLoading', false)
      if(cartForm.status){
        this.order = cartForm.data.order
        let cart = cartForm.data.detail.map(x=>{
          x.ongkir = null
          x.logistict = 'default'
          x.ongkirValue = 0
          return x
        })
        this.cart = cart
      }

    },

    newAddress() {
      let element = this.$refs.newAddress.$el
      $(element).modal('show')
    },

    postNewAddress(objInp){
      this.$store.dispatch('setLoading', true)
      this.$axios
        .$post('/v2/address', JSON.stringify(objInp))
        .then(response => {
          if(response.status){
            this.getAllAddress()
            let element = this.$refs.newAddress.$el
            $(element).modal('hide')
          }else{
            alert(response.data)
          }
                    
          this.$store.dispatch('setLoading', false)
        })
        .catch(error => {
          this.$store.dispatch('setLoading', false)
          throw error
        })
    },

    listAddress(status){
      let element = this.$refs.listAddress.$el
      if(status) return $(element).modal('hide')
      $(element).modal('show')
    },

    selectAddress(){
      let element = this.$refs.listAddress.$el
      $(element).modal('hide')
    },


    getAllAddress(){
      this.$axios
        .$get('/v2/address')
        .then(response => {
          if(response.status){
            if(response.data.length > 0){
              this.allAddress = response.data 
              this.actAddress = this.allAddress.filter(x => x.is_default == 1)[0]
            } else{
              return this.newAddress()
            }
          }
        })
        .catch(error => {
          throw error
        })
    },

    setActAddress(idSet) {
      this.ongkirs = []
      this.$store.dispatch('setLoading', true)
      this.$axios
        .$put('/v2/address/' + idSet)
        .then(response => {
          if(response.status){
            this.$store.dispatch('setLoading', false)
            this.listAddress(true)
            this.actAddress = response.data
          }
        })
        .catch(error => {
          this.$store.dispatch('setLoading', true)
          this.listAddress(true)
        })
    },

    async getListProvinces() {
      try {
        let province = await this.$axios.$get('/v2/address/province/country/id')
        if(province.status){
          this.listProvinces = province.data
        }
      } catch (error) {
        throw error
      }
           
    },

    getListCities(prov) {
      if(prov != '') {
        this.$store.dispatch('setLoading', true)
        this.$axios
          .$get('/v2/address/city/province/' + prov)
          .then(response => {
            this.$store.dispatch('setLoading', false)

            if(response.status){
              this.listCities = response.data
            }
          })
          .catch(error => {
            this.$store.dispatch('setLoading', false)

            this.listCities = []
            this.listDistricts = []
          })
      } else {
        this.listCities = []
        this.listDistricts = []
      }
    },

    getListDistricts(district) {
      if(district != '') {
        this.$store.dispatch('setLoading', true)
        this.$axios
          .$get('/v2/address/district/city/' + district)
          .then(response => {
            this.$store.dispatch('setLoading', false)
            if(response.status){
              this.listDistricts = response.data
            }
          })
          .catch(error => {
            this.$store.dispatch('setLoading', false)

            this.listDistricts = []
          })
      } else {
        this.listDistricts = []
      }
    },

    async fetchLogistic(){
      try {
        let logistict = await this.$axios.$get('/v2/address/logistic')
        if(logistict.status){
          this.logistict = logistict.data
        }
      } catch (error) {
        throw error
      }
    },

    async onSelectedLogistict(event, i){
      if(event == 'default') return

      let cart = this.cart[i]
      let weight = null
      if(!cart.weight){
        weight = await this.generateWeight(cart.product_id)
      }
      cart.ongkir = event.target.value
      let parsing = event.target.value.split(',')
      if(weight){
        weight = weight < 1 ? 1 : weight
        cart.weight = weight
        cart.ongkirValue = weight * parsing[1]
      } else{
        cart.ongkirValue = parsing[1]
      }
      this.$set(this.cart, i, cart)
      return this.generatTotalOngkir()
    },

    generatTotalOngkir(){
      let total = 0
      this.cart.map(x => {
        total = total + parseInt(x.ongkirValue)
      })
      this.totalOngkir = total
    },

    async fetchOngkir(){
      try {
        let ongkir = await this.$axios.$get(`/v2/address/ongkir/${this.actAddress.district_id}?weight=1`)
        let logistict = ongkir.data.rajaongkir.results

        let arr = []

        logistict.map(x => {
          x.costs.map(y => {
            arr.push({
              name: x.name +' '+ y.service + ', '+this.$currencyType()+' '+this.$formatNumber(y.cost[0].value) +'/Kg',
              ongkir:y.cost[0],
              value:x.name
            })
          })
        })
        this.logistict = arr
      } catch (error) {
        throw error
      }
    },

    async generateWeight(params){
      try {
        this.$store.dispatch('setLoading', true)
        let gets = await this.$axios.$get(`/general/semantic/${params}`)
        this.$store.dispatch('setLoading', false)
        if(gets.status){
          gets = gets.data
          if(gets.confidence > 0.5){
            return gets.weight
          }
          return null
        }
      } catch (error) {
        throw error
      }
    },

    async checkout(){
            
      let error = false
      let data = []
      if(!this.setActAddress){
        return this.$swal({
          title: "WARNING!",
          text: "Please set your address",
          icon: "warning",
        })
      }

      this.cart.map(x => {
        if(!x.ongkirValue){
          error = true
        }else{
          data.push({
            detail_order : x.id,
            ongkir : {
              ongkir:x.ongkirValue,
              status:false,
              type:x.ongkir.split(",")[0]
            }
          })
        }

        if(x.logistict === '' || x.logistict === 'default'){
          error = true
        }
      })

      if(error) return this.$swal({
        title: "WARNING!",
        text: "Silahkan pilih kurir",
        icon: "warning",
      })

      let params = {
        detail : data,
        order_id: this.order.order_id
      }

      // console.log(params, 'soso')
      // return
      try {
        this.$store.dispatch('setLoading', true)
        let post = await this.$axios.$post('/v2/cart/checkout', params)
        if(post.status){
          this.$store.dispatch('setCart', []) // remove cart
          this.$router.push(this.localePath({path:'/bill/'+post.data.invoice}))
        } else {
          return this.$swal({
            title: "WARNING!",
            text: "Somethink is wrong, please contact the admin website",
            icon: "warning",
          })
        }
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        return this.$swal({
          title: "Sorry!",
          text: "Product Unavilable to buy",
          icon: "warning",
        })
      }
    },
  },

}
</script>
<style lang="scss" scoped>
    #product_id{
        min-height:70vh;
    }
</style>