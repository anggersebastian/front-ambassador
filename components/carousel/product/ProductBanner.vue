<template>
    <client-only>
        <slick-slide
            v-if="banner.length > 1 && singleBanner === false"
            ref="slick"
            :options="slickOptions"
            class="carousel"
        >
            <div
                v-for="(item, index) in banner"
                :key="index"
                class="carousel-item"
            >
                <img
                    :src="$generateBanner(item[0].image)"
                    alt="cover product"
                >
            </div>
        </slick-slide>
        <div
            v-else
            class="carousel"
        >
            <div
                class="carousel-item"
            >
                <img
                    :src="$generateBanner(bannerDefault)"
                    alt="cover product"
                >
            </div>
        </div>
    </client-only>
</template>
<script>
export default {
    props:{
        banner:{
            type:Array,
            default: function() {
                return []
            },
        },
        bannerDefault:{
            type:String,
            default:''
        },

        singleBanner:{
            type:Boolean,
            default(){
                return false
            }
        }
    },

    data(){
        return {
            slickOptions:{
                slidesToShow: 1,
                slidesToScroll: 1,
                // arrows: false,
                fade: true,
                prevArrow:
                    '<a href="javascript:;" class="slide-control prev"><i class="fa fa-angle-left"></i></a>',
                nextArrow:
                    '<a href="javascript:;" class="slide-control next"><i class="fa fa-angle-right"></i></a>'
            },
        }
    }
}
</script>