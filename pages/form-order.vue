<template>
  <div
    id="form-order"
    class="container"
  >
    <div
      v-if="product"
      class="row"
    >
      <div class="col-lg-8 col-lg-offset-2">
        <div class="card">
          <div class="card-header">
            <h2>
              {{ setting.headerText }}
            </h2>
          </div>

          <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form
                ref="form-order"
                autocomplete="off"
                @submit.prevent="handleSubmit(submitForm)"
              >
                <!-- <h2>Data Penerima:</h2> -->
                <div
                  v-if="attribute.length"
                  class="order-attribute"
                >
                  <div
                    v-for="(attr, j) in attribute"
                    :key="j" 
                    class="form-group"
                  >
                    <div class="row">
                      <div class="col-md-8 col-xs-7">
                        <label
                          for="productModel"
                          class="control-label"
                        >
                          Pilihan Produk
                        </label>
                        <select
                          class="form-control"
                          @change="onSelectType($event, j)"
                        >
                          <option
                            v-for="(item, index) in product.attribute"
                            :key="index"
                            :value="item.id"
                          >
                            {{ item.value }}
                          </option>
                        </select>
                        <div
                          v-if="attribute.length > 1"
                          class="remove-attribute"
                        >
                          <a
                            href="javascript:;"
                            @click="removeAttribute(j)"
                          >
                            <i class="fa fa-trash" /> Hapus
                          </a>
                        </div>
                      </div>
                      <div class="col-md-4 col-xs-5">
                        <div
                          class="input-group"
                          style="margin-top:2.5rem"
                        >
                          <span class="input-group-btn">
                            <a
                              href="javascript:;"
                              class="btn btn-default btn-number"
                              @click="onUpdateValue(false, j)"
                            >
                              <span class="glyphicon glyphicon-minus" />
                            </a>
                          </span>
                          <input
                            v-model="attr.qty"
                            type="text"
                            class="form-control input-number"
                            style="text-align:center"
                            @keypress="$checkNumber($event)"
                            @change="onManualSetQty($event, j)"
                          />
                          <span class="input-group-btn">
                            <a
                              href="javascript:;"
                              class="btn btn-default btn-number"
                              @click="onUpdateValue(true, j)"
                            >
                              <span class="glyphicon glyphicon-plus" />
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group">
                    <a
                      href="javascript:;"
                      class="btn btn-block btn-default"
                      @click="newModel()"
                    >
                      <i class="fa fa-plus" /> Tambah Variasi
                    </a>
                  </div>
                </div>

                <div v-if="setting === null && !attribute.length">
                  <h2
                    v-if="!attribute.length"
                    class="payment-title"
                  >
                    Jumlah Pesanan:
                  </h2>
                  <ValidationProvider
                    v-if="!attribute.length"
                    v-slot="{ errors }"
                    name="qty"
                    rules="required"
                    tag="div"
                    class="form-group"
                  >
                    <select
                      v-model="qty"
                      class="form-control input-qty"
                    >
                      <option
                        v-for="n in 100"
                        :key="n"
                        :value="n"
                      >
                        {{ n }}
                      </option>
                    </select>
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>

                <div v-if="setting !== null && setting.quantity === true && !attribute.length">
                  <h2
                    v-if="!attribute.length"
                    class="payment-title"
                  >
                    Jumlah Pesanan:
                  </h2>
                  <ValidationProvider
                    v-if="!attribute.length"
                    v-slot="{ errors }"
                    name="qty"
                    rules="required"
                    tag="div"
                    class="form-group"
                  >
                    <select
                      v-model="qty"
                      class="form-control input-qty"
                    >
                      <option
                        v-for="n in 100"
                        :key="n"
                        :value="n"
                      >
                        {{ n }}
                      </option>
                    </select>
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>


                <h2 class="payment-title">
                  Customer Data:
                </h2>
                <div v-if="setting.name">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="name"
                    rules="required"
                    tag="div"
                  >
                    <div class="form-group">
                      <input
                        v-model="name"
                        type="text"
                        class="form-control"
                        placeholder="Nama Anda"
                      />
                      <span class="help-block">
                        {{ errors[0] }}
                      </span>
                    </div>
                  </ValidationProvider>
                </div>
                                    
                <div v-if="setting.phone">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="phone"
                    rules="required"
                    tag="div"
                  >
                    <div class="form-group">
                      <input
                        v-model="phone"
                        type="text"
                        class="form-control"
                        placeholder="No. WhatsApp Anda"
                        @keypress="$checkNumber($event)"
                      />
                      <span class="help-block">
                        {{ errors[0] }}
                      </span>
                    </div>
                  </ValidationProvider>
                </div>
                                    
                <div v-if="setting.email">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="email"
                    rules="email"
                    tag="div"
                    class="form-group"
                  >
                    <input
                      v-model="email"
                      type="email"
                      class="form-control"
                      placeholder="Email"
                    />
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                                    
                <div
                  v-if="setting.city"
                  id="blockCity"
                  class="form-group"
                >
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="city"
                    rules="required"
                    tag="div"
                  >
                    <input
                      id="setCity"
                      v-model="city.name"
                      type="text"
                      class="form-control"
                      placeholder="Kota/Kecamatan"
                      readonly
                      @click="openHover()"
                    />
                    <!-- <span class="help-block">
                                                {{ errors[0] }}
                                            </span> -->
                  </ValidationProvider>

                  <div class="drp-dropdown">
                    <div class="search-input">
                      <input
                        id="inputSearch"
                        v-model="search"
                        type="text"
                        class="form-control"
                      />
                      <small>Ketik nama kota atau Kecamatan</small>
                    </div>
                    <ul
                      v-show="addressList.length"
                      class="address-list"
                    >
                      <li
                        v-for="(item, index) in addressList"
                        :key="index"
                        @click="onSelectAddress(item)"
                      >
                        {{ item.name }}
                      </li>
                    </ul>
                    <ul
                      v-show="!addressList.length"
                      class="address-list"
                      style="color:#959090;"
                    >
                      <li
                        v-if="loading"
                        class="text-center"
                      >
                        <i class="fa fa-refresh fa-spin fa-2x" />
                      </li>
                    </ul>
                  </div>
                </div>

                <div v-if="setting.address">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="address"
                    rules="required"
                    tag="div"
                  >
                    <div class="form-group">
                      <textarea
                        id=""
                        v-model="address"
                        name=""
                        cols="20"
                        rows="3"
                        class="form-control"
                        placeholder="Alamat Lengkap"
                      />
                      <span class="help-block">
                        {{ errors[0] }}
                      </span>
                    </div>
                  </ValidationProvider>
                </div>

                <h2 class="payment-title">
                  Metode Pembayaran:
                </h2>
                <ul class="form-payment">
                  <li @click="setPayment(true)">
                    <input
                      v-model="payment"
                      type="radio"
                      name="payment_type"
                      value="transfer"
                    />
                    <img
                      :src="require('../static/payment-bank_transfer.png')"
                      alt=""
                    />
                    <span>Pembayaran Online</span>
                  </li>
                  <li
                    v-if="setting && setting.cod === true"
                    @click="setPayment(false)"
                  >
                    <input
                      v-model="payment"
                      type="radio"
                      name="payment_type"
                      value="cod"
                    />
                    <img
                      :src="require('../static/payment-cod.png')"
                      alt=""
                    />
                    <span>COD</span>
                  </li>
                </ul>

                <div
                  v-if="product && product.main_image"
                  class="order-image"
                >
                  <div
                    v-if="setting !== null && setting.image === true"
                    class="order-cover"
                  >
                    <img
                      :src="product.main_image"
                      alt="Product Images"
                      class="img-responsive"
                    />
                  </div>
                  <div
                    v-if="setting===null"
                    class="order-cover"
                  >
                    <img
                      :src="product.main_image"
                      alt="Product Images"
                      class="img-responsive"
                    />
                  </div>
                </div>

                <div class="order-detail">
                  <div class="order-detail-form">
                    <h2>Rincian Pesanan:</h2>
                  </div>
                  <ul
                    v-if="product"
                    class="order-detail-product"
                  >
                    <li
                      v-for="(item, index) in attribute"
                      v-if="attribute.length"
                      :key="index"
                    >
                      <div>
                        <span>{{ product.name }} x</span>
                        <span>{{ item.qty }} <span>{{ item.value }}</span></span>
                      </div>
                      <div>
                        <!-- <span>Rp {{ $formatNumber(parseInt(product.price) * qty) }}</span> -->
                        <span>Rp {{ $formatNumber(item.qty * item.price) }}</span>
                      </div>
                    </li>
                    <li v-if="attribute.length < 1">
                      <div>
                        <span>{{ product.name }} x</span>
                        <span>{{ qty }}</span>
                      </div>
                      <div>
                        <!-- <span>Rp {{ $formatNumber(parseInt(product.price) * qty) }}</span> -->
                        <span>Rp {{ $formatNumber(productPrice) }}</span>
                      </div>
                    </li>
                                        
                    <li v-if="shippingCost > 0">
                      <div><span>Ongkos Kirim</span></div>
                      <div><span>Rp {{ $formatNumber(shippingCost) }}</span></div>
                    </li>
                    <!-- <li v-if="payment == 'transfer'">
                                            <div><span>Kode Unik</span></div>
                                            <div><span>Rp {{ $formatNumber(uniqueCost) }}</span></div>
                                        </li> -->
                    <li v-if="payment == 'cod'">
                      <div><span>COD Fee</span></div>
                      <div><span>Rp {{ $formatNumber(codFee) }}</span></div>
                    </li>
                    <li class="price-total">
                      <div>
                        <span>Total</span>
                      </div>
                      <div>
                        <span>Rp {{ $formatNumber(total) }}</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div class="order-action">
                  <button
                    class="btn btn-danger btn-lg btn-block"
                    type="submit"
                  >
                    BELI SEKARANG 
                    <i
                      class="fa fa-arrow-circle-right"
                      aria-hidden="true"
                      style="font-size:22px;"
                    />
                  </button>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
      <div class="col-lg-12">
        <div class="app-logo">
          <img
            src="http://dropy.id/_nuxt/img/542405e.png"
            alt="Logo Dropy"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ValidationProvider,ValidationObserver } from "vee-validate"
import Cookies from 'js-cookie'
export default {
  layout:'NoHeader',

  components:{
    ValidationProvider,
    ValidationObserver
  },

  head () {
    return {
      title: 'Form order',
      meta: [
        { hid: 'description', name: 'description', content: 'Form order' }
      ]
    }
  },
    
  data(){
    return{
      name:'',
      qty:1,
      phone:'',
      city:{
        name:''
      },
      email:'',
      address:'',
      payment:'transfer',

      search:'',
      hover:false,
      addressList:[],
      fetch:false,
      cost:null,

      product:null,
      // uniqueCost:Math.floor(Math.random() * 500) + 100,
            
      attribute:[],
      firstAttribute:null,

      loading:false,
      submitCount:0,

      productPrice:0,
      codFee:0,
      shippingCost:0,
      total:0,
      groupQuantity:1,
      setting:{
        cod:true,
        image:true,
        quantity:true,
        layout:'single',
        email:false,
        name:true,
        phone:true,
        city:true,
        address:true,
        headerText:' Silahkan isi Form di bawah Dengan Lengkap dan tekan tombol BELI untuk Lakukan Pemesanan'
      }
    }
  },

  watch:{
    search(newValue){
      if(newValue.length > 2){
        this.fetchAddress()
      }else{
        this.addressList = []
      }
    },
        
    city(newValue){
      if(newValue){
        this.fetchOngkir()
      }
    },

    qty(newValue){
      if(newValue){
        this.fetchOngkir()
      }
    },

    payment(newValue){
      return this.generateTotal()
    }
  },

  mounted(){
    this.socket1 = this.$nuxtSocket({ // In our example above, since vuex opts are set for 'home', they will be used. (see computed props)
      name: 'order', // If left blank, module will search for the socket you specified as the default
      channel: '',
      reconnection: true
    })
    this.fetchProduct()
  },

  methods:{
    setPayment(params){
      return this.payment = params ? 'transfer' : 'cod'
    },

    async submitForm(event){
      this.$store.dispatch('setLoading', true)
      $('.order-action button').addClass('disabled')
      if(this.submitCount  > 0) return
      this.submitCount = this.submitCount + 1
      let body = {
        name:this.name,
        qty:this.qty,
        phone:this.phone,
        city:this.city.name ? this.city : null,
        address:this.address,
        product:this.product.id,
        attribute:this.attribute,
        payment:this.payment,
      }
      if(this.email) {
        body.email = this.email
      }

      try {
        let order = await this.$axios.$post(process.env.DROPY_BACKEND_URL+'/order', body)
        this.$store.dispatch('setLoading', false)
        if(order.status){
          order = order.data
          this.socket1.emit('GET_MESSAGE_NEW_ORDER', {
            order:order.order.invoice_number,
            admin_id:order.order.admin_id,
            costumer:order.customer.name,
            product:order.product,
            created_at:order.created_at
          })
          return this.$router.push('/thanks?order='+order.order.invoice_number)
        }

      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    async fetchAddress(){
      try {
        if(this.fetch) return
        this.loading = true
        this.fetch = true
        let address = await this.$axios.get(process.env.DROPY_BACKEND_URL+'/address?key='+this.search)
        address = address.data
        if(address.status){
          this.addressList = address.data
          this.fetch = false
          this.loading = false
        }
      } catch (error) {
        throw error
      }
    },

    openHover(){
      if($('.drp-dropdown').hasClass('active')){
        $('.drp-dropdown').removeClass('active')
      }else{
        $('.drp-dropdown').addClass('active')
        setTimeout(()=>{
          document.getElementById('inputSearch').focus()
        }, 200)
      }
    },

    onSelectAddress(params){
      this.city = params
      this.hover = false
      $('.drp-dropdown').removeClass('active')
    },

    async fetchProduct(){
            
      try {
        let slug = this.$route.query
        if(typeof slug.product == 'undefined') return this.$router.push('/sorry')
        let product = await this.$axios.$get(process.env.DROPY_BACKEND_URL +'/product/'+slug.product)
        if(product.status){
          this.product = product.data
          let setting = product.data.setting ? product.data.setting.config : null
          if(setting){
            this.setting = {
              cod:setting.cod,
              image:setting.image,
              quantity:setting.quantity,
              layout:'single',
              email:setting.email,
              name:typeof setting.name == 'undefined' ? this.setting.name : setting.name,
              phone:typeof setting.phone == 'undefined' ? this.setting.phone : setting.phone,
              city:typeof setting.city == 'undefined' ? this.setting.city : setting.city,
              address:typeof setting.address == 'undefined' ? this.setting.name : setting.address,
              headerText:typeof setting.headerText == 'undefined' ? this.setting.headerText : setting.headerText
            }
          }
          if(this.product.attribute.length){
            this.firstAttribute = this.product.attribute[0]
            this.attribute.push({
              id:this.firstAttribute.id,
              key:this.firstAttribute.key,
              value:this.firstAttribute.value,
              price:this.firstAttribute.price,
              qty:1
            })
            this.productPrice = this.product.attribute[0].price
          }else{
            this.productPrice = this.product.price * this.qty
          }
          this.total = this.productPrice
          let checkCookies = Cookies.get('product')

          if(!checkCookies){
            return Cookies.set('product', slug.product, { expires: 1 })
          }else{
            if(checkCookies != slug.product){
              return Cookies.set('product', slug.product, { expires: 1 })
            }
          }
                    
        }else{
          this.$router.push('/sorry')
        }
      } catch (error) {
        throw error
        this.$router.push('/sorry')
      }
    },

    async fetchOngkir(){
      if(typeof this.city.id == 'undefined') return this.generateTotal()
      try {
        let qty = this.attribute.length ? this.groupQuantity : this.qty
        let cost = await this.$axios.$get(process.env.DROPY_BACKEND_URL+`/address/cost?weight=${parseInt(this.product.weight * qty)}&destination=${this.city.id}`)
        if(cost.status){
          this.cost = cost.data
          this.shippingCost = this.cost.value
          let codFee = (parseFloat(this.productPrice) + parseFloat(this.shippingCost)) * 5 /100
          this.codFee = codFee <= 5000 ? 5000 : codFee
          return this.generateTotal()
        }
      } catch (error) {
        throw error
      }
    },

    generateTotal(){
      if(this.attribute.length > 0){
        let price = 0
        this.attribute.map(x => {
          price =  x.price * x.qty + price
          return x
        })
        this.productPrice = price
      }else{
        let productPrice = (parseFloat(this.product.price) * parseFloat(this.qty))
        this.productPrice = productPrice
      }

      if(this.payment == 'cod'){
        return this.total = this.productPrice + parseFloat(this.shippingCost) + parseFloat(this.codFee)
      }else{
        return this.total = this.productPrice + this.shippingCost
      }
    },

    newModel(){
      this.attribute.push({
        id:this.firstAttribute.id,
        key:this.firstAttribute.key,
        value:this.firstAttribute.value,
        price:this.firstAttribute.price,
        qty:1
      })
      this.groupQuantity = this.groupQuantity + 1
      return this.fetchOngkir()
    },

    removeAttribute(index){
      this.$swal({
        title: "Warning",
        text: "Yakin ingin menghapus produk ini ?",
        icon: "warning",
        buttons: true,
      }).then(async(resp) => {
        this.groupQuantity = this.groupQuantity - this.attribute[index].qty
        this.attribute.splice(index, 1)
        return this.fetchOngkir()
      })

    },

    async onUpdateValue(type, j){
      this.$store.dispatch('setLoading', true)
      if(type){
        this.groupQuantity = this.groupQuantity + 1
        this.attribute[j].qty++
        await this.fetchOngkir()
        return this.$store.dispatch('setLoading', false)
      }else{
        if(this.attribute[j].qty < 2) return this.$store.dispatch('setLoading', false)
        this.groupQuantity = this.groupQuantity - 1
        this.attribute[j].qty--
        await this.fetchOngkir()
        return this.$store.dispatch('setLoading', false)
      }
    },

    async onManualSetQty(e, index){
      this.$store.dispatch('setLoading', true)
      let value = e.target.value
      if(value == 0 || value == ''){
        this.attribute[index].qty = 1
      } else{
        this.attribute[index].qty = parseInt(value)
      }
      let qty = 0
      this.attribute.map(x => {
        qty = qty + x.qty
      })
      this.groupQuantity = qty
      await this.fetchOngkir()
      return this.$store.dispatch('setLoading', false)
    },

    onOrder(){
      return this.socket1.emit('GET_MESSAGE_NEW_ORDER', {
        order:'DRP1212',
        admin_id:1,
        costumer:'Sirait Dantry',
        product:'Jam premium b'
      })
    },

    onSelectType(e, index){
      let attribute = this.attribute[index]
      let value = e.target.value
      let find = this.product.attribute.find(x => x.id == value)
      this.attribute[index].id = find.id
      this.attribute[index].value = find.value
      this.attribute[index].price = find.price
      this.generateTotal()
    }

  }
}
</script>
<style lang="scss">
    .form-group{
        position: relative;
    }
    .remove-attribute{
        margin-top: 0.5rem;
        font-size: 12px;
        a{
            color: #918888;
            transition: color 0.2s;
            &:hover,&:focus{
                color: #720303;
            }
        }
    }
</style>