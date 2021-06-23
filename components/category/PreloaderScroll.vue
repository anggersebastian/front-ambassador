<template>
    <div
        v-show="show"
        class="scroll-loader col-lg-12"
    >
        <div
            style="width:100%;height:100%"
            class="lds-facebook"
        >
            <div />
            <div />
            <div />
        </div>
    </div>
</template>
<script>
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style lang="css">
    @keyframes lds-facebook_1 {
        0% {
            top: 52px;
            height: 96px;
        }
        50% {
            top: 70px;
            height: 60px;
        }
        100% {
            top: 70px;
            height: 60px;
        }
    }
    @-webkit-keyframes lds-facebook_1 {
        0% {
            top: 52px;
            height: 96px;
        }
        50% {
            top: 70px;
            height: 60px;
        }
        100% {
            top: 70px;
            height: 60px;
        }
    }
    @keyframes lds-facebook_2 {
        0% {
            top: 56.49999999999999px;
            height: 87.00000000000001px;
        }
        50% {
            top: 70px;
            height: 60px;
        }
        100% {
            top: 70px;
            height: 60px;
        }
    }
    @-webkit-keyframes lds-facebook_2 {
        0% {
            top: 56.49999999999999px;
            height: 87.00000000000001px;
        }
        50% {
            top: 70px;
            height: 60px;
        }
        100% {
            top: 70px;
            height: 60px;
        }
    }
    @keyframes lds-facebook_3 {
        0% {
            top: 61px;
            height: 78px;
        }
        50% {
            top: 70px;
            height: 60px;
        }
        100% {
            top: 70px;
            height: 60px;
        }
    }
    @-webkit-keyframes lds-facebook_3 {
    0% {
        top: 61px;
            height: 78px;
        }
        50% {
            top: 70px;
            height: 60px;
        }
        100% {
            top: 70px;
            height: 60px;
        }
    }

    .scroll-loader{
        display: flex;
        justify-content: center;
    }
    .lds-facebook {
        position: relative;
    }
    .lds-facebook div {
        position: absolute;
        width: 20px;
    }
    .lds-facebook div:nth-child(1) {
        left: 40px;
        background: #7582d1;
        -webkit-animation: lds-facebook_1 0.9s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation: lds-facebook_1 0.9s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        -webkit-animation-delay: -0.18s;
        animation-delay: -0.18s;
    }
    .lds-facebook div:nth-child(2) {
        left: 90px;
        background: #586cc3;
        -webkit-animation: lds-facebook_2 0.9s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation: lds-facebook_2 0.9s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        -webkit-animation-delay: -0.09s;
        animation-delay: -0.09s;
    }
    .lds-facebook div:nth-child(3) {
        left: 140px;
        background: #4d5bda;
        -webkit-animation: lds-facebook_3 0.9s cubic-bezier(0, 0.5, 0.5, 1) infinite;
        animation: lds-facebook_3 0.9s cubic-bezier(0, 0.5, 0.5, 1) infinite;
    }
    .lds-facebook {
        width: 90px !important;
        height: 90px !important;
        -webkit-transform: translate(-45px, -45px) scale(0.45) translate(45px, 45px);
        transform: translate(-45px, -45px) scale(0.45) translate(45px, 45px);
    }
</style>