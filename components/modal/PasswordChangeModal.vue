<template>
    <div
        class="modal"
        role="dialog"
    >
        <div class="modal-dialog modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                    >
                        &times;
                    </button>
                    <h4 class="modal-title">
                        Form change password
                    </h4>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label
                            for="old_password"
                            class="control-label"
                        >
                            Old Password
                        </label>
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                        >
                    </div>
                    <div class="form-group">
                        <label
                            for="new_password"
                            class="control-label"
                        >
                            New Password
                        </label>
                        <input
                            v-model="newPassword"
                            type="password"
                            class="form-control"
                        >
                    </div>
                    <div class="form-group">
                        <label
                            for="confirm__password"
                            class="control-label"
                        >
                            Confirm New Password
                        </label>
                        <input
                            v-model="confirmPassword"
                            type="password"
                            class="form-control"
                        >
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        class="btn btn-info"
                        @click="submitForm()"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{

        updateProces:{
            type:Function,
            default(){
                return 0
            }
        }
    },

    data(){
        return{
            password:'',
            newPassword:'',
            confirmPassword:''
        }
    },

    methods:{
        submitForm(){
            let body = {
                password:this.password,
                newPassword:this.newPassword,
                confirmPassword:this.confirmPassword
            }

            return this.updateProces(body)
        }
    }
}
</script>

<style lang="scss">
  
</style>