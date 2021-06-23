<template>
    <div
        id="product_id"
        class="container rts-product-detail"
    >
        <div class="row">
            <Breadcrumb />
        </div>
    </div>
</template>
<script>
import Breadcrumb from "~/components/Breadcrumb.vue"
export default {
    middleware: ['auth'],

    components: {
        Breadcrumb
    }
}
</script>
