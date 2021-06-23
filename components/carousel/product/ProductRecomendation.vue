<template>
    <div
        v-if="product.length > 4"
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
                        <slick-slide
                            ref="slick"
                            :options="slickOptions"
                            class="product-flag"
                        >
                            <div
                                v-for="(item, index) in product"
                                :key="index"
                                class="col-md-3 col-flash-sale col-sm-4 col-xs-6"
                            >
                                <div class="product">
                                    <div class="product-cover">
                                        <nuxt-link :to="`/products/details/${item.id}`">
                                            <img
                                                :src="item.image"
                                                alt="Product Importir"
                                                class="img-responsive"
                                            />
                                        </nuxt-link>
                                    </div>
                                    <div class="product-content">
                                        <nuxt-link
                                            :to="`/products/details/${item.product_id}`"
                                            class="product-title"
                                        >
                                            {{ $maxString(item.title, 54) }}
                                        </nuxt-link>
                                        <span class="product-price">
                                            {{ item.price_unit + $formatNumber(item.price) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </slick-slide>
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
            slickOptions:{
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite:false,
                autoplay: true,
                prevArrow:'<a href="javascript:;" class="slide-control prev"><i class="fa fa-angle-left"></i></a>',
                nextArrow:'<a href="javascript:;" class="slide-control next"><i class="fa fa-angle-right"></i></a>',
                responsive: [
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 660,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    }
                ]
            },
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
            h3{
                &:before{
                    bottom: -10px;
                }
            }
        }
    }
</style>