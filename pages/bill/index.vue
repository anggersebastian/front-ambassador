<template>
    <div
        id="product_id"
        class="container"
    >
        <div class="row">
            <Breadcrumb :list="[{name:'bill', slug:'/bill'}]" />
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

                <div class="rts-table rts-dekstop">
                    <table class="table table-striped">
                        <thead>
                            <tr class="text-center">
                                <th>Bill Name</th>
                                <th>Status</th>
                                <th>Price total</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(bill, billI) in bills"
                                :key="billI"
                            >
                                <td>{{ bill.title }}</td>
                                <td>{{ bill.is_paid == true ? 'Sudah Dibayar' : 'Belum Dibayar' }}</td>
                                <td>{{ $currencyType() + $formatNumber(bill.grand_total) }}</td>
                                <td>{{ bill.created_at | date("DD MMMM YYYY", { locale }) }}</td>
                                <td>
                                    <nuxt-link
                                        :to="localePath({path:'/bill/'+ bill.id})"
                                        class="btn btn-info btn-xs"
                                    >
                                        view
                                        <i class="fa fa-eye" />
                                    </nuxt-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                                    @click="getAllBill(n, searchKey)"
                                >
                                    {{ n }}
                                </a>
                            </li>
                        </ul> 
                    </div>
                </div>

                <div class="rts-mobile">
                    <ul class="bill-list">
                        <li
                            v-for="(item, index) in bills"
                            :key="index"
                            class="bill-item"
                            @click="$router.push(localePath({path:'/bill/'+item.id}))"
                        >
                            <div class="bill-left">
                                <span class="bill-title">
                                    Tagihan Produk
                                </span>
                                <span class="bill-sub-title">
                                    16 Oktober 2019
                                </span>
                            </div>
                            <div class="bill-right">
                                <span>Rp 200.000</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as Cookies from 'js-cookie'
import Breadcrumb from '~/components/Breadcrumb.vue'
import { dateFilter } from "vue-date-fns"
import id from "date-fns/locale/id"
import en from "date-fns/locale/en"
import cn from "date-fns/locale/zh_cn"

export default {
    name:'Bill',
    middleware: 'auth',

    filters: {
        date: dateFilter
    },

    components:{
        Breadcrumb,
    },
    
    data(){
        return {
            dumpBills: [],
            bills: [],
            count: 0,
            pageOn: 1,
            searchKey: '',
            sumPerPage: 5
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
            this.getAllBill(1, newValue)
        }
    },

    mounted() {
        this.getAllBill()
    },

    methods: {
        getAllBill(page = '', search = ''){
            if(page == '') {
                this.$axios
                    .$get('/v2/bill')
                    .then(response => {
                        if(response.status){
                            this.dumpBills = response.data
                            this.bills = this.dumpBills.filter((x, key) => key < this.sumPerPage)
                            this.count = Math.ceil(this.dumpBills.length / this.sumPerPage)
                        }
                    })
                    .catch(error => {
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
                    this.bills = this.dumpBills.filter((x, key) => (key >= startRow && key < endRow))
                } else {
                    let resultSearch = this.dumpBills.filter(x => x['title'].toLowerCase().includes(search.toLowerCase()))
                    this.bills = resultSearch.filter((x, key) => (key >= startRow && key < endRow))
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
<style lang="scss" scoped>
    .order-thumbnail{
        min-width:70px;
        max-width: unset;
    }

    .rts-danger{
        background-color: #ede3e3;
    }
    .order-item{
        color: #5d5d5ded;
    }

    .rts-table{
        background-color: #fff;
        padding: 1rem;
        color: #847575;
        td{
            padding: 13px 8px;
        }
    }
</style>