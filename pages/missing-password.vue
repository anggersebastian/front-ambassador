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
                <h1>Silahkan masukkan email anda</h1>

                <div
                    v-if="error"
                    class="alert alert-danger"
                >
                    {{ error }}
                </div>
                <form 
                    action="/login"
                    method="post"
                    @submit="requestPassword"
                >
                    <div class="form-group">
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            placeholder="Email"
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
                <div class="form-group">
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
            email : "",
            logo:logo,
            error:null
        }
    },

    computed:{
        ...mapGetters({
            token : 'auth/token',
        })
    },

    methods:{
        async requestPassword(e){
            e.preventDefault()
            if(this.email == '') return
            try {
                let user = await this.$axios.$post('/v2/auth/request-password', {email:this.email})
                if(user.status){
                    this.$router.push('')
                } else{
                    this.error = user.data
                }
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