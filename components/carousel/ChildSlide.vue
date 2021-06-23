<template>
    <div class="row">
        <client-only>
            <slick-slide
                v-if="category.length > 0"
                ref="slick"
                :options="slickOptions"
                class="rts-child"
            >
                <div
                    v-for="(item, index) in category"
                    :key="index"
                    class="col-lg-2 col-md-2 col-xs-6"
                >
                    <div class="category-child">
                        <div
                            :class="'cover linear random-'+index"
                        >
                            <nuxt-link :to="localePath({path:`/category/${parent}?child=${item.slug}`})">
                                {{ item.name }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </slick-slide>
        </client-only>
    </div>
</template>
<script>
export default {
    props:{
        category:{
            type:Array,
            default:()=>[]
        },
        parent:{
            type:String,
            default:''
        }
    },

    data(){
        return {
            slickOptions:{
                slidesToShow: 6,
                slidesToScroll: 1,
                focusOnSelect: true,
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
<style lang="scss">
    .slide-control{
        display: none!important;
    }

    .rts-child{
        &:hover, &:focus{
            .slide-control{
                display: inline!important;
            }
        }
    }
</style>