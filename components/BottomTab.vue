<template>
    <section
        class="bottom"
    >
        <div class="container">
            <div class="row">
                <div class="col-lg-12 bottom-tab">
                    <div class="bottom-icon">
                        <img
                            src="https://stage.importir.com/asset/icon/manual_3.png"
                            class="img-responsive"
                            alt=""
                        />
                        <img
                            src="https://stage.importir.com/asset/icon/online_3.png"
                            class="img-responsive"
                            alt=""
                        />
                        <img
                            src="https://stage.importir.com/asset/icon/paypal_3.png"
                            class="img-responsive"
                            alt=""
                        />
                    </div>
                    <div class="bottom-action">
                        <h1>{{ $currencyType() + $formatNumber(price) }}</h1>
                        <div class="bottom-price">
                            <button
                                class="btn btn-lg btn-danger"
                                style="font-size:1em;"
                                @click="pay"
                            >
                                Bayar Sekarang
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props:{
        pay:{
            type:Function,
            default:()=>[]
        },

        price:{
            type:Number,
            default:''
        }
    }
}
</script>