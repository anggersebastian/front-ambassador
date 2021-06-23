<template>
    <div
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
                        Payment Type
                    </h4>
                </div>
                <div class="modal-body">
                    <ul class="payment">
                        <li
                            class="payment-item manual"
                            @click="payment('paypal')"
                        >
                            PayPal
                        </li>
                        <li
                            class="payment-item manual"
                            @click="payment('online')"
                        >
                            Online Payment
                        </li>
                        <!-- <li
                            class="payment-item manual"
                            @click="payment('manual')"
                        >
                            Manual Payment
                        </li> -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props:{
        payment:{
            type:Function,
            default(){
                return false
            }
        }
    }
    
}
</script>

<style lang="scss">
    .payment{
        padding: 0;
        margin: 0;

        &-item{
            border:1px solid rgb(11, 189, 135);
            margin-bottom: 1rem;
            padding:1rem 5px;
            text-align: center;
            cursor:pointer;
            background: transparent;
            color: #0d7656;
            letter-spacing: 1px;
            &.paypal{
                background: rgb(2,0,36);
                background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,214,0,1) 0%, rgba(125,235,30,1) 0%, rgba(0,55,131,1) 0%, rgba(0,223,255,1) 100%, rgba(255,214,0,1) 100%);
                color: #fff;
            }
        }
    }
</style>