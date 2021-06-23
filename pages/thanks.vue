<template>
    <div
        id="form-order"
        class="container"
    >
        <div class="row">
            <div class="col-lg-8 col-lg-offset-2">
                <div
                    v-if="order"
                    class="card thanks-card"
                >
                    <div class="card-header">
                        <h2 class="thanks-title ">
                            Terima kasih sudah melakukan order "{{ product.name }}"
                        </h2>
                    </div>
                    <div
                        v-if="payment_type == 'transfer'"
                        class="card-body"
                    >
                        <p class="text-center">
                            Untuk menyelesaikan proses order, silahkan Bayar tagihan anda dengan jumlah :
                        </p>

                        <h3 class="thanks-price">
                            Rp{{ $formatNumber((parseFloat(order.total_price) + 4400)) }}
                        </h3>
                        <div class="copy-text text-center">
                            <button
                                class="btn btn-default btn-sm"
                                @click="onCopy('amount')"
                            >
                                <i class="fa fa-copy" /> Salin Jumlah
                            </button>
                        </div>

                        <div v-if="!order.paid_at">
                            <!-- <p class="text-center mt-1">
                                PILIH METODE PEMBAYARAN
                            </p> -->
                            <div
                                v-if="!order.payment"
                                class="text-center mt-3 mb-1 flex flex-row justify-center"
                            >
                                <button
                                    class="btn btn-info"
                                    @click="onPay(true)"
                                >
                                    BAYAR SEKARANG
                                </button>
                                <!-- <button
                                    class="btn btn-success"
                                    style="margin-left:1rem;"
                                    @click="onPay(false)"
                                >
                                    GOPAY
                                </button> -->
                            </div>
                            <div v-else>
                                <div class="flex flex-row mt-2">
                                    <div class="alert alert-info w-full">
                                        <p class="text-center">
                                            Mohon selesaikan tagihan anda ke nomor rekening dibawah ini :
                                        </p>
                                    </div>
                                </div>
                            
                                <div class="thanks-info">
                                    <img
                                        src="https://d2jnbxtr5v4vqu.cloudfront.net/dropy-product/payment-confirm/logo-home-2020_02_28_17_17_24.png"
                                        alt=""
                                    />
                                
                                    <div
                                        v-if="checkBank == 'bank'"
                                        class="copy-text"
                                    >
                                        <p
                                            v-if="order.payment.payment_type == 'bank_transfer'"
                                            id="accountNumber"
                                            :data-account="order.payment.va_numbers[0].va_number"
                                        >
                                            <span style="text-transform:uppercase;">
                                                BANK {{ order.payment.va_numbers[0].bank }}
                                            </span> <br />
                                            <strong>{{ order.payment.va_numbers[0].va_number }}</strong>
                                        </p>

                                        <p
                                            v-if="order.payment.payment_type == 'echannel'"
                                            id="accountNumber"
                                            :data-account="order.payment.bill_key"
                                        >
                                            Mandiri E-Channel<br />
                                            <strong>{{ order.payment.bill_key }}</strong>
                                        </p>
                                    </div>
                                    <div
                                        v-if="checkBank == 'permata'"
                                        class="copy-text"
                                    >
                                        <p
                                            id="accountNumber"
                                            :data-account="order.payment.permata_va_number"
                                        >
                                            <span style="text-transform:uppercase;">
                                                BANK PERMATA
                                            </span> <br />
                                            <strong>{{ order.payment.permata_va_number }}</strong>
                                        </p>
                                    </div>
                                    <div
                                        v-if="checkBank == 'gopay'"
                                        class="copy-text"
                                    >
                                        <p>BAYAR MENGGUNAKAN GOPAY</p>
                                    </div>
                                    <div
                                        v-if="checkBank != 'gopay'"
                                        class="copy-text"
                                    >
                                        <button
                                            class="btn btn-default btn-sm"
                                            @click="onCopy('rek')"
                                        >
                                            <i class="fa fa-copy" /> Salin No Rekening
                                        </button>
                                    </div>

                                    <div
                                        class="copy-text payment-how-to mt-1"
                                    >
                                        <button
                                            v-if="order.payment"
                                            class="btn btn-warning btn-xs mb-1"
                                            @click="changePayment()"
                                        >
                                            Ganti Metode Pembayaran?
                                        </button>
                                        <p v-if="checkBank != 'gopay'">
                                            Lihat Cara pembayaran disini <a
                                                :href="order.payment.pdf_url"
                                                target="_blank"
                                            >
                                                Cara Pembayaran!
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            v-else
                            class="copy-text text-center mt-2"
                        >
                            <div>
                                <div class="alert alert-success">
                                    <strong>LUNAS!</strong>,<br />Terima kasih, Pembayaran anda telah kami terima.<br /> CS kami akan segera menghubungi anda.
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="checkBank != 'gopay'"
                            class="thanks-confirm"
                        >
                            Konfirmasikan pembayaran anda di: 
                            <nuxt-link :to="`order-confirm?order=${order.invoice_number}`">
                                Konfirmasi Pembayaran
                            </nuxt-link>
                        </div>
                    </div>
                    <div
                        v-else
                        class="card-body"
                    >
                        <p class="text-center">
                            Orderan anda kini kami proses, silahkan tunggu kedatangan kurir dalam 3-4 hari kedepan dan siapkan pembayaran senilai:
                        </p>

                        <h3 class="thanks-price">
                            Rp {{ $formatNumber(order.total_price) }}
                        </h3>
                        <p class="text-center">
                            Untuk dibayarkan ke kurir langsung.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="app-logo">
                    <img
                        src="http://dropy.id/_nuxt/img/542405e.png"
                        alt="Logo Dropy"
                    />
                </div>
            </div>
        </div>
        <input
            id="cb"
            type="text"
            hidden
        />
    </div>
</template>
<script>
export default {
    layout:'NoHeader',
    name:"Thanks",

    head () {
        return {
            title: 'Dropy.id:order success',
            script: [
                { src: 'https://app.midtrans.com/snap/snap.js', 'data-client-key':process.env.MIDTRANS_CLIENT_KEY},
                // { src: 'https://app.sandbox.midtrans.com/snap/snap.js', 'data-client-key':process.env.MIDTRANS_CLIENT_KEY},
                { innerHTML: "window.snap = snap", type: 'text/javascript'}
            ]
        }
    },

    data(){
        return{
            payment_type:'transfer',
            order:null,
            product:null,
            snapToken:null,
            paymentType:'bank_transfer'
        }
    },

    computed:{
        checkBank(){
            if(!this.order || !this.order.payment) return 'oke'
            if(typeof this.order.payment.permata_va_number !== 'undefined'){
                return 'permata'
            }
            if(this.order.payment.payment_type == 'gopay'){
                return 'gopay'
            }
            return 'bank'
        }
    },

    watch:{
        snapToken(newValue){
            if(newValue !== null){
                window.snap.pay(newValue, {
                    onSuccess:(result)=>this.midtransHandlingCallback(result, 'success'),
                    onPending:(result)=>this.midtransHandlingCallback(result, 'pending'),
                    onError:(result)=>this.midtransHandlingCallback(result, 'error'),
                    onClose:(result)=>this.midtransHandlingCallback(result, 'close'),
                    selectedPaymentType:this.paymentType,
                    gopayMode:'auto'
                })
            }
        }
    },

    created(){
        this.fetchOrder()
    },

    methods: {

        async fetchOrder(){
            let invoice = this.$route.query
            if(!invoice.order) return this.$router.push('/sorry')
            try {
                let order = await this.$axios.get(`${process.env.DROPY_BACKEND_URL}/order/${invoice.order}/view`)
                order = order.data
                if(order.status){
                    order = order.data
                    this.payment_type = order.payment_type
                    this.order = order 
                    this.product = order.detail[0].product
                }
            } catch (error) {
                throw error
            }
        },

        onCopy(type){
            
            // $('.clipboard').remove()
            var cb = document.getElementById("cb")
            if(type == 'rek'){
                let rek = document.getElementById('accountNumber').getAttribute('data-account')
                cb.value = rek
            }else{
                cb.value = parseFloat(this.order.total_price) + 4400
            }
            cb.style.display='block'
            cb.select()
            document.execCommand('copy')
            cb.style.display='none'
        },

        // for midtrans
        async getSnapToken(){
            let params = {
                invoice_id: this.order.invoice_number,
                order_id: this.order.id,
                type:"BILL_PRODUCT",
                origin:'dropy',
                mode:this.paymentType
            }
            try {
                let token = await this.$axios.$post(`${process.env.DROPY_BACKEND_URL}/payment/midtrans`,params)
                if(token.status){
                    this.snapToken = token.data
                }
                // this.$store.dispatch('setLoading', false)
            } catch (error) {
                // this.$store.dispatch('setLoading', false)
                throw error
            }
        },

        async midtransHandlingCallback(result, type){
            if(type == 'pending'){
                await this.saveMidtransInfo(result)
                return location.reload()
            }

            return location.reload()
        },

        async saveMidtransInfo(params){
            try {
                let post = await this.$axios.post(`${process.env.DROPY_BACKEND_URL}/payment/midtrans/save-info`, {
                    result:params,
                    invoice:this.order.invoice_number
                })
            } catch (error) {
                throw error
            }
        },

        onPay(status){
            this.paymentType = status ? 'bank_transfer' : 'gopay'
            return this.getSnapToken()
        },

        changePayment(){
            this.$swal({
                title: "Are you sure?",
                text: "Apakah anda yakin mengganti metode pembayaran ?",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    return this.getSnapToken()
                }
            })
        }

    },
}
</script>