<template>
    <div class="container">
        <div class="error">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="90"
                fill="#DBE1EC"
                viewBox="0 0 48 48"
            >
                <path d="M22 30h4v4h-4zm0-16h4v12h-4zm1.99-10C12.94 4 4 12.95 4 24s8.94 20 19.99 20S44 35.05 44 24 35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z" />
            </svg>
            <div
                v-if="error.statusCode === 404"
                class="title"
            >
                Page not found
            </div>
            <div
                v-if="error.statusCode === 500"
                class="title"
            >
                Not implemented
            </div>
            <div
                v-if="error.statusCode === 401"
                class="title"
            >
                Not authorized
            </div>
            <div class="description">
                <p>
                    <a
                        href="javascript:;"
                        @click="()=>$router.push('/')"
                    >
                        Go to Home
                    </a>
                </p>
            </div>
        </div>
    </div>  
</template>
<script>
export default {
    props: {
        error:{
            type:Object,
            default:()=>{}
        }
    },
    
    // layout: 'blog' // you can set a custom layout for the error page
}
</script>
<style lang="scss" scoped>
    .error{
        min-height: 85vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .title{
        font-size: 24px;
        color: #b7b3b3;
    }

    .description{
        a{
            font-size: 14px;
            margin-top: 1rem;
            color: #639010;
            letter-spacing: 1px;
            font-style: oblique;
            text-decoration: underline;
        }
    }
</style>