<template>
  <div class="col-lg-12">
    <div class="widget widget-block">
      <div
        v-if="product != null && showHeader === true"
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
              :to="`/category/${product.category.slug}`"
            >
              Selengkapnya <i
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
      <div
        id="rts-scroll"
        class="widget-body no-border"
      >
        <div
          v-if="!loader"
          class="row"
        >
          <div
            v-if="product != null && product.product.length > 0"
            class="block-product"
          >
            <div
              v-for="(listP, index) in product.product"
              :key="index"
              class="col-lg-3 col-flash-sale col-sm-4 col-xs-6"
            >
              <div class="product">
                <div class="product-cover">
                  <nuxt-link :to="`/products/details/${listP.id}`">
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
                    :to="localePath({path:`/products/details/${listP.id}`})"
                    :title="listP.title"
                  >
                    {{ $maxString(listP.title, 54) }}
                  </nuxt-link>
                  <span class="product-price">
                    {{ $currencyType() + $formatNumber(listP.price) }}
                  </span>
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
import categoryLoader from '~/components/contentLoader/categoryLoader'
import nullData from '~/components/error/nullData.vue'

export default {

  components:{
    productLoader,
    categoryLoader,
    nullData
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
}
</script>