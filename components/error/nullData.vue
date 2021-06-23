<template>
    <div class="error">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="90"
            height="90"
            fill="#DBE1EC"
            viewBox="0 0 48 48"
            data-v-d5ea9138=""
        >
            <path
                d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z"
                data-v-d5ea9138="" 
            />
        </svg>
        <p>{{ title }}</p>
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String,
            default:''
        }
    }
}
</script>
<style lang="scss">
    .error{
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
</style>