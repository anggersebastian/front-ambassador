<template>
  <div
    id="bill-detail"
    class="container"
  >
    <div
      v-if="detailBill != null"
      class="row"
    >
      <div
        class="col-lg-8 col-lg-offset-2"
        style="margin-top:5px;"
      >
        <div class="shipment">
          <ul class="shipment-content">
            <li
              class="shipment-body bg-white"
            >
              <h1 class="shipment-list-title">
                Detail Pesanan
              </h1>
              <div
                v-for="(order, oI) in detailOrder"
                :key="oI"
                class="shipment-body-product"
              >
                <div class="shipment-thumbnail">
                  <img
                    :src="order.image"
                    class="img-responsive"
                    style="border:1px solid #ddd;"
                  />
                </div>
                <div
                  class="shipment-body-title"
                >
                  <span>
                    {{ order.title }}
                  </span>
                  <p class="shipment-body-info">
                    Jumlah : {{ order.quantity }} <br />
                    <span
                      v-for="(item, index) in order.bill"
                      :key="index"
                    >
                      {{ item.title == 'Delivery Fee' ? 'Ongkos Kirim' : item.title }} : {{ $currencyType() + $formatNumber(item.amount) }} <br />
                    </span>
                  </p>
                </div>
              </div>
            </li>
            <li class="shipment-body bg-white">
              <h1 class="shipment-list-title">
                Alamat pengiriman
              </h1>
              <p
                v-if="activeAddress"
                class="bill-address-active"
              >
                <span class="text-capitalize">
                  <strong>{{ activeAddress.receiver_name }}</strong>
                </span><br /> 
                <i>
                  {{ activeAddress.phone }} <br /> 
                  {{ activeAddress.address }},
                  {{ activeAddress.raja_ongkir.subdistrict_name }},
                  {{ activeAddress.raja_ongkir.city }},
                  {{ activeAddress.raja_ongkir.province }}
                </i>
              </p>
            </li>

            <li
              v-if="paymentDump"
              class="shipment-body bg-white"
            >
              <h1 class="shipment-list-title">
                INFORMASI PEMBAYARAN
              </h1>
              <div class="shipment-body-payment">
                <p class="desc">
                  Silahkan segera lakukan pembayaran ke nomor rekening dibawah ini:
                </p>
                <p>
                  Bank Tujuan : {{ paymentDump.flag }}
                </p>
                <p>No Tagihan : <strong>{{ paymentDump.account_number }}</strong></p>
                <p>Total Belanja : <strong>{{ $currencyType() + $formatNumber(price) }}</strong></p>
                <p>Biaya Transfer : <strong>{{ $currencyType() + $formatNumber(4400) }}</strong></p>
                <p><strong>Total Tagihan : {{ $currencyType() + $formatNumber(paymentDump.gross_amount) }}</strong></p>
                <p class="text-info desc">
                  Lihat tutorial pembayaran disini : 
                  <a
                    :href="paymentDump.pdf_url"
                    target="_blank"
                    class="text-link"
                  >
                    <u>Tutorial pembayaran</u>
                  </a>
                </p>
              </div>
              <div
                v-if="isPaid"
                class="shipment-footer"
              >
                <div class="alert alert-success">
                  <strong>LUNAS</strong>
                </div>
              </div>
              <div
                v-else
                class="shipment-footer"
              >
                <button
                  class="btn btn-primary"
                  @click="onChangePayment()"
                >
                  Ganti metode pembayaran
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <PaymentModal 
      ref="listPayment"
      :payment="onPressPay"
    />
    <BottomTab
      v-if="!isPaid && !paymentDump"
      :pay="()=>getSnapToken()"
      :price="price"
    />
  </div>
</template>
<script>
import BottomTab from '~/components/BottomTab.vue'
import PaymentModal from '~/components/modal/PaymentModal.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'BillDetail',

  middleware: ['auth'],

  layout:'NoHeader',
    
  head () {
    return {
      title: 'Payment',
      // script: [
      //   { src: 'https://app.sandbox.midtrans.com/snap/snap.js', 'data-client-key':'SB-Mid-client-naVGaACr1fk3b117'},
      //   { innerHTML: "window.snap = snap", type: 'text/javascript'}
      // ],
      script: [
        { src: 'https://app.midtrans.com/snap/snap.js', 'data-client-key':process.env.MIDTRANS_CLIENT_KEY},
        { innerHTML: "window.snap = snap", type: 'text/javascript'}
      ]
    }
  },

  components:{
    BottomTab,
    PaymentModal
  },

  data(){
    return{
      item:4,
      snapToken:null,
      detailBill: null,
      detailOrder: null,
      price : 0,
      isPaid:true,
      activeAddress:null,
      paymentDump:null
    }
  },

  computed:{
    ...mapGetters({
      country:'auth/country',
    })
  },

  watch:{
    snapToken(newValue){
      if(newValue !== null){
        window.snap.pay(newValue, {
          onSuccess:(result)=>this.onSuccess(result),
          onPending:(result)=>this.onPending(result),
          onError:(result)=>this.onError(result),
          onClose:(result)=>this.onClose(result),
          selectedPaymentType:'bank_transfer',
          gopayMode:'auto'
        })
      }
    }
  },

  mounted(){
    this.getDetailBill()
  },


  methods:{

    ...mapActions({
      'setLoading' : 'setLoading',
    }),
        
    onPressPay(params){
      this.$store.dispatch('setLoading', true)
      switch (params) {
      case 'paypal':
        this.paypalRequest()
        break

      case 'manual':
        this.onPaymentPopUp(false)
        break

      case 'online':
        this.onPaymentPopUp(false)
        this.getSnapToken()
        break
                
      default:
        break
      }
    },

    onPaymentPopUp(status){
      let element = this.$refs.listPayment.$el
      if(status){
        $(element).modal('show')
      }else{
        $(element).modal('hide')
      }
    },

    // for midtrans
    async getSnapToken(){
      this.$store.dispatch('setLoading', true)
      let params = {
        invoice_id: 'BP'+this.$route.params.id,
        order_id: this.$route.params.id,
        type:"BILL_PRODUCT",
        origin:'dropy'
      }
      try {
        let token = await this.$axios.$post('/midtrans/snap-token?web=true', JSON.stringify(params))
        this.snapToken = token.token
        this.$store.dispatch('setLoading', false)
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    async paypalRequest(){
      try {
        let paypal = await this.$axios.$get(`/v2/paypal/checkout-product/${this.$route.params.id}?web=dropy`)
        this.$store.dispatch('setLoading', false)
        if(paypal.status){
          return window.location.href=paypal.data
        }else{
          return this.$swal({
            title: "Error!",
            text: "Paypal server busy, please try again later",
            icon: "danger",
            button: "Close"
          })
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    getDetailBill(){
      this.$store.dispatch('setLoading', true)
      this.$axios
        .$get(`/v2/bill/${this.$route.params.id}`)
        .then(response => {
          if(response.status){
            this.detailBill     = response.data
            this.detailOrder    = this.detailBill.order
            this.price = response.data.total
            this.isPaid = response.data.is_paid
            this.activeAddress = response.data.address.filter(x => x.is_default ==1)[0]
            this.paymentDump = response.data.payment
          }
          this.$store.dispatch('setLoading', false)
        })
        .catch(error => {
          this.$store.dispatch('setLoading', false)
          throw error
        })
    },

    onSuccess(params){
      window.location.reload(true)
    },

    async onPending(params){
      try {
        console.log(params, 'dkdk')
        let post = await this.$axios.$post(`/midtrans/save-info-bill/${this.$route.params.id}`, params)
        console.log(post, 'sksk')
      } catch (error) {
        throw error
      }
    },

    onError(params){
      window.location.reload(true)
    },

    onClose(params){
      window.location.reload(true)
    },

    onChangePayment(){
      this.$swal({
        title: "INFO?",
        text: "Apakah anda yakin ingin mengubah metode pembayaran?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((params) => {
        if (params) {
          this.getSnapToken()
        }
      })
    }
  }
}
</script>

<style lang="scss">
    .bill-address-active{
        padding: 10px;
        margin:0px;
    }
</style>