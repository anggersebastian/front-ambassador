<template>
    <ul class="order">
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
        <li class="order-item order-body">
            <content-loader
                :height="70"
                :width="848"
                :speed="3"
                primary-color="#ffffff"
                secondary-color="#ecebeb"
            >
                <rect
                    x="236.77"
                    y="38.13"
                    rx="0"
                    ry="0"
                    width="0"
                    height="0"
                /> 
                <rect
                    x="28.77"
                    y="10.13"
                    rx="0"
                    ry="0"
                    width="72"
                    height="48.16"
                /> 
                <rect
                    x="167.77"
                    y="22.13"
                    rx="0"
                    ry="0"
                    width="109"
                    height="22"
                /> 
                <rect
                    x="396.77"
                    y="22.13"
                    rx="0"
                    ry="0"
                    width="109"
                    height="22"
                /> 
                <rect
                    x="609.77"
                    y="22.13"
                    rx="0"
                    ry="0"
                    width="83.93"
                    height="22"
                /> 
                <circle
                    cx="797.46"
                    cy="33.82"
                    r="10.19"
                />
            </content-loader>
        </li>
    </ul>
</template>
<script>
import { ContentLoader } from "vue-content-loader"

export default {
    components: {
        ContentLoader
    }
}
</script>