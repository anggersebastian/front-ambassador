<template>
  <div class="col-lg-12">
    <div class="widget widget-block">
      <div
        v-if="product.category && showHeader === true"
        class="row"
      >
        <div class="col-md-12 is-category">
          <div
            v-if="product.product.length > 0"
            class="widget-header"
          >
            <h3 class="widget-title">
              <span>{{ product.category.name }}</span>
            </h3>
            <nuxt-link
              class="widget-header-link"
              :to="localePath({path:`/category/${product.category.slug}`})"
            >
              {{ $t('more') }} <i
                class="fa fa-chevron-right"
                aria-hidden="true" 
              />
            </nuxt-link>
          </div>
          <div
            v-else
            class="widget-header"
          >
            <div class="row">
              <categoryLoader />
            </div>
          </div>
        </div>
      </div>
      <ul class="widget-body no-border">
        <div
          v-if="!loader"
          class="row"
        >
          <div
            v-if="product.product"
            class="block-product"
          >
            <div
              v-for="(listP, index) in product.product"
              :key="index"
              class="col-lg-3 col-flash-sale col-sm-4 col-xs-6"
            >
              <div class="product flex flex-column">
                <nuxt-link
                  class="product-cover"
                  :to="localePath({path:'/products/details/'+listP.id})"
                >
                  <img
                    :src="listP.image"
                    alt=""
                    class="img-responsive"
                  />
                  <!-- <div class="product-discount">
                    <div class="product-discount-badge">
                      <span class="percent">
                        30%
                      </span>
                      <span class="badge-label">
                        OFF
                      </span>
                    </div>
                  </div> -->
                </nuxt-link>

                                        
                <div class="product-content">
                  <!-- <div class="product-placeholder">
                    <nuxt-link
                      class="product-cover"
                      :to="localePath({path:'/products/details/'+listP.id})"
                    >
                      <img
                        :src="placeholder"
                        alt=""
                      />
                    </nuxt-link>
                  </div> -->
                  <nuxt-link
                    class="product-title"
                    :to="localePath({path:'/products/details/'+listP.id})"
                    :title="listP.title"
                  >
                    {{ $maxString(listP.title_en, 54) }}
                  </nuxt-link>
                  <div class="product-price">
                    <span class="product-price-discount">
                      {{ $currencyType() + $formatNumber(listP.price) }}
                    </span>
                    <!-- <span class="product-price-real">
                      {{ $currencyType() + $formatNumber(listP.price) }}
                    </span> -->
                  </div>
                  <!-- <div class="product-sale">
                    <span class="product-sale-count">
                      10 Terjual
                    </span>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="block-product"
          >
            <div class="col-lg-12">
              <p>Product Not found</p>
            </div>
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
      </ul>
    </div>
  </div>
</template>
<script>
import productLoader from '~/components/contentLoader/productLoader'
import categoryLoader from '~/components/contentLoader/categoryLoader'
import imgPlaceholder from '~/static/promo.png'
export default {

  components:{
    productLoader,
    categoryLoader
  },
  props:{
    product:{
      type:Object,
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
    showHeader:{
      type:Boolean,
      default:true
    }
  },

  data(){
    return{
      placeholder:imgPlaceholder
    }
  }
}
</script>