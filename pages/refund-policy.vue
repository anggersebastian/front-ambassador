<template>
    <div class="header1">
        <header>
            <nuxt-link
                to="/"
                type="button"
                class="btn btn-primary mt-1 "
            >
                <i
                    class="fa fa-arrow-left"
                    aria-hidden="true"
                > Back</i>
            </nuxt-link>
            <h2>Refund Policy</h2>
        </header>

        <div
            id="refund"
            class="container mt-1"
        >
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel">
                        <div class="panel-body">
                            <p>
                                To place a refund, return or exchange request for an order placed with dropy.id, You would need to contact dropy.id via email at info@dropy.id, by phone at 021-22302193.
                            </p>
                            <p>
                                Please have your order number available and provide a reason for your request in order to speed up your refund process. Your request will be reviewed within a 2 days standard response period and we will notify you via email of the results. We reserve the right to extend the standard response time in exceptional cases with a prior notice to you.
                            </p>
                            <p>
                                In cases of Direct Debit, the refund request can be processed only after a 6 weeks period from the payment date, period needed for your bank process settlement to complete. dropy.id will only review and respond to your refund request after these 6 weeks period ends.
                            </p>
                            <p>
                                Refund, returns or exchanges request are accepted up to 30 days from the date of placing the Order with dropy.id. dropy.id may grant extensions to this period for some special cases and Products at its discretion.
                            </p>
                            <p>
                                If you choose to pay by check or money order you may cancel your Order before making the payment or in case the payment is not received by us in 30 days dropy.id will cancel you Order.
                            </p>
                            <p>
                                You may submit a request to cancel your order on the same day the order was placed. Please note that if the Order is already shipped or delivered we will not be able to approve the cancelation request.
                            </p>
                            <p>
                                Some products have special conditions for returns as described in the Order or Product materials delivered ("Products terms") so please read the carefully before making a request with dropy.id. In case of misunderstandings between dropy.id Refund Policy and the Product terms, the present Refund policy will prevail. Shipping costs are non-refundable, except if due to dropy.id error, when you need to contact dropy.id and make a formal request.
                            </p>
                            <p>
                                If the refund request is granted by dropy.id, payments are refunded as follows:
                            </p>
                            <ul class="refund-list">
                                <li>
                                    Credit / Debit Cards payments will be refunded within 1-3 business days; Wire Transfer and check payments will be refunded within seven (7) business days and the cost of transfer will be supported by the end user;
                                </li>
                                <li>
                                    If applicable, dropy.id reserve the right to hold the refund payment until we receive a completed letter of destruction of the Product signed by you.
                                </li>
                                <li>
                                    The present Refund policy is part of the dropy.id TERMS AND CONDITIONS.
                                </li>
                            </ul>
                            <p>
                                Last update: 5 April 2020 
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Footer from '~/components/Footer.vue'
export default {
    layout:'NoHeader',
    name:"RefundPolicy",

    components:{
        Footer
    },
}
</script>
<style lang="scss" scoped>
    header{
        /* background-color: blue; */
        background: linear-gradient(90deg,#5b86e5,#36d1dc);
        background-color: rgba(0, 0, 0, 0);
        text-align: center;
        text-shadow: 2px 2px 2px grey;
        font-weight: bold;
        color: white;
        padding: 10px;
    }

    p{
        text-align: justify;
    }
    a{
        float: left;
        margin-left: 20px;
    }

    .refund-list{
        list-style: decimal;
        margin: 0;
        padding-left: 3rem;
        margin: 1rem 0px;
        font-size: 13px;
        font-weight: bold;
    }
</style>

