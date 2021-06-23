<template>
    <div>
        <ul
            v-if="isShow"
            class="flash-time"
        >
            <!-- <li>
                <span class="timer">
                    {{ days }}
                </span>
                <span>Day</span>
            </li> -->
            <li>
                <span class="timer">
                    {{ hours }} 
                </span>
                <!-- <span>Hours</span> -->
            </li>
            <li>
                <span class="timer">
                    {{ minutes }}
                </span>
                <!-- <span>Mins</span> -->
            </li>
            <li>
                <span class="timer">
                    {{ seconds }} 
                </span>
                <!-- <span>Sec</span> -->
            </li>
        </ul>
        <div
            v-else
            class="product-flash-closed"
        >
            <p>Closed</p>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        date:{
            type:Number,
            default:null
        }
    },

    data:function(){
        return {
            now: Math.trunc((new Date()).getTime() / 1000),
            isShow:true
        }
    },

    computed:{
        seconds() {
            return (this.date - this.now) % 60
        },
        minutes() {
            let minutes =  Math.trunc((this.date - this.now) / 60) % 60
            if(minutes > 0) return minutes
            this.toggleShow()
            return 0
        },
        hours() {
            let hours =  Math.trunc((this.date - this.now) / 60 / 60) % 24
            if(hours > 0) return hours
            return 0
        },
        days() {
            let days =  Math.trunc((this.date - this.now) / 60 / 60 / 24)
            if(days > 0) return days
            return 0

        }
    },

    mounted() {
        window.setInterval(() => {
            this.now = Math.trunc((new Date()).getTime() / 1000)
        },1000)
    },

    methods:{
        toggleShow(){
            this.isShow = false
        }
    }
}
</script>