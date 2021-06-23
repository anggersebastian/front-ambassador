<template>
    <client-only>
        <slick-slide
            v-if="thumbnail.length > 1"
            ref="slick"
            :options="slickOptions"
            class="carousel-nav"
        >
            <div
                v-for="(item, index) in thumbnail"
                :key="index"
                class="carousel-nav-item"
            >
                <img
                    :src="$generateBanner(item[0].image)"
                    alt="thumbnail"
                >
            </div>
        </slick-slide>
    </client-only>
</template>
<script>
export default {
    props:{
        thumbnail:{
            type:Array,
            default: function() {
                return []
            },
        }
    },

    data() {
        return {
            slickOptions: {
                slidesToShow: 5,
                slidesToScroll: 1,
                asNavFor: ".carousel",
                focusOnSelect: true,
                infinite:false,
                prevArrow:
                    '<a href="javascript:;" class="slide-control prev"><i class="fa fa-angle-left"></i></a>',
                nextArrow:
                    '<a href="javascript:;" class="slide-control next"><i class="fa fa-angle-right"></i></a>'
            },
        }
    }
}
</script>

<style lang="scss" scoped>
    .slick{
        &-slide{
            .carousel-nav-item{
                position: relative;
                width: 50px!important;
                height: 50px;
            }
        }
        &-current{
            .carousel-nav-item{
                &:after{
                    background:transparent;
                }
            }
        }
    }
</style>