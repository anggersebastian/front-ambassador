<template>
  <div
    id="section-auth"
    class="col-lg-12"
  >
    <div class="auth">
      <div class="auth-head">
        <h1>IMPORTIR NETWORK</h1>
      </div>
      <div class="auth-title">
        <p>{{ title }}</p>
        <a
          v-if="!isRegister"
          href="javascript:;"
          @click="toggle"
        >
          <i
            class="fa fa-chevron-left"
            aria-hidden="true"
          /> Back
        </a>
        <div :class="error.length > 0 ? 'alert alert-danger':'hide'">
          <a
            href="javascript:;"
            class="close"
            @click="close"
          >
            &times;
          </a>
          <p
            v-for="(err, index) in error"
            :key="index"
          >
            * {{ err }}
          </p>
        </div>
      </div>
      <form
        method="post"
      >
        <div
          v-show="isRegister"
          class="register"
        >
          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Email"
            />
          </div>
          <div class="form-group">
            <input
              v-model="name"
              type="text"
              class="form-control"
              placeholder="Name"
            />
          </div>
          <div class="form-group">
            <input
              v-model="phone"
              type="text"
              class="form-control"
              placeholder="Phone"
            />
          </div>
          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Password"
            />
          </div>
          <div class="form-group">
            <input
              v-model="password_confirm"
              type="password"
              class="form-control"
              placeholder="Password confirmation"
            />
          </div>
          <!-- <div class="form-group">
                        <select
                            v-model="packages"
                            class="form-control"
                        >
                            <option value="">
                                Pilih paket
                            </option>
                            <option
                                v-for="(item, index) in arrPackage"
                                :key="index"
                                :value="item.name"
                            >
                                {{ item. name }}
                            </option>
                        </select>
                    </div> -->
          <!-- <div class="form-group">
                        <select
                            v-model="country"
                            class="form-control"
                        >
                            <option value="">
                                Pilih Negara
                            </option>
                            <option value="id">
                                Indonesia
                            </option>
                            <option value="ph">
                                Philipina
                            </option>
                        </select>
                    </div> -->
          <div class="form-group">
            <select
              v-model="city"
              class="form-control"
            >
              <option value="">
                Pilih Provinsi
              </option>
              <option
                v-for="(item, index) in arrCity"
                :key="index"
                :value="item.province"
              >
                {{ item.province }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <button
              class="btn btn-block bg-yellow"
              type="button"
              @click="postRegister"
            >
              Submit
            </button>
          </div>
          <div class="form-group">
            <span>Atau</span>
            <nuxt-link
              to="/login"
              class="auth-register"
            >
              Login
            </nuxt-link>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import logo from '../assets/images/logo-blue.png'
export default {
  middleware: 'auth',

  layout: 'auth',

  data(){
    return{
      isRegister:true,
      title : 'Daftar akun baru sekarang',
      arrPackage:[],
      arrCity:[],
      // register state
      email:'',
      name:'',
      phone:'',
      password:'',
      password_confirm:'',
      packages:'Gold',
      country:'id',
      city:'',

      // error
      error:[],
      logo:logo
    }
  },

  watch:{
    country(newValue){
      if(newValue != ''){
        this.fetchCity()
      }
    }
  },

  mounted(){
    // this.fetchPackage()
    this.fetchCity()
  },

  methods:{
    toggle(){
      this.isRegister ? this.isRegister = false : this.isRegister = true
      this.isRegister ? this.title = 'Daftar akun baru sekarang' : this.title = 'Pilih Paket'
    },

    async fetchPackage(){

      try {
        let arr = await this.$axios.$get('/v2/membership-package/list-package')
        if(arr.status){
          this.arrPackage = arr.data
        }
      } catch (error) {
        throw error
      }
            
    },

    async fetchCity(){
      try {
        let city = await this.$axios.$get(`/v2/address/province/country/${this.country}`)
        if(city.status) return this.arrCity = city.data
      } catch (error) {
        throw error
      }
    },

    async postRegister(e){
      e.preventDefault()
      let error = this.validateForm()
      if(error.length > 0){
        return
      }
      try {
        let body = {
          name:this.name,
          email:this.email,
          phone:this.phone,
          package_name:this.packages,
          country:this.country,
          city:this.city,
          password:this.password,
          password_confirmation:this.password_confirm,
          term_condition:1,
          code:''
        }
        this.$store.dispatch('setLoading', true)
        let register = await this.$axios.$post('/v2/auth/register', body)
        if(register.status){
          this.$store.dispatch('auth/loginByRegister', {
            token:register.data.user_token,
            name:register.data.user.name,
            country:register.data.user.country_code
          })
          window.location.href = '/'
        }else{
          this.$store.dispatch('setLoading', false)

          this.error.push(register.data)
        }
                
      } catch (error) {
        this.$store.dispatch('setLoading', false)
        throw error
      }
    },

    validateForm(){
      this.error = []
      if(this.name == ''){
        this.error.push('Name is required')
      }
      if(this.email == ''){
        this.error.push('Email is required')
      }
      if(this.phone == ''){
        this.error.push('Phone is required')
      }
      if(this.package_name == ''){
        this.error.push('Package is required')
      }
      if(this.country ==''){
        this.error.push('Country is required')
      }
      if(this.city == ''){
        this.error.push('City is required')
      }
      if(this.password == ''){
        this.error.push('Password is required')
      }
      if(this.password_confirm == ''){
        this.error.push('Password confirm is required')
      }
      if(this.password_confirm != this.password){
        this.error.push('Password and password confirmation not match')
      }
      if(this.term_condition){
        this.error.push('Term and condition is required')
      }
      return this.error
    },

    close(){
      this.error = []
    }
  }
}
</script>
<style lang="scss" scoped>
    $colorPrimary : #40403e;
    #section-auth{
        margin-top: 5rem;
    }

    .auth{
        width: 500px;
        margin: auto;
        &-head{
          margin: auto;
          margin-top: 2rem;
          text-align: center;
          h1{
            font-size: 20px;
            font-weight: bold;
          }
            
        }

        &-main{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        &-title{
            margin: 3rem 0px;
            text-align: center;
            position: relative;
            h1{
                font-size: 16px;
                margin: 15px 0px;
            }

            >a{
                position: absolute;
                left:0;
                top:0;
                font-size: 12px; 
                color: $colorPrimary;
            }
        }

        &-missing-password{
            color: $colorPrimary;
        }

        span{
            display: block;
            text-align: center;
        }

        &-register{
            display: block;
            text-align: center;
            color: $colorPrimary;
            transition: color 0.2s;
            &:hover{
                color: #5c5cb5;
            }
        }
    }

    .form-control{
        padding: 20px 12px;
    }

    select.form-control{
        height: 42px;
        padding:6px 12px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    @media screen and (max-width: 520px) {
        .auth{
            width: 400px;
        }
    }

    @media screen and (max-width:436px) {
        .auth{
            width: 95%;
        }
    }
</style>