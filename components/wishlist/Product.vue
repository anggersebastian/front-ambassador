<template>
    <div class="col-lg-12">
        <div class="widget widget-block">
            <div
                id="rts-scroll"
                class="widget-body no-border"
            >
                <div
                    v-if="!loader"
                    class="row"
                >
                    <div
                        v-if="product != null && product.length > 0"
                        class="block-product"
                    >
                        <div
                            v-for="(listP, index) in product"
                            :key="index"
                            class="col-lg-3 col-flash-sale col-sm-4 col-xs-6"
                        >
                            <div class="product">
                                <div class="product-cover">
                                    <nuxt-link :to="`/products/details/${listP.product_id}`">
                                        <img
                                            :src="listP.image"
                                            alt=""
                                            class="img-responsive"
                                        />
                                    </nuxt-link>
                                </div>
                                        
                                <div class="product-content">
                                    <nuxt-link
                                        class="product-title"
                                        :to="localePath({path:`/products/details/${listP.product_id}`})"
                                        :title="listP.title"
                                    >
                                        {{ $maxString(listP.title, 54) }}
                                    </nuxt-link>
                                    <span class="product-price">
                                        {{ $currencyType() + $formatNumber(listP.price) }}
                                    </span>
                                </div>
                                <div class="wishlist-action">
                                    <button
                                        class="btn btn-xs btn-danger"
                                        title="Delete"
                                        @click="deleted(listP, index)"
                                    >
                                        <i class="fa fa-trash" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        v-else
                        class="block-product"
                    >
                        <nullData title="Product Not found" />
                    </div>
                </div>
                <div
                    v-else
                    class="row"
                >
                    <div
                        v-for="n in 5"
                        :key="n"
                        class="col-lg-3 col-flash-sale col-sm-4 col-xs-6 bg-white"
                    >
                        <productLoader />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import productLoader from '~/components/contentLoader/productLoader'
import nullData from '~/components/error/nullData.vue'

export default {

    components:{
        productLoader,
        nullData
    },
    props:{
        product:{
            type:Array,
            default:()=> {
                
                return {
                    category:{},
                    product:[],
                }
            }
        },
        loader:{
            type:Boolean,
            default:true
        },

        deleted:{
            type:Function,
            default(){
                return true
            }
        }
    },
}
</script>
<style lang="scss">
    .wishlist-action{
        padding: 7px;
        display: flex;
        justify-content: center;
        position: absolute;
        top: 13px;
        right: 6px;
    }
</style>