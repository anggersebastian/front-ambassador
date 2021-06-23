<template>
  <div
    id="product_id"
    class="container"
  >
    <div class="row">
      <div class="col-lg-6 col-lg-offset-3 col-sm-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            Profil
          </div>
          <div
            v-if="user"
            class="panel-body"
          >
            <div
              v-if="success != null"
              class="alert alert-success"
            >
              {{ success }}
            </div>
            <table
              class="table"
            >
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{{ user.name }}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <td>Phone</td>
                  <td>{{ user.phone }}</td>
                </tr>
              </tbody>
            </table>
                        
            <table class="table">
              <tbody>
                <tr>
                  <td>
                    <button
                      class="btn btn-info btn-sm"
                      @click="showModal()"
                    >
                      Change password
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ModalPassword 
      ref="passwordChange"
      :update-proces="updateProces"
    />
  </div>
</template>
<script>
import ModalPassword from '../components/modal/PasswordChangeModal'
export default {
  name:'Profile',
  middleware: ['auth'],
  components:{
    ModalPassword
  },
  data(){
    return{
      user:null,
      password:'',
      newPassword:'',
      confirmPassword:'',
      success:null
    }
  },

  mounted(){
    this.fetchUser()
  },

  methods:{
    async fetchUser(){
      try {
        let user = await this.$axios.$get('/v2/auth/profil')
        if(user.status){
          this.user = user.data
        }
      } catch (error) {
        throw error
      }
    },

    showModal(status = false){
      let modal = this.$refs.passwordChange.$el
      if(status) {
        return $(modal).modal('hide')
      }else{

        return $(modal).modal('show')
      }
    },

    async updateProces(params){
      try {
        if(params.newPassword != params.confirmPassword) return
        let post = await this.$axios.$put('/v2/auth/change-password', params)
        if(post.status){
          this.showModal(true)
          this.success = post.data
        }
      } catch (error) {
        throw error
      }
    }
  }
}
</script>
<style lang="scss">
    .table{
        tbody > tr > td{
            border:0px;
        }
    }
</style>