<template>
    <div class="col-lg-12 flash-sale">
        <div class="flash-sale-title">
            <h2>FLash Sale</h2>
            <Flash
                :date="items.time"
            />
        </div>
        
        <div
            v-for="(item, index) in product"
            :key="index"
            class="col-lg-2"
        >
            <div class="product-flash">
                <div class="product-flash-cover">
                    <nuxt-link to="/products/details/123">
                        <img
                            :src="item.image"
                            alt=""
                            class="img-responsive"
                        >
                    </nuxt-link>
                </div>
                
                
                <div class="product-flash-content">
                    <div class="product-price">
                        <span>Rp 20.000</span>
                    </div>
                    <div class="progress">
                        <div
                            class="progress-bar"
                            role="progressbar"
                            aria-valuenow="70"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style="width:70%"
                        >
                            200 Terjual
                        </div>
                    </div> 
                    <!-- <span class="product-price">
                        IDR 30.000
                    </span> -->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Flash from '~/components/timer/flash.vue'
export default {

    components:{
        Flash
    },

    props:{
        product:{
            type:Array,
            default(){
                return[]
            }
        }
    },

    data:function(){
        return {
            slickOptions:{
                slidesToShow: 6,
                slidesToScroll: 1,
                autoplay: true,
                infinite:false,
                prevArrow:
                    '<a href="javascript:;" class="slide-control prev"><i class="fa fa-angle-left"></i></a>',
                nextArrow:
                    '<a href="javascript:;" class="slide-control next"><i class="fa fa-angle-right"></i></a>'
            },

            items:{
                'time' : Math.trunc(Date.parse('October 30, 2020 15:00:00') / 1000)
            }
            // {
            //     'time' : Math.trunc(Date.parse('Aug 14, 2019 15:00:00') / 1000)
            // },
            // {
            //     'time' : Math.trunc(Date.parse('Aug 15, 2019 15:00:00') / 1000)
            // },
            // {
            //     'time' : Math.trunc(Date.parse('Aug 16, 2019 15:00:00') / 1000)
            // },
            // {
            //     'time' : Math.trunc(Date.parse('Aug 17, 2019 15:00:00') / 1000)
            // },
            // {
            //     'time' : Math.trunc(Date.parse('Aug 18, 2019 15:00:00') / 1000)
            // },
            // {
            //     'time' : Math.trunc(Date.parse('Aug 19, 2019 15:00:00') / 1000)
            // },
            // ]
        }
    }
}
</script>