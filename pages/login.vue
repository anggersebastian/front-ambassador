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
        <p>Silahkan masuk dengan akun anda</p>
        <div
          v-if="error !== null"
          class="alert alert-danger"
        >
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">
              &times;
            </span>
          </button>
          <strong>Warning</strong> Password or email is wrong
        </div>
      </div>
      <form 
        action="/login"
        method="post"
        @submit="presLogin"
      >
        <div class="form-group">
          <input
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input

            v-model="password"
            type="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-group auth-main">
          <div class="auth-missing-password">
            <nuxt-link
              to="/missing-password"
            >
              Lupa password?
            </nuxt-link>
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-block bg-yellow"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div class="form-group login-footer">
        <nuxt-link
          to="/"
          class="auth-register"
        >
          <i class="fa fa-arrow-left" /> Home
        </nuxt-link>
        <nuxt-link
          to="/register"
          class="auth-register"
        >
          Register <i class="fa fa-arrow-right" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import logo from '../assets/images/logo-blue.png'
export default {
  name:'Login',
    
  middleware: 'auth',

  layout: 'auth',

  data(){
    return {
      email : "",
      password : "",
      logo:logo
    }
  },

  computed:{
    ...mapGetters({
      token : 'auth/token',
      error : 'auth/error'
    })
  },

  watch:{
    token(newValue, oldValue){
      if(newValue !== null || newValue !== 'null'){
        this.$store.dispatch('setLoading', false)
        this.$store.dispatch('getCart')
        this.$store.dispatch('getWishlist')
        this.$router.push('/')
      }
    },

    error(){
      this.$store.dispatch('setLoading', false)
    }
  },

  methods:{
    presLogin(e){
      e.preventDefault()
      this.$store.dispatch('setLoading', true)
      if(this.email == '' || this.password == '') return
      this.$store.dispatch('auth/LOGIN', {email:this.email, password:this.password, web:true})
      
    }
  }
}
</script>
<style lang="scss" scoped>
    #section-auth{
        margin-top: 7rem;
    }

    .auth{
        width: 500px;
        margin: auto;
        position: relative;
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

            h1{
                font-size: 16px;
                margin: 15px 0px;
            }
        }

        &-missing-password{
            color: #40403e;
        }

        span{
            display: block;
            text-align: center;
        }

        &-register{
            display: block;
            text-align: center;
            color: #40403e;
            transition: color 0.2s;
            &:hover{
                color: #5c5cb5;
            }
        }
    }

    .form-control{
        padding: 20px 12px;
    }

    .login-footer{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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