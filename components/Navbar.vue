<template>
  <nav
    id="header"
    class="navbar navbar-default navbar-fixed-top"
  >
    <div :class="scrool ? 'navbar-top' : 'navbar-top is-hide'">
      <div class="container">
        <div class="navbar-bar">
          <div class="navbar-welcome">
            <span>Welcome To Importir Network</span>
          </div>

          <client-only>
            <ul class="navbar-rts ">
              <!-- <li class="dropdown navbar-item navbar-noborder">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ activeLang.name }} <span class="caret" />
                </a>
                <ul class="dropdown-menu">
                  <li
                    v-for="(locale, index) in $i18n.locales"
                    :key="index"
                  >
                    <nuxt-link :to="switchLocalePath(locale.code)">
                      {{ locale.name }}
                    </nuxt-link>
                  </li>
                </ul>
              </li> -->

              <!-- <li class="dropdown navbar-item navbar-noborder navbar-ismargin">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {{ activeCurrency.name }} <span class="caret" />
                </a>
                <ul class="dropdown-menu">
                  <li
                    v-for="(item, index) in currency"
                    :key="index"
                  >
                    <a
                      href="javascript:;"
                      @click="setCurrency(item.code)"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </li> -->
              <li
                v-if="$store.state.auth.token === null"
                class="navbar-item navbar-login"
              >
                <nuxt-link to="/login">
                  Login
                </nuxt-link>
              </li>
              <li
                v-if="$store.state.auth.token === null"
                class="navbar-item navbar-register"
              >
                <nuxt-link to="/register">
                  Register
                </nuxt-link>
              </li>
              <li
                v-if="$store.state.auth.token !== null"
                class="navbar-item navbar-user dropdown"
              >
                <a 
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    class="fa fa-user"
                    aria-hidden="true"
                  /> {{ $store.state.auth.name }}
                  <span class="caret" />
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <nuxt-link :to="localePath({path:'/profil'})">
                      {{ $t('navbar.profil') }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath({path:'/order'})">
                      {{ $t('navbar.order_history') }}
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link :to="localePath({path:'/bill'})">
                      {{ $t('navbar.bill_history') }}
                    </nuxt-link>
                  </li>
                  <!-- <li>
                    <nuxt-link to="#">
                      Riwayat Paket
                    </nuxt-link>
                  </li> -->
                  <li
                    role="separator"
                    class="divider"
                  />
                  <li class="text-center">
                    <a
                      href="javascript:;"
                      @click="logout"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </client-only>
        </div>
      </div>
    </div>

    <div class="container rts-container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span>
            Toggle navigation
          </span>
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </button>
        <div
          class="navbar-brand"
        >
          <nuxt-link :to="localePath('index')">
            <img
              :src="logo"
              alt="Logo"
              class="img-logo"
            />
          </nuxt-link>
        </div>
      </div>
      <!-- Collect the nav links, forms, and other content for toggling -->
      <div
        id="bs-example-navbar-collapse-1"
        class="collapse navbar-collapse"
      >
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="true"
              title="Category"
            >
              <span class="fa fa-bars fa-2x" />
            </a>
            <ul
              v-if="categories.length >0"
              class="dropdown-menu rts-category"
            >
              <li
                v-for="(item, index) in categories"
                :key="index"
                :class="item.children.length > 0 ? 'rts-category-child drop' : 'rts-category-child'"
              >
                <!-- <nuxt-link :to="localePath({path:`/category/${item.slug}`})">
                  {{ item.name }} 
                  <i
                    v-if="item.children.length > 0"
                    class="fa fa-caret-right"
                    aria-hidden="true"
                  />
                </nuxt-link> -->
                <a href="javascript:;">
                  {{ item.name }} 
                  <i
                    v-if="item.children.length > 0"
                    class="fa fa-caret-right"
                    aria-hidden="true"
                  />
                </a>
                <ul class="block-children">
                  <li
                    v-for="(children, n) in item.children"
                    :key="n"
                  >
                    <nuxt-link :to="localePath({path:`/category/${item.slug}?child=${children.slug}`})">
                      {{ children.name }}
                    </nuxt-link>
                  </li>
                </ul>
              </li>
              <!-- <li
                role="separator"
                class="divider"
              /> -->
              <!-- <li>
                <a href="#">
                  {{ $t('more') }}
                </a>
              </li> -->
            </ul>
          </li>
        </ul>
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Ex : Computer Windows"
            />
          </div>
        </form>
        <client-only>
          <ul class="nav navbar-nav navbar-right">
            <li class="dropdown">
              <a
                href="javascript:;"
                class="dropdown-toggle rts-cart"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i
                  class="fa fa-shopping-cart fa-2x"
                  aria-hidden="true"
                />
                <span class="rts-cart-count">
                  {{ cart.length }}
                </span>
              </a>
              <ul
                v-if="token !== '' && cart.length > 0"
                class="dropdown-menu rts-cart-list"
              >
                <li
                  v-for="(item, index) in cart"
                  :key="index"
                  class="rts-cart-item"
                >
                  <div class="rts-cart-thumbnail">
                    <img
                      :src="item.image"
                      alt="Thumbnail"
                      class="img-responsive"
                    />
                  </div>
                  <div class="rts-cart-title">
                    <nuxt-link :to="`/products/details/${item.product_id}`">
                      {{ $capitalizeFirstLetter($maxString(item.title, 40)) }}
                    </nuxt-link>
                  </div>
                </li>
                <li
                  role="separator"
                  class="divider"
                />
                <li class="rts-cart-btn">
                  <nuxt-link
                    :to="localePath({path:'/cart'})"
                    class="btn btn-xs btn-default"
                  >
                    Semua
                  </nuxt-link>
                </li>
              </ul>
            </li>
            <li>
              <nuxt-link 
                :to="localePath({path:'/wishlist'})"
              >
                <i
                  class="fa fa-heart-o fa-2x"
                  aria-hidden="true"
                />
                <span class="rts-cart-count">
                  {{ $store.state.wishlist.length }}
                </span>
              </nuxt-link>
            </li>
          </ul>
        </client-only>
      </div><!-- /.navbar-collapse -->

      <!-- for mobile only -->
      <div class="navbar-mobile">
        <button
          type="button"
          class="navbar-toggle"
          @click="()=>$store.commit('drawerToggle')"
        >
          <span class="sr-only">
            Toggle navigation
          </span>
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </button>
        <form action="#">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Ex : Computer Windows"
            />
          </div>
          <nuxt-link
            to="/cart"
            class="dropdown-toggle rts-cart"
          >
            <i
              class="fa fa-shopping-cart fa-2x"
              aria-hidden="true"
            />
            <span class="rts-cart-count">
              {{ cart.length }}
            </span>
          </nuxt-link>
          <nuxt-link
            to="/wishlist"
            class="dropdown-toggle rts-cart"
          >
            <i
              class="fa fa-heart-o fa-2x"
              aria-hidden="true"
            />

            <span class="rts-cart-count">
              {{ $store.state.wishlist.length }}
            </span>
          </nuxt-link>
        </form>
      </div>
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logo from '../assets/images/net-logo.png'
export default {

  props:{
    categories:{
      type:Array,
      default(){
        return []
      }
    },
       
    currency:{
      type:Array,
      default(){
        return []
      }
    },

    activeLang:{
      type:Object,
      default(){
        return {}
      }
    },

    activeCurrency:{
      type:Object,
      default(){
        return {}
      }
    }
  },

  data(){
    return{
      logo:logo,
      scrool:true
    }
  },

  computed:{
    ...mapGetters({
      token : 'auth/token',
      cart : 'cart',
      totalCart : 'totalCart'          
    }),

  },

  created () {
    if(process.browser){
      window.addEventListener('scroll', this.handleScroll)
    }
  },

   
  methods:{
    ...mapActions({
      setLang : 'setLang',
      setCurrency : 'setCurrency'
    }),

    handleScroll() {
      let top = window.scrollY
      if(top > 80){
        if(this.scrool){
          this.scrool = false
        }
      } else{
        if(!this.scrool){
          this.scrool = true
        }
      }
    },

    logout(){
      this.$store.dispatch('setCart', [])
      this.$store.dispatch('auth/LOGOUT')
    }
  }
}
</script>

<style lang="scss">
    .navbar-form{
        width: 59%;
        .form-group{
            width: 100%;
            padding-top:0;
            margin-top: 4px;
            input{
                width: 100%;
            }
        }
    }

    #bs-example-navbar-collapse-1{
        li{
            &:hover{
                .rts-category{
                    display: block;
                }
            }
        }
    }

    .navbar-brand{
        color: #f6f1f1!important;
        font-size: 31px;
        font-weight: bold;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        align-items: center;
    }
</style>