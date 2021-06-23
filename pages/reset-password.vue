<template>
    <div
        id="section-auth"
        class="col-lg-12"
    >
        <div class="auth">
            <div class="auth-head">
                <img
                    :src="logo"
                    alt="Logo"
                    class="img-responsive"
                >
            </div>
            <div class="auth-title">
                <h1> {{ success ? 'Login with new password' : 'Silahkan masukkan password baru' }}</h1>

                <div
                    v-if="success"
                    class="alert alert-success"
                >
                    Password has been changed, please <nuxt-link to="/login">
                        <strong><u>login</u></strong>
                    </nuxt-link>
                </div>
                <form 
                    v-if="!success"
                    action="/login"
                    method="post"
                    @submit="resetPassword"
                >
                    <div class="form-group">
                        <input
                            v-model="password"
                            type="email"
                            class="form-control"
                            placeholder="New password"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <input
                            v-model="password_confrimation"
                            type="email"
                            class="form-control"
                            placeholder="Password confirmation"
                            required
                        >
                    </div>
                    <div class="form-group">
                        <button
                            class="btn btn-block btn-info"
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
                <div
                    v-if="!success"
                    class="form-group"
                >
                    <span>Atau</span>
                    <nuxt-link
                        to="/login"
                        class="auth-register"
                    >
                        login
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import logo from '../assets/images/logo-blue.png'
export default {
    middleware: 'auth',

    layout: 'auth',

    data(){
        return {
            password : "",
            password_confrimation:"",
            logo:logo,
            error:null,
            success:false
        }
    },

    computed:{
        ...mapGetters({
            token : 'auth/token',
        })
    },

    created(){
        this.validateEmailAndToken()
    },  

    methods:{
        async resetPassword(e){
            e.preventDefault()
            if(this.password == '' || this.password_confrimation == '') return
            if(this.password != this.password_confrimation) return
            if(this.$route.query.email == '') return
            let email = this.$route.query.email
            try {
                let changed = await this.$axios.$put('/v2/reset-password', {
                    password:this.password,
                    password_confirmation:this.password_confrimation,
                    email:email
                })

                if(changed.status){
                    this.success = true
                    this.password == ''
                    this.password_confrimation == ''
                }
            } catch (error) {
                
            }
        },

        async validateEmailAndToken(){
            let token = this.$route.query.token
            let email = this.$route.query.email
            if(!token && !email) return this.$router.push('/login')

            try {
                let check = await this.$axios.$get(`/v2/auth/check-token?token=${token}&email="${email}`)
                if(!check.status) return this.$router.push('/login')
            } catch (error) {
                throw error
            }
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
        &-head{
            width: 200px;
            margin: auto;
            margin-top: 2rem;
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
            color: #99ab1d;
        }

        span{
            display: block;
            text-align: center;
        }

        &-register{
            display: block;
            text-align: center;
            color: #99ab1d;
            transition: color 0.2s;
            &:hover{
                color: #5c5cb5;
            }
        }
    }

    .form-control{
        padding: 20px 12px;
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