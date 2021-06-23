<template>
    <div class="col-lg-12">
        <ol class="breadcrumb">
            <li>
                <nuxt-link :to="localePath('index')">
                    Home
                </nuxt-link>
            </li>
            <li
                v-for="(item, index) in list"
                :key="index"
            >
                <nuxt-link :to="localePath({path:item.slug})">
                    {{ item.name }}
                </nuxt-link>
            </li>
        </ol>
    </div>
</template>
<script>
export default {
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
            
        }
    }
}
</script>