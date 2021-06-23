<template>
    <div
        v-if="product.length > 0"
        class="slide"
    >
        <slick-slide
            ref="slickBanner"
            :options="slickOptions"
        >
            <div
                v-for="(item, index) in product"
                :key="index"
                class="slide-item"
            >
                <img
                    :src="urlCloud + item.bg_image"
                    class="img-responsive"
                    alt="First slide"
                >
                <div class="slide-widget">
                    <div class="slide-thumbnail">
                        <img
                            :src="urlCloud + item.product_image"
                            class="img-responsive"
                        >
                        <div class="slide-link">
                            <h1 class="slide-title">
                                {{ item.tile }}
                            </h1>
                            <!-- <p>{{ item.description }}</p> -->
                            <!-- <a href="">
                                Get Now
                            </a> -->
                        </div>
                    </div>
                </div>
            </div>
        </slick-slide>
    </div>
</template>

<script>
export default {
    props:{
        product:{
            type:Array,
            default:()=> []
        }
    },

    data(){
        return {
            slickOptions:{
                autoplay: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                prevArrow:'<a href="javascript:;" class="slide-control prev"><i class="fa fa-angle-left"></i></a>',
                nextArrow:'<a href="javascript:;" class="slide-control next"><i class="fa fa-angle-right"></i></a>'
            }
        }
    },

    computed:{
        urlCloud(){
            return process.env.URL_CLOUD
        }
    },
}
</script>