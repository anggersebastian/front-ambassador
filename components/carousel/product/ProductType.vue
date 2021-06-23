<template>
    <client-only>
        <slick-slide
            ref="slick"
            :options="slickOptions"
            class="list-slide"
        >
            <div
                v-for="n in slide"
                :key="n"
                class="item-slide"
            >
                <img
                    :src="`https://via.placeholder.com/180.png?text=${n}`"
                    alt=""
                    class="img-responsive"
                >
                <div class="product-list-type"> 
                    <div class="close-type">
                        <i
                            class="fa fa-times-circle fa-2x"
                            aria-hidden="true"
                            title="Close" 
                        />
                    </div>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Stok</th>
                                <th>price</th>
                                <th>Qty</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Putih</td>
                                <td>20</td>
                                <td>IDR 130.000</td>
                                <td>
                                    <div class="form-group">
                                        <button>+</button>
                                        <span class="input">
                                            0
                                        </span>
                                        <button>-</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </slick-slide>
    </client-only>
</template>
<script>
export default {
    data:function(){
        return {
            slickOptions:{
                // slidesToShow: 9,
                // slidesToScroll: 1,
                // centerMode: true,
                // focusOnSelect: true,
                prevArrow:'<a href="javascript:;" class="slide-control prev"><i class="fa fa-angle-left"></i></a>',
                nextArrow:'<a href="javascript:;" class="slide-control next"><i class="fa fa-angle-right"></i></a>'
            },
            slide:5
        }
    }
}
</script>