<template>
  <div
    class="container mt-11"
    style="height:70vh;"
  >
    <div
      v-if="order"
      class="col-lg-12"
    >
      <div class="panel panel-default">
        <div class="panel-heading">
          Pembayaran
        </div>
        <div class="panel-body">
          <h4 class="payment-title">
            Silahkan melakukan pembayaran ke nomor rekening dibawah ini:
          </h4>
          <ul class="payment">
            <li>
              Nomor Rekening BCA : 5930847889 - PT EDRUS STRATEGY DIGITAL
            </li>
            <li>
              Total Tagihan : Rp {{ $formatNumber(order.total_price) }}
            </li>
            <li>
              Nama Paket : {{ order.package_name }}
            </li>
            <li>
              Status : {{ order.paid_at ? 'LUNAS' : 'Menunggu Pembayaran' }}
            </li>
          </ul>
          <div
            v-if="order.payment_confirm_files"
            class="flex justify-center"
          >
            <p class="font-bold">
              TELAH DIKONFIRMASI
            </p>
          </div>
          <div class="flex justify-center">
            <button
              class="btn btn-danger"
              @click="onShowModalConfirm()"
            >
              {{ order.payment_confirm_files ? 'Konfirmasi Ulang' : 'Konfirmasi Pembayaran' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <PaymentConfrim
      ref="paymentConfirmModal"
      :invoice="order"
      @onPostConfirm="onPostConfirm"
    />
  </div>
</template>
<script>
import PaymentConfrim from '../../components/modal/PaymentConfirmModal.vue'
export default {
  name:'InvoicePackage',
  middleware: ['auth'],

  components:{
    PaymentConfrim
  },
  data(){
    return{
      order:null
    }
  },

  created(){
    this.fetchOrder()
  },

  methods:{
    async fetchOrder(){
      try {
        const invoice = this.$route.params.invoice 
        if(!invoice) return this.$route.push('/')
        let order = await this.$axios.get(`/v2/package/${invoice}`)
        order = order.data
        if(order.status){
          this.order = order.data
        }
      } catch (error) {
        throw error
      }
    },

    onShowModalConfirm(hide = false){
      let element = this.$refs.paymentConfirmModal.$el
      if(status) return $(element).modal('hide')
      if(hide) return  $(element).modal('hide')
      $(element).modal('show')
    },
    
    onPostConfirm(val){
      this.order = val
      this.onShowModalConfirm(true)
    }
  }
}
</script>
<style lang="scss">
  .payment{
    padding: 0;
    text-align: center;
    &-title{
      text-align: center;
    }
    li{
      margin-bottom: 0.5rem;
    }
  }
</style>