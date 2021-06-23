<template>
  <div
    id="form-order"
    class="container"
  >
    <div class="row">
      <div class="col-lg-8 col-lg-offset-2">
        <div class="card card-confirm">
          <div class="card-header">
            <h2>KONFIRMASI PEMBAYARAN</h2>
          </div>
          <div class="card-body">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form
                ref="form-order"
                @submit.prevent="handleSubmit(submitForm)"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="orderId"
                  rules="required"
                  tag="div"
                >
                  <div class="form-group">
                    <label
                      for="name"
                      class="control-label"
                    >
                      Order ID
                    </label>
                    <input
                      v-model="orderId"
                      type="text"
                      class="form-control"
                      placeholder="Order ID"
                    />
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="rekName"
                  rules="required"
                  tag="div"
                >
                  <div class="form-group">
                    <label
                      for="rekName"
                      class="control-label"
                    >
                      Atas Nama Rekening
                    </label>
                    <input
                      v-model="rekName"
                      type="text"
                      class="form-control"
                      placeholder="Pemilik Rekening"
                    />
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="transfer_to"
                  rules="required"
                  tag="div"
                >
                  <div class="form-group">
                    <label
                      for="transferTo"
                      class="control-label"
                    >
                      Transfer Ke
                    </label>
                    <select
                      v-model="transfer_to"
                      class="form-control"
                      style="font-size:13px;"
                    >
                      <option value="bca">
                        Rekening 5930847889 - PT EDRUS STRATEGY DIGITAL
                      </option>
                    </select>
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="transfer_date"
                  rules="required"
                  tag="div"
                >
                  <div class="form-group">
                    <label
                      for="name"
                      class="control-label"
                    >
                      Tanggal Transfer
                    </label>
                    <input
                      v-model="transfer_date"
                      type="date"
                      class="form-control"
                      placeholder="Tanggal Transfer"
                    />
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="formatPrice"
                  rules="required"
                  tag="div"
                >
                  <div class="form-group">
                    <label
                      for="name"
                      class="control-label"
                    >
                      Jumlah Transfer
                    </label>
                    <input
                      v-model="formatPrice"
                      type="text"
                      class="form-control"
                      placeholder="Jumlah Transfer"
                      @keypress="$checkNumber($event)"
                    />
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  name="struk"
                  rules="required"
                  tag="div"
                >
                  <div class="form-group">
                    <label
                      for="name"
                      class="control-label"
                    >
                      Bukti Transfer
                    </label>
                    <input
                      v-model="struk"
                      type="hidden"
                    />
                    <input
                      ref="struck"
                      type="file"
                      class="form-control"
                      style="padding-top:12px;"
                      @change="onSelect"
                    />
                    <span class="help-block">
                      {{ errors[0] }}
                    </span>
                  </div>
                </ValidationProvider>
                <div class="order-action">
                  <button class="btn btn-lg btn-danger btn-block">
                    SUBMIT
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
    <input
      id="cb"
      type="text"
      hidden
    />
  </div>
</template>
<script>
import { ValidationProvider,ValidationObserver } from "vee-validate"
export default {
  layout:'NoHeader',

  components:{
    ValidationProvider,
    ValidationObserver
  },

  head () {
    return {
      title: 'dropy.id Payment confirm',
      meta: [
        { hid: 'description', name: 'description', content: 'Payment confirm dropy.id' }
      ]
    }
  },

  data(){
    return{
      orderId:'',
      rekName:'',
      transfer_to:'bca',
      transfer_date: '',
      transfer_amount:0,
      struk:'',
      file:''
    }
  },

  computed:{
    formatPrice:{
      get(){
        return this.transfer_amount
      },
      set(newValue){
        newValue = newValue.replace(/^[, ]+|[, ]+$|[, ]+/g, "").trim()
        if (newValue.length  > 0) {
          return this.transfer_amount = newValue.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        } else {
          this.transfer_amount = newValue
        }
      }
    },
  },
        
  created(){
    this.tDate()
  },

  methods: {
    async submitForm(){
      this.$store.dispatch('setLoading', true)
      let formData = new FormData()
      let amount = this.transfer_amount.length > 0 ? this.transfer_amount.replace(',', '') : 0
      formData.append('order', this.orderId)
      formData.append('customer_account', this.rekName)
      formData.append('transfer_to', this.transfer_to)
      formData.append('transaction_date', this.transfer_date)
      formData.append('amount', amount)
      formData.append('struck', this.file)
      try {
        let confirm = await this.$axios.post(process.env.DROPY_BACKEND_URL+'/order/confirm', formData)
        confirm = confirm.data
        this.$store.dispatch('setLoading', false)
        if(confirm.status){
          this.$swal({
            title: "Sukses",
            text: "Bukti pembayaran anda telah kami terima, mohon menunggu, admin kami akan segera memproses pembayaran anda",
            icon: "success",
            buttons: true,
          }).then((resp) => {
            this.$store.dispatch('setLoading', false)

            return this.$router.push('/thanks?order='+this.orderId)
          })
        }
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    tDate(){
      let invoice = this.$route.query
      if(invoice.order) {
        this.orderId = invoice.order
      }
      var today = new Date()
      var dd = String(today.getDate()).padStart(2, '0')
      var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
      var yyyy = today.getFullYear()

      today = yyyy + '-' + mm + '-' + dd
      return this.transfer_date = today
    },

    onSelect(){
      const file = this.$refs.struck.files[0]
      this.struk = 'oke'
      this.file = file
    }
  },
}
</script>
<style lang="scss">
    .swal-text{
        text-align: center!important;
    }
</style>