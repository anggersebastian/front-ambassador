<template>
  <div
    ref="packagePopup"
    class="modal fade"
    role="dialog"
  >
    <div class="modal-dialog modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="close"
            data-dismiss="modal"
          >
            &times;
          </button>
          <h4 class="modal-title">
            Konfirmasi pembayaran
          </h4>
        </div>
        <div class="modal-body">
          <form @submit.prevent="postConfirm">
            <div class="form-group">
              <label
                for="amount"
                class="control-label"
              >
                Jumlah :
              </label>
              <input
                v-model="amount"
                type="number"
                required
                class="form-control"
              />
            </div>

            <div class="form-group">
              <label
                for="date"
                class="control-label"
              >
                Tanggal Transfer :
              </label>
              <input
                v-model="date"
                type="date"
                required
                class="form-control"
                style="line-height:1.42857143;"
              />
            </div>

            <div class="form-group">
              <label
                for="from"
                class="control-label"
                required
              >
                Dari bank :
              </label>
              <select
                v-model="from"
                name="from"
                class="form-control"
                required
              >
                <option value="">
                  Pilih bank
                </option>
                <option value="bca">
                  BCA
                </option>
                <option value="bni">
                  BNI
                </option>
                <option value="bri">
                  BRI
                </option>
                <option value="mandiri">
                  Mandiri
                </option>
                <option value="permata">
                  Permata Bank
                </option>
                <option value="bank-mega">
                  Bank Mega
                </option>
                <option value="other-bank">
                  Other Bank
                </option>
              </select>
            </div>

            <div class="form-group">
              <label
                for="file"
                class="control-label"
              >
                Bukti pembayaran :
              </label>
              <input
                ref="confirmFile"
                type="file"
                @change="selectFile($event)"
              />
              <p class="mt-1 text-danger">
                <small>File size min: 2Mb</small>
              </p>
            </div>

            <div class="form-group">
              <button
                class="btn btn-danger"
                :disabled="!formValid"
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props:{
    invoice:{
      type:Object,
      default(){
        return null
      }
    }
  },
  data(){
    return{
      from:'',
      amount:'',
      file_confirm:null,
      date:''
    }
  },

  computed:{
    formValid(){
      return (this.from && this.amount && this.file_confirm && this.date)
    }
  },

  methods:{
    ...mapActions({
      'setLoading' : 'setLoading',
    }),
   

    selectFile(e){
      const files = e.target.files || e.dataTransfer.files
      const  fileType = files[0]['type']
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png']
      const input = this.$refs.confirmFile
      if(!validImageTypes.includes(fileType)) {
        input.type = 'text'
        input.type = 'file'
        return this.$swal({
          title: "WARNING!",
          text: "Format file salah",
          icon: "warning",
        })
      }
      this.file_confirm = files[0]
    },

    async postConfirm(){
      let formData = new FormData()
      formData.append('from', this.from)
      formData.append('amount', this.amount)
      formData.append('date', this.date)
      formData.append('file_confirm', this.file_confirm)

      try {
        this.setLoading(true)
        let post = await this.$axios.post(`/v2/package/${this.invoice.invoice}/confirm`, formData)
        this.setLoading(false)
        
        post = post.data
        if(post.status){
          return this.$emit('onPostConfirm', post.data)
        }
        return this.$swal({
          title: "WARNING!",
          text: post.data,
          icon: "warning",
        })
      } catch (error) {
        this.setLoading(false)

        return this.$swal({
          title: "WARNING!",
          text: error.message,
          icon: "warning",
        })
        throw error
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .moda-content{
        background-color:#ece9e5;;
    }
    .modal-body{
        padding-bottom: 0px;
    }

    .address{
        max-height: 350px;
        overflow: scroll;
    }

    .package{
        padding: 0;
        .title{
            font-size: 18px;
            font-weight: bold;
        }

        .right{
            padding: 1rem 0.5rem;
            width: 70%;
        }

        .left{
            padding: 1rem 0.5rem;
            width: 25%;
            background: #ffd600;
        }

        li{
            border:1px solid #ddd;
            margin-bottom: 1.5rem;
        }

    }
</style>