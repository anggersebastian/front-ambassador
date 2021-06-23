<template>
    <div class="logo">
        <div class="logo-img">
            <img
                :src="logo"
                alt=""
            />
        </div>
        <div
            v-if="linkBack"
            class="logo-content mt-3"
        >
            <nuxt-link
                :to="linkBack"
                class="btn btn-primary btn-lg"
            >
                Kembali Kehalaman Order
            </nuxt-link>
        </div>
    </div>
</template>
<script>
import logo from '../static/logo-home.png'
import Cookies from 'js-cookie'

export default {
    data(){
        return{
            logo:logo,
            linkBack:''
        }
    },

    created(){
        this.onBack()
    },

    methods:{
        onBack(){
            let getCookies = Cookies.get('product')
            if(getCookies){
                Cookies.remove('product')
                return this.linkBack =  `form-order?product=${getCookies}`
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .logo{
        min-height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        align-content: center;
        &-img{
            max-width: 350px;
            display: block;
            img{
                max-width: 100%;
            }
        }
        &-content{
            .btn{
                font-size: 13px;
                font-weight: bold;
                &-primary{
                    background: transparent;
                    color: #000;
                    border-color: #17a2b8;
                    &:hover, &:active{
                        background: #0098da;
                        color: #f8f9fa
                    }
                }
            }
        }
    }
</style>