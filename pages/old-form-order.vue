<template>
    <div
        id="auth-page"
        class="container"
    >
        <div class="row">
            <ValidationObserver v-slot="{ handleSubmit }">
                <form @submit="handleSubmit(submitForm)">
                    <div class="col-lg-6">
                        <div class="panel panel-default">
                            <div class="panel-heading bg-white">
                                Data penerima
                            </div>
                            <div class="panel-body">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="name"
                                    rules="required"
                                    tag="div"
                                >
                                    <div :class="errors.length ? 'form-group has-error' : 'form-group'">
                                        <input
                                            v-model="name"
                                            type="text"
                                            placeholder="Name"
                                            class="form-control"
                                        />
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="E-mail"
                                    rules="required"
                                    tag="div"
                                >
                                    <div :class="errors.length ? 'form-group has-error' : 'form-group'">
                                        <input
                                            v-model="email"
                                            class="form-control"
                                            type="email"
                                            placeholder="Email"
                                        />
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="phone"
                                    rules="required"
                                    tag="div"
                                >
                                    <div :class="errors.length ? 'form-group has-error' : 'form-group'">
                                        <input
                                            v-model="phone"
                                            type="text"
                                            class="form-control"
                                            placeholder="Nomor Hp"
                                        />
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="setProvince"
                                    rules="required"
                                    tag="div"
                                >
                                    <div
                                        :class="errors.length ? 'form-group has-error' : 'form-group'"
                                        style="position:relative"
                                    >
                                        <select
                                            v-model="setProvince"
                                            class="form-control"
                                        >
                                            <option
                                                v-for="(item, index) in province"
                                                :key="index"
                                                :value="item.province_id"
                                            >
                                                {{ item.province }}
                                            </option>
                                        </select>
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="setCity"
                                    rules="required"
                                    tag="div"
                                >
                                    <div
                                        :class="errors.length ? 'form-group has-error' : 'form-group'"
                                        style="position:relative"
                                    >
                                        <select
                                            v-model="setCity"
                                            class="form-control"
                                        >
                                            <option value="">
                                                Pilih Kota
                                            </option>
                                            <option
                                                v-for="(item, index) in city"
                                                :key="index"
                                                :value="item.city_id"
                                            >
                                                {{ item.city_name }}
                                            </option>
                                        </select>
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="setDistrict"
                                    rules="required"
                                    tag="div"
                                >
                                    <div
                                        :class="errors.length ? 'form-group has-error' : 'form-group'"
                                        style="position:relative"
                                    >
                                        <select
                                            v-model="setDistrict"
                                            class="form-control"
                                        >
                                            <option value="">
                                                Pilih Kecamatan
                                            </option>
                                            <option
                                                v-for="(item, index) in district"
                                                :key="index"
                                                :value="item.subdistrict_id"
                                            >
                                                {{ item.subdistrict_name }}
                                            </option>
                                        </select>
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>

                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="address"
                                    rules="required"
                                    tag="div"
                                >
                                    <div :class="errors.length ? 'form-group has-error' : 'form-group'">
                                        <textarea
                                            v-model="address"
                                            cols="30"
                                            rows="3"
                                            name="address"
                                            class="form-control"
                                            placeholder="Alamat"
                                        />
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>
                            </div>
                        </div>
                    </div>
                    <div
                        v-if="product"
                        class="col-lg-6"
                    >
                        <div
                            class="panel panel-default"
                        >
                            <div class="panel-heading bg-white">
                                Daftar Belanja
                            </div>
                            <div class="panel-body">
                                <ul
                                    class="product-list "
                                >
                                    <li class="product-item flex">
                                        <div class="product-cover">
                                            <img
                                                :src="product.image"
                                                alt="Product cover"
                                                class="img-responsive"
                                            />
                                        </div>
                                        <div class="product-content">
                                            <p class="title">
                                                {{ product.title }}
                                            </p>
                                            <p>Note : {{ note }}</p>
                                            <p>Quantity : {{ qty }}</p>
                                            <p>Harga per PCS : {{ $currencyType() + $formatNumber(product.price) }}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="panel-footer bg-white">
                                <p class="product-prices">
                                    Total Harga Produk {{ $currencyType() + $formatNumber(parseFloat(product.price) * qty) }}
                                </p>
                            </div>
                        </div>
                        <div
                            class="panel panel-default"
                        >
                            <div class="panel-heading bg-white">
                                Logistik
                            </div>
                            <div class="panel-body">
                                <ValidationProvider
                                    v-slot="{ errors }"
                                    name="address"
                                    rules="required"
                                    tag="div"
                                >
                                    <div
                                        :class="errors.length ? 'form-group has-error' : 'form-group'"
                                        style="margin-bottom:0px;"
                                    >
                                        <select
                                            v-model="setOngkir"
                                            class="form-control"
                                            :disabled="logistict.length ? false:true"
                                        >
                                            <option value="">
                                                Pilih logistik
                                            </option>
                                            <option
                                                v-for="(item, iOngkir) in logistict"
                                                :key="iOngkir"
                                                :value="item.value + ',' + item.ongkir.value"
                                            >
                                                {{ item.name }}
                                            </option>
                                        </select>
                                        <span class="help-block">
                                            {{ errors[0] }}
                                        </span>
                                    </div>
                                </ValidationProvider>
                            </div>
                            <div class="panel-footer bg-white">
                                <p
                                    class="product-prices"
                                    style="margin-bottom:0px;"
                                >
                                    Ongkir Kirim {{ $currencyType() + $formatNumber(ongkir) }}
                                </p>
                            </div>
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-body">
                                <p class="total-price">
                                    Total Belanja {{ $currencyType() + $formatNumber(parseFloat(ongkir) + parseFloat(product.price) * qty) }}
                                </p>
                            </div>
                            <div class="panel-footer bg-white">
                                <div
                                    class="form-group"
                                    style="margin-bottom:0px;"
                                >
                                    <button
                                        class="btn btn-danger  btn-block"
                                        type="submit"
                                    >
                                        Lanjut Ke Pembayaran
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </div>
    </div>
</template>
<script>
import { ValidationProvider,ValidationObserver } from "vee-validate"
export default {
    layout:'NoHeader',

    head () {
        return {
            title: 'Form Order',
        }
    },

    components:{
        ValidationProvider,
        ValidationObserver
    },

    data(){
        return{
            product:null,
            note:'',
            qty:0,
            setCity:'',
            setProvince:'',
            setDistrict:'',
            phone:'',
            email:'',
            name:'',
            postal:'',
            address:'',

            city:[],
            district:[],
            province:[],
            logistict:[],
            setOngkir:'',
            ongkir:0,
            total:0
        }
    },

    watch:{
        setProvince(newValue){
            if(newValue){
                this.getListCities(newValue)
            }
        },

        setCity(newValue){
            if(newValue){
                this.getListDistricts(newValue)
            }
        },

        setDistrict(newValue){
            if(newValue){
                this.fetchOngkir()
            }
        },

        setOngkir(newValue){
            if(newValue){
                let ex = newValue.split(',')
                this.ongkir = parseFloat(ex[1])
            }
        }
    },

    mounted(){
        this.fetchproduct()
        this.getListProvinces()
    },

    methods:{

        async fetchproduct(){
            let params = this.$route.query
            let productId = params.product
            let qty = params.qty
            let note = params.note
            this.note = note
            this.qty = qty
            let product = await this.$axios.$get(`/v2/product/${productId}/detail`)
            if(product.status){
                this.product = product.data
            }
        },

        async submitForm(event){
            event.preventDefault()
            
            return
            let queryParams = this.$route.query
            
            let city = this.city.filter(x => x.city_id == this.setCity)[0]
            let body = {
                name:this.name,
                email:this.email,
                phone:this.phone,
                province:this.setProvince,
                city:this.setCity,
                district:this.setDistrict,
                logistict:this.setOngkir,
                postal:city.postal_code,
                address:this.address,
                dump:{
                    province:this.province.filter(x => x.province_id == this.setProvince)[0],
                    city:city,
                    district:this.district.filter(x => x.subdistrict_id == this.setDistrict)[0]
                },
                order:{
                    product:queryParams.product,
                    qty:queryParams.qty,
                    note:queryParams.note,
                }
            }

            let post = await this.$axios.$post('/v2/user', body)
            if(post.status){
                post = post.data

                console.log(post)
                if(post.user.token){
                    this.$store.commit('auth/setToken', post.user.token)
                    this.$store.commit('auth/setName', post.user.name)
                    this.$store.commit('auth/setCountry', post.user.country)
                }

                this.$router.push(`/bill/${post.invoice.id}`)
            }
        },

        getListProvinces() {
            this.$axios
                .$get('/v2/address/province/country/id')
                .then(response => {
                    if(response.status){
                        this.province = response.data
                    }
                        
                })
                .catch(error => {
                    
                })
        },

        getListCities(prov) {
            this.$store.dispatch('setLoading', true)
            if(prov != '') {
                this.$axios
                    .$get('/v2/address/city/province/' + prov)
                    .then(response => {
                        if(response.status){
                            this.city = response.data
                        }
                        this.$store.dispatch('setLoading', false)
                    })
                    .catch(error => {
                        this.city = []
                        this.district = []
                    })
            } else {
                this.city = []
                this.district = []
            }
        },

        getListDistricts(district) {
            this.$store.dispatch('setLoading', true)
            if(district != '') {
                this.$axios
                    .$get('/v2/address/district/city/' + district)
                    .then(response => {
                        if(response.status){
                            this.district = response.data
                        }
                        this.$store.dispatch('setLoading', false)
                    })
                    .catch(error => {
                        this.district = []
                    })
            } else {
                this.district = []
            }
        },

        async fetchOngkir(){
            this.$store.dispatch('setLoading', true)
            try {
                let weight = this.product.weight_per_product < 1 ? 1 : this.product.weight_per_product
                let ongkir = await this.$axios.$get(`/v2/address/ongkir/${this.setDistrict}?weight=${weight}`)
                this.$store.dispatch('setLoading', false)
                let logistict = ongkir.data.rajaongkir.results

                let arr = []

                logistict.map(x => {
                    x.costs.map(y => {
                        arr.push({
                            name: x.name +' '+ y.service + ', '+this.$currencyType()+' '+this.$formatNumber(y.cost[0].value) +'/Kg',
                            ongkir:y.cost[0],
                            value:x.name
                        })
                    })
                })
                this.logistict = arr
            } catch (error) {
                throw error
            }
        },

    }
}
</script>

