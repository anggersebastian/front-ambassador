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
            JOIN MEMBERSHIP
          </h4>
        </div>
        <div class="modal-body">
          <ul class="package">
            <li
              v-for="(item,index) in package"
              :key="index"
              class="flex justify-between"
            >
              <div class="flex left justify-center">
                <div class="flex flex-column justify-center">
                  <span class="title">
                    {{ item.name }}
                  </span>
                  <span class="price">
                    {{ item.price }}
                  </span>
                </div>
              </div>
              <div class="flex right flex-column">
                <p>{{ item.title }}</p>
                <div v-show="item.name !== 'Basic'">
                  <button
                    class="btn btn-default btn-primary"
                    @click="onOrder(item)"
                  >
                    JOIN
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data(){
    return{
      package:[
        // {
        //   name:'Basic',
        //   price:'Free',
        //   title:'97.5% Biaya Ongkir dari china ke indonesia dan Beacukai dari harga total belanja'
        // },
        {
          name:'Affliate',
          price:'Rp 350.000',
          title:'Penghasilan tambahan hanya dengan rebahan, JOIN sekarang'
        },
        {
          name:'Dropship',
          price:'Rp 500.000',
          title:'Mau bisnis online tapi tidak punya produk? JOIN Sekarang'
        }
        // {
        //   name:'Offline',
        //   price:'Rp 1.000.000',
        //   title:'47.5% Biaya Ongkir dari china ke indonesia dan Beacukai dari harga total belanja'
        // }
      ]
    }
  },

  computed:{
    ...mapGetters({
      activePackage:'auth/package',
      token:'auth/token',
    })
  },

  mounted(){
    this.initModal()
  },

  methods:{
    ...mapActions({
      'setLoading' : 'setLoading',
      'setPackage' : 'auth/SET_PACKAGE'
    }),
    async onOrder(val){
      this.setLoading(true)
      try {
        this.initModal(true)
        let order = await this.$axios.post(`/v2/package/${val.name}`)
        order = order.data
        this.setLoading(false)
        if(order.status){
          return this.$router.push(`/payment/${order.data.invoice}`)
        }
      } catch (error) {
        this.setLoading(false)
        console.log(error.message, 'sksk')
      }
    },

    async fetchPackageActive(){
      try {
        if(this.activePackage !== 'BASIC') return
        let active = await this.$axios.get('/v2/package/user-active')
        active = active.data
        if(active.status){
          if(active.data){
            if(active.data.package_name !== this.activePackage){
              this.setPackage(active.data.package_name)
            }
          }
        }
      } catch (error) {
        throw error
      }
    },

    async initModal(status = false){
      let s = await this.fetchPackageActive()
      if(this.token){
        if(this.activePackage == '' || this.activePackage == 'Basic'){
          let el = this.$refs.packagePopup
          if(status){
            return $(el).modal('hide')
          }
          $(el).modal('show')
        }
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