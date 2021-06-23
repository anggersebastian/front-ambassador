<template>
  <nav
    id="sidebar-wrapper"
    :class="categoryToggle ? 'navbar navbar-inverse navbar-fixed-top category' : 'navbar navbar-inverse navbar-fixed-top'"
    role="navigation"
  >
    <client-only>
      <div
        v-if="!toggle"
        class="nav sidebar-nav"
      >
        <div
          class="navbar-brand"
        >
          <a
            href="javascript:;"
            @click="onPressMenu('/')"
          >
            <img
              :src="logo"
              alt="Logo"
              class="img-logo"
            />
          </a>
          <a
            href="javascript:;"
            class="drawer-close"
            style="color:#444;"
            @click="()=>$store.commit('drawerToggle')"
          >
            <i
              class="fa fa-times"
              aria-hidden="true"
            />
          </a>
        </div>
        <ul class="drawer-menu">
          <li>
            <a
              v-if="authentication"
              href="javascript:;"
              @click="onPressMenu('/profil')"
            >
              <i
                class="fa fa-user"
                aria-hidden="true"
              />
              Profil
            </a>
            <a
              v-else
              href="javascript:;"
              @click="onPressMenu('/login')"
            >
              <i
                class="fa fa-sign-in"
                aria-hidden="true"
              />
              Login  
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              @click="onToglleCategory()"
            >
              <i
                class="fa fa-bars"
                aria-hidden="true"
              />
              Category
            </a>
          </li>
          <li v-if="authentication">
            <a
              href="javascript:;"
              @click="onPressMenu('/order')"
            >
              <i
                class="fa fa-history"
                aria-hidden="true"
              />


              {{ $t('navbar.order_history') }}
            </a>
          </li>
          <li v-if="authentication">
            <a
              href="javascript:;"
              @click="onPressMenu('/bill')"
            >
              <i
                class="fa fa-list-alt"
                aria-hidden="true"
              />

              {{ $t('navbar.bill_history') }}
            </a>
          </li>
          <!-- <li>
            <a
              href="javascript:;"
              @click="onToggleSetting()"
            >
              <i
                class="fa fa-cog"
                aria-hidden="true"
              />
              Setting
            </a>
          </li> -->
          <!-- <li>
                        <a href="#">
                            <i
                                class="fa fa-phone-square"
                                aria-hidden="true"
                            />
                            Contact Us
                        </a>
                    </li> -->
        </ul>
      </div>
      <ul
        v-if="!categoryToggle"
        class="drawer-footer"
      >
        <li v-if="authentication">
          <a
            href="javascript:;"
            @click="logout"
          >
            Logout <i
              class="fa fa-sign-out"
              aria-hidden="true"
            />

          </a>
        </li>
      </ul>
    </client-only>


    <!-- drawer for category -->
    <div
      v-if="categoryToggle"
      class="nav sidebar-nav drawer-category"
    >
      <div class="drawer-header">
        <a
          href="javascript:;"
          @click="onToglleCategory()"
        ><i
          class="fa fa-chevron-left"
          aria-hidden="true"
        />
          Kembali</a>
      </div>
      <ul
        v-if="child.length < 1"
        class="drawer-body"
      >
        <li
          v-for="(item, index) in categories"
          :key="index"
          class="no-padding"
        >
          <span
            class="drawer-category-title"
            @click="pressParentCategory(item.slug)"
          >
            {{ item.name }}
          </span>
          <span
            v-if="item.children.length > 0"
            class="drawer-chevron"
            @click="pressCategory(item)"
          >
            <i
              class="fa fa-chevron-right"
              aria-hidden="true"
            />

          </span>
        </li>
      </ul>
      <ul
        v-else
        class="drawer-body"
      >
        <li
          v-for="(item, index) in child"
          :key="index"
          @click="pressChild(item)"
        >
          <span>
            {{ item.name }}
          </span>
        </li>
      </ul>
    </div>

    <!-- drawer for setting -->
    <div
      v-if="settingToggle"
      class="nav sidebar-nav drawer-category"
    >
      <div class="drawer-header">
        <a
          href="javascript:;"
          @click="onToggleSetting()"
        ><i
          class="fa fa-chevron-left"
          aria-hidden="true"
        />
          Kembali</a>
      </div>
      <div class="drawer-body">
        <div class="setting-lang">
          <div class="dropdown">
            <button
              class="btn btn-default dropdown-toggle btn-block"
              type="button"
              data-toggle="dropdown"
            >
              {{ activeLang.name }}
              <span class="caret" />
            </button>
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
          </div>
        </div>
        <div class="setting-lang">
          <div class="dropdown">
            <button
              class="btn btn-default dropdown-toggle btn-block"
              type="button"
              data-toggle="dropdown"
            >
              {{ activeCurrency.name }}
              <span class="caret" />
            </button>
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
          </div>
        </div>
      </div>
    </div>
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
        return[]
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
      toggle:false,
      categoryToggle:false,
      child:[],
      slugParent:false,
      settingToggle:false
    }
  },

  computed:{
    authentication(){
      if(this.$store.state.auth.token === null) return false
      return true
    }
  },

  methods:{
    ...mapActions({
      setLang : 'setLang',
      setCurrency : 'setCurrency'
    }),

    onPressMenu(params){
      this.$store.commit('drawerToggle')
      if(params != ''){
        return this.$router.push(this.localePath({path:params}))
      }
    },

    logout(){
      this.$store.commit('drawerToggle')
      this.$store.dispatch('setCart', 'set')
      this.$store.dispatch('auth/LOGOUT')
    },

    login(){
      this.$store.commit('drawerToggle')
      this.$router.push('/login')
    },

    onToglleCategory(){
      if(this.child.length) {
        return this.child = []
      }
      this.toggle ? this.toggle = false : this.toggle = true
      return this.categoryToggle ? this.categoryToggle = false : this.categoryToggle = true
    },

    pressCategory(item){
      if(item.children.length){
        this.slugParent = item.slug
        return this.child = item.children
      } else {
        this.$store.commit('drawerToggle')
        this.$router.push(`/category/${item.slug}`)
      }
    },

    pressParentCategory(slug){
      this.$store.commit('drawerToggle')
      return this.$router.push(this.localePath({path:`/category/${slug}`}))
    },

    pressChild(item){
      this.$store.commit('drawerToggle')
      return this.$router.push(this.localePath({path:`/category/${this.slugParent}?child=${item.slug}`}))
    },

    onToggleSetting(){
      this.toggle ? this.toggle = false : this.toggle = true
      this.settingToggle = this.settingToggle ? this.settingToggle = false : this.settingToggle = true
    }
  }
}
</script>
<style lang="scss">
    #sidebar-wrapper {
        z-index: 1031;
        left: -80%;
        width: 80%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #fff;
        // background: linear-gradient(to right, #5B86E5, #36D1DC);
        // -webkit-transition: all 0.5s ease;
        // -moz-transition: all 0.5s ease;
        // -o-transition: all 0.5s ease;
        // transition: all 0.5s ease;
    }

    #sidebar-wrapper.category{
        background: #fff;
        color: rgb(51, 51, 51);
    }

    #sidebar-wrapper::-webkit-scrollbar {
        display: none;
    }

    #wrapper.toggled #sidebar-wrapper {
        left: 0;
    }

    .sidebar-nav {
        position: absolute;
        top: 0;
        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .sidebar-nav li {
        position: relative; 
        line-height: 20px;
        display: inline-block;
        width: 100%;
        border-bottom: 1px solid #c4c3e6a6;
    }

.sidebar-nav ul li:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
    width: 0px;
    background-color: #fff;
    // background-color: rgb(93, 164, 231);
    // -webkit-transition: width .2s ease-in;
    //   -moz-transition:  width .2s ease-in;
    //    -ms-transition:  width .2s ease-in;
    //         transition: width .2s ease-in;

}
.sidebar-nav ul li:first-child a {
    color: #444;
}
/* .sidebar-nav ul li:before {
    background-color: #35acdf;   
} */
.sidebar-nav ul li:hover:before,
.sidebar-nav ul li.open:hover:before {
    width: 100%;
    -webkit-transition: width .2s ease-in;
      -moz-transition:  width .2s ease-in;
       -ms-transition:  width .2s ease-in;
            transition: width .2s ease-in;

}

.sidebar-nav li a {
    display: block;
    color: #444;
    text-decoration: none;
    padding: 15px 15px 15px 30px;    
}

.sidebar-nav li a:hover,
.sidebar-nav li a:active,
.sidebar-nav li a:focus,
.sidebar-nav li.open a:hover,
.sidebar-nav li.open a:active,
.sidebar-nav li.open a:focus{
    color: #444;
    text-decoration: none;
    background-color: transparent;
}

.sidebar-nav > .sidebar-brand {
    height: 65px;
    font-size: 20px;
    line-height: 44px;
}
.drawer-close{
    font-weight: normal;
    font-size: inherit;
    margin-right: 7px;
}

.drawer-close{
    font-weight: normal;
    font-size: inherit;
    margin-right: 7px;
}

.drawer-menu{
    padding: 0;
}

.drawer-footer{
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 0px;
    color: #fff;
}

#sidebar-wrapper .navbar-brand{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 2rem;
}

.drawer{
    &-header{
        padding: 10px;
        border-bottom: 1px solid #ddd;
        // background: linear-gradient(to right, #5B86E5, #36D1DC);
        background: #ddd;
        a{
            color:#444;
        }
    }

    &-close{
        font-weight: normal;
        font-size: inherit;
        margin-right: 7px;
    }

    &-close{
        font-weight: normal;
        font-size: inherit;
        margin-right: 7px;
    }

    &-menu{
        padding: 0;
    }

    &-body{
        padding: 0;
        li{
            padding: 10px 15px;
            cursor: pointer;
            position: relative;
            &.no-padding{
                padding: 0;
            }
        }
    }

    &-footer{
        position: absolute;
        bottom: 20px;
        left: 0;
        width: 100%;
        text-align: center;
        padding: 0px;
        color: #fff;
    }


    &-chevron{
        position: absolute;
        right: 10px;
        color: #b9b5b5;
        top: 50%;
        transform: translateY(-50%);
        padding: 5px 10px;
    }

    &-category-title{
        display: block;
        padding: 10px 15px;
        width:80%;
    }
}
.setting{
    &-lang{
        padding: 10px 15px;
        color: #fff;
        button{
            background: transparent!important;
            color: #fff;
        }

        .dropdown{
            &-menu{
                background: linear-gradient(to right, #5B86E5, #36D1DC);
                width: 100%;
                border-right: 0px;
                border-left: 0px;
                li{
                    padding: 0;
                    text-align: center;
                    &:first-child a{
                        color: #fff;
                    }
                    &:last-child{
                        border:none;
                        color: inherit;
                    }

                    a{
                        color: #fff;
                        padding: 10px 7px;
                    }
                }
            }
        }
    }
}
</style>