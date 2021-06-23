<template>
    <div class="row flash-slide">
        <div
            v-if="product.length > 0"
            class="product-flag"
        >
            <div
                v-for="(item, index) in product"
                :key="index"
                class="col-lg-3 col-flash-sale col-md-4 col-xs-6 col-xs-12"
            >
                <div class="product">
                    <div class="product-cover">
                        <nuxt-link :to="`/products/details/${item.product_id}`">
                            <img
                                :src="item.image"
                                alt=""
                                class="img-responsive"
                            >
                        </nuxt-link>
                    </div>
                    <Flash
                        v-if="type"
                        :date="item.time"
                    />
                    <div class="product-content">
                        <nuxt-link
                            :to="`/products/details/${item.product_id}`"
                            class="product-title"
                        >
                            {{ item.title }}
                        </nuxt-link>
                        <span class="product-price">
                            {{ $currencyType() + $formatNumber(item.price) }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-else
            class="product-flag bg-white"
        >
            <div
                v-for="n in 5"
                :key="n"
                class="col-lg-3 col-flash-sale col-md-4 col-xs-6 col-xs-12"
            >
                <productLoader />
            </div>
        </div>
    </div>
</template>

<script>
import Flash from '~/components/timer/flash.vue'
import productLoader from '~/components/contentLoader/productLoader'
export default {
    components:{
        Flash,
        productLoader
    },
    props:{
        product:{
            type:Array,
            default:() => []
        },
        type:{
            type:Boolean,
            default:false
        }
    }
}
</script>