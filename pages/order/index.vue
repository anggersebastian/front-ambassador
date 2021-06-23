<template>
    <div
        id="product_id"
        class="container rts-product-detail"
    >
        <div class="row">
            <Breadcrumb :list="[{name:'Order', slug:'/order'}]" />
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="order-header">
                    <form>
                        <div class="input-group">
                            <input
                                v-model="searchKey"
                                type="text"
                                class="form-control"
                                placeholder="Search"
                            >
                        </div>
                    </form> 
                </div>
                <ul
                    v-if="orders.length > 0"
                    class="order"
                >
                    <li class="order-item order-body">
                        <div class="order-thumbnail">
                            <strong>Product</strong>
                        </div>
                        <div class="order-id">
                            <strong>Invoice No</strong>
                        </div>
                        <div class="order-status">
                            <strong>Status</strong>
                        </div>
                        <div class="order-date">
                            <strong>Date</strong>
                        </div>
                        <div class="action">
                            <strong>Action</strong>
                        </div>
                    </li>
                    <li
                        v-for="(order, iOrder) in orders"
                        :key="iOrder"
                        class="order-item"
                    >
                        <div class="order-thumbnail">
                            <img
                                :src="order.yg_order_detail[0].product_image"
                                class="img-responsive"
                            >
                        </div>
                        <div class="order-id">
                            {{ order.invoice_no }}
                        </div>
                        <div class="order-status">
                            {{ order.payment_status }}
                        </div>
                        <div class="order-date">
                            {{ order.created_at | date("DD MMMM YYYY", { locale }) }}
                        </div>
                        <div class="order-action">
                            <nuxt-link
                                :to="localePath({path:'/order/'+ order['id']})"
                                class="btn btn-info btn-xs"
                            >
                                View
                                <i class="fa fa-eye" />
                            </nuxt-link>
                        </div>
                    </li>
                    <li class="order-item">
                        <div class="order-paging">
                            <ul class="pagination">
                                <li 
                                    v-for="n in count"
                                    :key="n"
                                    :class="getDisableBtn(n) ? 'disabled' : ''"
                                >
                                    <a
                                        href="javascript:;"
                                        :class="getDisableBtn(n) ? 'active' : ''"
                                        @click="getAllHistoryOrder(n, searchKey)"
                                    >
                                        {{ n }}
                                    </a>
                                </li>
                            </ul> 
                        </div>
                    </li>
                </ul>
                <OrderLoader v-if="loading" />
            </div>
        </div>
    </div>
</template>

<script>
import * as Cookies from 'js-cookie'
import Breadcrumb from '~/components/Breadcrumb.vue'
import OrderLoader from '~/components/contentLoader/orderLoader.vue'
import { dateFilter } from "vue-date-fns"
import id from "date-fns/locale/id"
import en from "date-fns/locale/en"
import cn from "date-fns/locale/zh_cn"

export default {
    middleware: ['auth'],
    
    components:{
        Breadcrumb,
        OrderLoader
    },

    filters: {
        date: dateFilter
    },

    data(){
        return{
            dumpOrders: [],
            orders: [],
            count: 0,
            pageOn: 1,
            searchKey: '',
            sumPerPage: 5,
            loading:true
        }
    },

    computed:{
        locale(){
            let lang = Cookies.get('lang')
            let locale = 'en'
            switch (lang) {
            case 'id':
                locale = id
                break
            case 'en':
                locale = en
                break
            case 'cn':
                locale = cn
                break
            }
            return locale
        }
    },

    watch: {
        searchKey(newValue) {
            this.getAllHistoryOrder(1, newValue)
        }
    },

    mounted(){
        this.getAllHistoryOrder()
    },

    methods:{
        getAllHistoryOrder(page = '', search = ''){
            if(page == '') {
                this.$store.dispatch('setLoading', this.orders.length > 0 ? true : false)
                this.$axios
                    .$get('/v2/order')
                    .then(response => {
                        this.$store.dispatch('setLoading', false)
                        this.dumpOrders = response.data
                        this.orders = this.dumpOrders.filter((x, key) => key < this.sumPerPage)
                        this.count = Math.ceil(this.dumpOrders.length / this.sumPerPage)
                        this.loading = false
                    })
                    .catch(error => {
                        this.$store.dispatch('setLoading', false)
                        this.loading = false
                        throw error
                    })
            } else {
                let startRow    = 0
                let endRow      = this.sumPerPage
                if(page > 1) {
                    endRow      = this.sumPerPage * page
                    startRow    = endRow - this.sumPerPage
                }
                if(search == '') {
                    this.orders = this.dumpOrders.filter((x, key) => (key >= startRow && key < endRow))
                } else {
                    let resultSearch = this.dumpOrders.filter(x => x.invoice_no.toLowerCase().includes(search.toLowerCase()))
                    this.orders = resultSearch.filter((x, key) => (key >= startRow && key < endRow))
                    this.count = Math.ceil(resultSearch.length / this.sumPerPage)
                }
                this.pageOn = page
            }
        },

        getDisableBtn(pageInc){
            if (pageInc == this.pageOn) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style lang="css">
    .order-item{
        color: #5d5d5ded;
    }
</style>