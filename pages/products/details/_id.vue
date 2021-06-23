<template>
  <div
    id="product_id"
    class="container rts-product-detail"
  >
    <div class="row">
      <Breadcrumb :list="[{name:'Product detail', slug:'/bill'}]" />
    </div>
    <div
      v-if="product !== null"
      class="row bg-white"
    >
      <div class="col-lg-4">
        <ProductBanner
          :banner="groupItem"
          :banner-default="defaultBanner"
          :single-banner="singleBanner"
        />

        <div
          v-if="!checkWishlist"
          class="wishlist"
          title="Add to wishlist"
        >
          <a
            href="javascript:;"
            @click="addWishlist()"
          >
            <i
              class="fa fa-heart-o fa-2x"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
      <div class="col-lg-8">
        <div class="product-info">
          <h1 class="title">
            {{ $capitalizeFirstLetter(product.title) }}
          </h1>

          <div
            v-if="product.price_type == 'RANGE'"
            class="product-multi-price"
          >
            <table class="table">
              <tbody>
                <tr>
                  <td class="no-border title-multi">
                    {{ $t('price') }}
                  </td>
                  <td
                    v-for="(prices, i) in product.price_multi"
                    :key="i"
                    class="no-border text-center"
                  >
                    {{ $currencyType() }} {{ $formatNumber(prices.sellPrice) }}
                  </td>
                </tr>
                <tr>
                  <td class="title-multi">
                    Unit
                  </td>
                  <td
                    v-for="(prices, i) in product.price_multi"
                    :key="i"
                    class="text-center"
                  >
                    {{ prices.endNumber === null ? '>='+ prices.startNumber : prices.startNumber }} {{ prices.endNumber === null ? '' : '- '+ prices.endNumber }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="product.price_type === 'OTHERS' || product.price_type === 'FIX'"
            class="product-type-other"
          >
            <span
              v-if="product.price_type === 'OTHERS'"
              class="price-unit"
            >
              {{ $t('start_from') }}
            </span>
            {{ $currencyType() + $formatNumber(product.price) }}
          </div>
          <div class="form-group">
            <div class="row">
              <!-- <div class="col-md-7 col-xs-12">
                                <div class="dropdown">
                                    <button
                                        class="btn btn-default dropdown-toggle"
                                        type="button"
                                        data-toggle="dropdown"
                                        style="font-size:12px;"
                                    >
                                        {{ freight ? 'Delivery type : Air, Harga mulai dari Rp 137.000 /Kg' : 'Jenis Pengiriman : Sea, Harga mulai dari Rp 3.200.000 /Cbm' }}
                                        <span class="caret" />
                                    </button>
                                    <ul
                                        class="dropdown-menu"
                                        style="font-size:12px;"
                                    >
                                        <li>
                                            <a
                                                href="javascript:;"
                                                @click="pressFreigth(true)"
                                            >
                                                {{ $t('shipping_type') }} : Air, {{ $t('start_from') }} Rp 137.000 /Kg
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="javascript:;"
                                                @click="pressFreigth(false)"
                                            >
                                                {{ $t('shipping_type') }} : Sea, {{ $t('start_from') }} Rp 137.000 /Kg
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div> -->
              <!-- <div class="col-md-5 col-xs-12"> -->
              <div class="col-md-12">
                <span class="product-min-order">
                  Minimum Order : {{ product.moq }} Unit
                </span>
              </div>
            </div>
          </div>
          <!-- <div class="product-desc">
                        <ul class="product-volume">
                            <li>CBM : {{ product.cbm_product > 0 ? product.cbm_product : 'Not set' }}</li>
                            <li>WEIGHT : {{ product.weight_product > 0 ? product.weight_product : 'Not set' }}</li>
                        </ul>
                    </div> -->

          <!-- <div class="transaction-info rts-dekstop">
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td class="no-border">
                                        <span>{{ $t('product_price') }} : </span>{{ $currencyType() +' '+ $formatNumber(productPrice) }}
                                    </td>
                                    <td class="no-border">
                                        <span>{{ $t('handling_fee') }} : </span>{{ $currencyType() +' '+ $formatNumber(handlingFee) }}
                                    </td>
                                    <td><span>TOTAL :</span> {{ $currencyType() +' '+ $formatNumber(totalPrice) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->
          <!-- <ul class="transaction-info rts-mobile">
            <li>
              <span class="transaction-title">
                {{ $t('product_price') }} :
              </span> {{ $currencyType() +' '+ $formatNumber(productPrice) }}
            </li>
            <li>
              <span class="transaction-title">
                {{ $t('handling_fee') }} :
              </span> {{ $currencyType() +' '+ $formatNumber(handlingFee) }}
            </li>
            <li>
              <span class="transaction-title">
                Total :
              </span> {{ $currencyType() +' '+ $formatNumber(totalPrice) }}
            </li>
          </ul> -->

          <!-- if product group is true -->
          <div
            v-if="groupItem.length > 0"
            class="product-multi-item gallery"
          >
            <div
              v-for="(item, i) in groupItem"
              :key="i"
              class="list-thumbnail"
              @click="pressItem(item,i, $event)"
            >
              <img
                :src="item[0].image === '' ? product.images[0] : item[0].image"
                alt=""
                class="img-responsive"
              />
            </div>
          </div>

          <div
            v-if="groupItem.length > 0"
            class="product-multi-item"
          >
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Type</th>
                  <th class="rts-dekstop">
                    Stok
                  </th>
                  <th v-if="product.price_type === 'OTHERS'">
                    {{ $t('price') }}
                  </th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(children, index) in child"
                  :key="index"
                  :class="index > 4 ? 'tr-hidden' : 'tr-show'"
                >
                  <td style="font-size:12px;">
                    {{ children.title }}
                  </td>
                  <td class="rts-dekstop">
                    {{ $formatNumber(children.canBookCount) }}
                  </td>
                  <td v-if="product.price_type === 'OTHERS'">
                    {{ $currencyType() + $formatNumber(children.price) }}
                  </td>
                  <td width="150px">
                    <div class="input-group">
                      <span class="input-group-btn">
                        <a
                          href="javascript:;"
                          class="btn btn-info btn-sm"
                          @click="decrement(children, index)"
                        >
                          <i class="glyphicon glyphicon-minus" />
                        </a>
                      </span>
                      <input
                        v-model="children.quantity"
                        type="text"
                        class="form-control input-number"
                        @keypress="isNumber($event)"
                        @keyup="changeQuantity(children, index, $event)"
                      />
                      <span class="input-group-btn">
                        <a
                          href="javascript:;"
                          class="btn btn-info btn-sm"
                          @click="increment(children, index)"
                        >
                          <i class="glyphicon glyphicon-plus" />
                        </a>
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colspan="4"
                    class="text-center"
                  >
                    <p>
                      <a
                        href="javascript:;"
                        :title="toggleMore ? 'Minimize' : 'Show all'"
                        class="more-btn"
                        @click="moreType"
                      >
                        <i
                          :class="toggleMore ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"
                          aria-hidden="true"
                        />
                      </a>
                      <!-- <span class="more-price">
                                                {{ $currencyType() + $formatNumber(productPrice) }}
                                            </span> /  -->
                      <span class="more-unit">
                        {{ multiQty }}
                      </span>
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <!-- end product group -->
                    
          <div class="button-pay">
            <div class="row">
              <div class="col-lg-6 col-xs-12">
                <div
                  v-if="groupItem.length < 1 && product.flag != '1688'"
                  class="form-group"
                >
                  <label for="note">
                    Note :
                  </label>
                  <textarea
                    id=""
                    v-model="productNote"
                    name=""
                    cols="10"
                    rows="2"
                    class="form-control"
                    placeholder="Ex : Warna putih, Ukuran XL and etc"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div
                v-if="product.price_type === 'FIX' || product.price_type === 'RANGE' && !groupItem.length"
                class="col-lg-12"
              >
                <div class="form-group">
                  <label
                    for="qty"
                    class="control-label"
                  >
                    Quantity :
                  </label>
                  <div class="input-group single-qty">
                    <span
                      class="input-group-btn"
                      style="border:1px solid #ddd;"
                    >
                      <a
                        href="javascript:;"
                        class="btn btn-default btn-sm no-border"
                        @click="incrementSingle"
                      >
                        <i class="glyphicon glyphicon-minus" />
                      </a>
                    </span>
                    <input
                      v-model="qty"
                      type="text"
                      class="form-control input-number"
                      @keypress="isNumber($event)"
                      @keyup="changeQtySingle($event)"
                    />
                    <span
                      class="input-group-btn"
                      style="border:1px solid #ddd;"
                    >
                      <a
                        href="javascript:;"
                        class="btn btn-default btn-sm no-border"
                        @click="decrementSingle"
                      >
                        <i class="glyphicon glyphicon-plus" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <!-- <button
                                    class="btn btn-warning btn-lg btn-border color-warning"
                                    @click="addToCart"
                                >
                                    <i class="fa fa-shopping-cart" />
                                    {{ $t('buy') }}
                                </button> -->
                <button
                  class="btn btn-danger btn-lg"
                  @click="addToCart"
                >
                  <i class="fa fa-shopping-cart" />
                  {{ $t('buy') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="row bg-white"
    >
      <div class="rts-dekstop">
        <ProductDetailLoader />
      </div>
      <div class="rts-mobile">
        <ProductDetailMobileLoader />
      </div>
    </div>

    <ProductRecomendation
      :title="$t('product_recomendation')"
      :product="productRecomendation"
    />

    <div class="row">
      <div
        v-if="product !== null"
        class="col-lg-12 product-tab"
      >
        <ul class="nav nav-tabs">
          <li class="active">
            <a
              data-toggle="pill"
              href="#home"
            >
              <i
                class="fa fa-list-alt"
                aria-hidden="true"
              />{{ $t('description') }}
            </a>
          </li>
          <!-- <li>
                        <a
                            data-toggle="pill"
                            href="#menu1"
                        >
                            <i
                                class="fa fa-pencil-square-o"
                                aria-hidden="true"
                            />{{ $t('spesification') }}
                        </a>
                    </li> -->
        </ul>

        <div class="tab-content">
          <div
            id="home"
            class="tab-pane fade in active dropy-description"
            v-html="product.description"
          />
          <!-- <div
                        v-if="product !== null"
                        id="menu1"
                        class="tab-pane fade"
                    >
                        <table class="table table-dotted">
                            <tbody>
                                <tr
                                    v-for="(value, i) in product.attribute"
                                    :key="i"
                                >
                                    <td>{{ value.key }}</td>
                                    <td>{{ value.value }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> -->
        </div>
      </div>
    </div>
    <PopupPackage />
  </div>
</template>
<script>
import Breadcrumb from '~/components/Breadcrumb.vue'
import ProductDetailLoader from '~/components/contentLoader/ProductDetailLoader'
import ProductDetailMobileLoader from '~/components/contentLoader/ProductDetailMobileLoader'
import ProductBanner from '~/components/carousel/product/ProductBanner.vue'
// import ProductSubBanner from '~/components/carousel/product/ProductSubBanner.vue'
import ProductRecomendation from '~/components/carousel/product/ProductRecomendation.vue'
import PopupPackage from '~/components/modal/PackagePopup.vue'

import {generateGroupItem,
        cekNumber,
        calculatePriceRange,
        calculatePriceOthers,
        calculatePriceFix} from '~/helpers/Helpers.js'
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'ProductDetail',
    
  middleware: '',
    
  validate({params}){
    return /^\d+$/.test(params.id)
  },

  head () {
    return {
      title: this.meta.title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta.description},
        { hid: 'og:image', name: 'image', content: this.meta.image},
        { hid: 'og:type', name: 'type', content: 'Importir product'}
      ]
    }
  },
  components:{ 
    Breadcrumb,
    ProductBanner,
    // ProductSubBanner,
    ProductRecomendation,
    ProductDetailLoader,
    ProductDetailMobileLoader,
    PopupPackage
  },

  data(){
    return{
      meta:{},
      product:null,
      productRecomendation:[],
      groupItem:[],
      qty:0,
      multiQty : 0,
      child:[],
      slickOptions: {
        infinite: false,
        centerPadding: '60px',
        slidesToShow: 7,
        slidesToScroll: 1,
        focusOnSelect: true,
        prevArrow:'',
        nextArrow:''
      },
      textQty:'',
      toggleMore:false,
      freight:true,

      // calculate transaction
      productPrice:0,
      priceType:null,
      handlingFee : 0,
      totalPrice:0,
      packageType:3,
      productNote:null,

      // banner 
      singleBanner:false,
      defaultBanner:'',

      // swicth product data
      fecthCount:0,
      productApi:null,
      productLocal:null
    }
  },

  computed:{
    ...mapGetters({
      wishlist:'wishlist',
      cartX:'cart'
    }),

    checkWishlist(){
      return this.wishlist.find(x => x.product_id == this.product.product_id)
    }
  },

  watch:{
    qty(newValue){
      return this.calculatePrice(newValue)
    },

    freight(newValue, oldValue){
      if(newValue !== oldValue) return this.fetchProduct()
    },

    fecthCount(newValue){
      if(this.fecthCount > 1){
        if(this.productLocal == null){
          this.product = this.productApi
          return this.generateProduct(this.product)
        }else{
          this.generateFirstChild()
        }
        if(this.productApi !== null){
          if(this.productApi.product_last_update != this.productLocal.product_last_update){
            this.product = this.productApi
            this.generateProduct(this.product)
            this.generateFirstChild()
          }
        }

      }
    }
  },

  // async asyncData({$axios, redirect, route}) {
  //     try {
  //         let product = await $axios.$get(`/meta/product/${route.params.id}`)
  //         if(product.status){
  //             return {
  //                 meta:product.data
  //             }
  //         }
  //     } catch (error) {
  //         throw error
  //     }
  // },

  mounted(){
    // this.fetchProduct(true) // from local
    this.fetchProduct(true) // from api
    this.fetchRecomendation()
  },
    
  methods:{
    ...mapActions({
      'setLoading' : 'setLoading',
    }),

    async fetchProduct(status){
      try {
        let typeFreight = this.freight ? 'sea' : 'sea'
        let url = `/v2/product/${this.$route.params.id}?freight=${typeFreight}&from=true`
        if(status){
          url = `/v2/product/${this.$route.params.id}?freight=${typeFreight}`
        }
        let product = await this.$axios.$get(url)
        this.fecthCount = this.fecthCount + 1
        if(status){
          // from local
          if(product.status){
            this.productLocal = product
            this.generateProduct(product)
            if(this.groupItem.length){
              this.pressItem(this.groupItem[0], 0)
            }
          }
        } else{
          // from api
          if(product.status){
            this.productApi = product
            this.generateProduct(product)
            if(this.groupItem.length){
              this.pressItem(this.groupItem[0], 0)
            }
          }else{
            return this.$swal({
              title: "Sorry",
              text: "The product is not available",
              icon: "warning",
              button: "Close"
            }).then(confirm => {
              if(!this.$router.back()){
                this.$router.push('/')
              }
            })
          }
        }
      } catch (error) {
        throw error
        return this.$swal({
          title: "Sorry",
          text: "The product is not available",
          icon: "warning",
          button: "Close"
        }).then(confirm => {
          if(!this.$router.back()){
            this.$router.push('/')
          }
        })
      }
    },

    generateProduct(product){
      let detail = product.data
      let group = generateGroupItem(detail.group_items)
      this.product = detail
      this.groupItem = group
      this.priceType = detail.price_type
      this.defaultBanner = detail.images[0]
      this.reInit()
    },

    async fetchRecomendation(){
      try {
        let get = await this.$axios.$get(`/v2/product/${this.$route.params.id}/recomendation`)
        if(get.status){
          this.productRecomendation = get.data
        }
      } catch (error) {
        throw error 
      }
    },

    next() {
      $('.product-list-type').removeClass('active')
      $('.item-slide').removeClass('is-selected')
      this.$refs.slick.next()
    },
 
    prev() {
      $('.product-list-type').removeClass('active')
      $('.item-slide').removeClass('is-selected')
      this.$refs.slick.prev()
    },

    reInit() {
      if (this.$refs.slick) {
        this.$refs.slick.create(this.slickOptions)
      }
    },

    pressItem(item, index, event){
      this.singleBanner = true
      this.defaultBanner = item[0].image == '' ? this.product.images[0] : item[0].image
      let res = item.map(x=>{
        x.parentIndex = index
        return x
      })
      this.child = res
    },

    generateFirstChild(){
      if(this.groupItem.length){
        let item = this.groupItem[0]
        let res = item.map(x=>{
          x.parentIndex = 0
          return x
        })
        this.child = res
      }
          
    },

    closeListType(){
      $('.item-slide').removeClass('is-selected')
      $('.tr-hidden').removeClass('tr-show')
      $('.product-list-type').removeClass('active')
    },

    pressFreigth(status){
      this.freight = status
    },

    moreType(){
      if(this.toggleMore){
        this.toggleMore = false
        $('.tr-hidden').removeClass('tr-show')
      } else {
        this.toggleMore = true
        $('.tr-hidden').addClass('tr-show')
      }
    },

    // Minus
    decrement(params, index){
      let group = this.groupItem[params.parentIndex]
      let child = group
      if(child[index].quantity <= 0){
        return
      } else {
        child[index].quantity--
        this.$set(this.groupItem, params.parentIndex, child)
        this.multiQty--
        return this.calculatePrice(this.multiQty, this.groupItem)
      }
    },

    // plus
    increment(params, index){
      let group = this.groupItem[params.parentIndex]
      let child = group
      if(child[index].quantity < params.canBookCount){
        child[index].quantity++
        this.multiQty++
        this.$set(this.groupItem, params.parentIndex, child)
        return this.calculatePrice(this.multiQty, this.groupItem)
      }
    },

    changeQuantity(params, index, event){
      let group = this.groupItem[params.parentIndex]
      let child = group
      if(child[index].quantity <= 0 || child[index].quantity === ''){
        child[index].quantity = 0
      } else {
        child[index].quantity = parseInt(child[index].quantity)
      }
      this.$set(this.groupItem, params.parentIndex, child)
      let quantity = 0
      this.groupItem.map(x => {
        x.map(e=>{
          if(e.quantity !== 'undefined'){
            quantity = quantity + parseInt(e.quantity)
          }
        })
      })
      this.multiQty = quantity
      this.calculatePrice(quantity)
    },

    calculatePrice(quantity, other = null){
      let price = 0
      if(this.product.price_type == 'RANGE'){
        price = calculatePriceRange(quantity, this.product.price_multi)
      } else if(this.product.price_type === 'OTHERS'){
        price = calculatePriceOthers(quantity, this.groupItem)
      } else if(this.product.price_type === 'FIX'){
        price = calculatePriceFix(quantity, this.product.price)
      }
      this.productPrice = price
      // this.handlingFee = this.productPrice * this.packageType / 100
      this.totalPrice = this.productPrice + this.handlingFee
    },

    incrementSingle(){
      this.qty < 1 ? this.qty = 0 : this.qty--
      this.calculatePrice(this.qty)
    },

    decrementSingle(){
      this.qty++
      this.calculatePrice(this.qty)
    },

    changeQtySingle(event){
      this.qty < 1 ? this.qty = 0 : this.qty = parseInt(this.qty)
      this.calculatePrice(this.qty)
    },

    isNumber:(event) =>  cekNumber(event),

    async addWishlist(){
      try {
        this.$store.dispatch('setLoading', true)
        if(!this.$store.state.auth.token) return this.$router.push('/login') 
        let wishlist = await this.$axios.$post('/v2/wishlist', {product:this.product.product_id})
        if(wishlist.status){
          let wishlist = this.wishlist
          wishlist.push({product_id:this.product.product_id})
          this.$store.commit('setWhislist', wishlist)
          this.$store.dispatch('setLoading', false)
          return this.$swal({
            title: "Success",
            text: "Product has been added to wishlist",
            icon: "success",
            button: "Close"
          })
        } else{
          return this.$swal({
            title: "Error!",
            text: "Server error, please tyr again later",
            icon: "warning",
          })
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        return this.$swal({
          title: "Error!",
          text: "Server error, please tyr again later",
          icon: "warning",
        })
      }
    },

    async addToCart(){
      if(!this.$store.state.auth.token) return this.$router.push('/login') 

      let data = null
      if(this.priceType === 'RANGE'){
        // condition for product multi price and single item
        if(this.qty >= this.product.moq){
          data = {
            price_type:this.priceType,
            note:this.productNote,
            note_ori:"Note for Product Not Items",
            quantity:this.qty,
            product_id:this.product.product_id,
            "price-total":this.totalPrice,
            freight:this.freight ? 'air' : 'sea',
            is_parse:0,
            is_multiple_price:0
          }
        }

        // condition for product multi and group items
        if(this.multiQty >= this.product.moq){
          let specId = []
          let note = ''
          let noteOri = ''
          this.groupItem.map(x => {
            x.map(e => {
              if(e.quantity > 0 && e.quantity !== undefined){
                specId.push({
                  quantity : e.quantity,
                  specId : e.specId
                })
                note += e.title + ',',
                noteOri += e.titleOri + ','
              }
            })
          })
          data = {
            specIds:specId,
            note: note.substr(0, note.length - 1),
            note_ori: noteOri.substr(0, noteOri.length - 1),
            quantity: this.multiQty,
            "price-total": this.totalPrice,
            freight: this.freight,
            is_parse: 0,
            is_multiple_price: 0,
            price_multiple_desc: 0,
            product_id: this.product.product_id,
          }
        }
      }
      else if(this.priceType === 'OTHERS'){
        if(this.multiQty >= this.product.moq){
          let specId = []
          let note = ''
          let noteOri = ''
          let specIdDesc = []
          this.groupItem.map(x => {
            x.map(e => {
              if(e.quantity > 0 && e.quantity !== undefined){
                specId.push({
                  quantity : e.quantity,
                  specId : e.specId
                })
                specIdDesc.push({
                  id: e.skuId,
                  qty:e.quantity
                })
                note += e.title + ',',
                noteOri += e.titleOri + ','
              }
            })
          })
                    
          data = {
            specIds:specId,
            note: note.substr(0, note.length - 1),
            note_ori: noteOri.substr(0, noteOri.length - 1),
            quantity: this.multiQty,
            "price-total": this.totalPrice,
            freight: this.freight,
            is_parse: 0,
            is_multiple_price: 1,
            price_multiple_desc: specIdDesc,
            product_id: this.product.product_id,
          }
        }
      }

      else if(this.priceType === 'FIX'){
        if(this.qty >= this.product.moq){
          data = {
            price_type:this.priceType,
            note:this.productNote,
            note_ori:this.productNote,
            quantity:this.qty,
            product_id:this.product.product_id,
            "price-total":this.totalPrice,
            freight:this.freight ? 'air' : 'sea',
            is_parse:0,
            is_multiple_price:0
          }
        }
      }

      if(data !== null) {
        let post = await this.postCart(data)
        if(!post.status) {
          this.$swal({
            title: "WARNING!",
            text: post.message,
            icon: "warning",
          })

          return setTimeout(()=>{
            this.$router.push('/')
          }, 1000)
        }
                
        let cart = this.cartX
        let m = {
          title : this.product.title,
          image : this.product.images[0],
          product_id : this.product.product_id
        }
        cart = cart.concat(m)
        this.$store.dispatch('setCart', cart)
        return this.$swal({
          title: "Success",
          text: "Produk telah ditambahkan ke keranjang",
          icon: "success",
          buttons: {
            cancel: "Lanjut Belanja",
            catch: {
              text: "Bayar Sekarang",
              value: "catch",
            },
          },
        }).then((arg) => {
          if(arg =='catch') return this.$router.push('/cart/formshipment')
          return this.$router.back()
        })
      }

      return this.$swal({
        title: "WARNING!",
        text: "Please insert quantity or type product",
        icon: "warning",
      })
    },


    async postCart(params){
      try {
        this.$store.dispatch('setLoading', true)
        let post = await this.$axios.$post('/v2/cart', JSON.stringify(params))
        this.$store.dispatch('setLoading', false)
        return post
      } catch (error) {
        throw error
      }
    }
  }
}
</script>

<style lang="scss">

    .carousel-nav .slick-slide{
        margin-right: 3px;
        &:last-child{
            margin-right:0px;
        }
    }

    .slick-slide{
        max-height: 357px;
        overflow: hidden;
    }

    .list-slide .slick-slide{
        margin-right: 3px;
        &:last-child{
            margin-right:0px;
        }
    }

    .product-multi-item{
       .item{
            &-slide{
                position: relative;
                transition:all 0.2s;
                &:after{
                    content: " ";
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    background: rgba(0,0,0, 0.6);
                    transition: all 0.2s;
                }
            }
            &-margin{
                margin-right: 6px!important;
                &:last-child{
                    margin-right: 0px;
                }
            }
       }
        
        .is-selected{
            transform: scale(1.08);
            &:after{
                background: transparent;
            }
        }
    }

    .input-number{
        text-align: center;
        height: 33px;
    }

    .prev{
        left: -10px;
    }

    .next{
        right: 6px;
    }

    .single-qty{
        width: 150px;
    }
    .title-multi{
        font-size: 14px;
        letter-spacing: 1px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .tr-hidden{
        display: none;
    }

    .tr-show{
        display:table-row;
    }

    .table{
        margin: 0px
    }

    .nav-tabs li{
        letter-spacing: 1px;
    }
</style>