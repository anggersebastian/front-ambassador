<template>
    <div
        v-if="product.length > 0"
        class="row"
    >
        <div class="col-lg-12">
            <div class="widget widget-block">
                <div class="widget-header">
                    <div class="row">
                        <div class="col-md-12 is-category">
                            <h3 class="widget-title">
                                <span>{{ title }}</span>
                            </h3>
                        </div>
                    </div>
                </div>
                <ul class="widget-body no-border">
                    <div class="row">
                        <div
                            v-for="(item, index) in product"
                            :key="index"
                            class="col-lg-3 col-flash-sale col-md-4 col-sm-6 col-xs-12"
                        >
                            <div class="product">
                                <div class="product-cover">
                                    <nuxt-link
                                        :to="`/products/details/${item.id}`"
                                        class="product-title"
                                    >
                                        <img
                                            :src="item.image"
                                            alt="Product Importir"
                                            class="img-responsive"
                                        />
                                    </nuxt-link>
                                </div>
                                <div class="product-content">
                                    <nuxt-link
                                        :to="`/products/details/${item.id}`"
                                        class="product-title"
                                    >
                                        {{ $maxString(item.title, 54) }}
                                    </nuxt-link>
                                    <span class="product-price">
                                        {{ item.price_unit + $formatNumber(item.prices) }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props : {
        title:{
            type:String,
            default:''
        },
        product:{
            type:Array,
            default:() => []
        }
    },

    data(){
        return{
            
        }
    }
}
</script>

<style lang="scss" scoped>
    .col-lg-12 {
        margin-top:2rem;
    }

    .widget{
        padding-top:0px;
        &-header{
            &:before{
                bottom: -10px;
            }
        }
    }
</style>