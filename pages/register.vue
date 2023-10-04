<template>
    <v-row>
        <v-col cols="10" offset="1" md="4" offset-md="4">
            <v-card>
                <v-toolbar dark color="primary">Register</v-toolbar>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field 
                            label="Fullname" 
                            :rules="rules.fullname" 
                            v-model="form.fullname" 
                            required/>

                        <v-text-field 
                            label="Email"
                            :rules="rules.email" 
                            v-model="form.email" 
                            @keydown="resetEmailExitsMessage" 
                            required/>

                        <v-text-field 
                            label="Password" 
                            type="Password"  
                            :rules="rules.password" 
                            v-model="form.password" 
                            required/>

                        <v-text-field 
                            label="Confirm Password" 
                            type="password" 
                            :rules="rules.password_confirmation" 
                            v-model="form.password_confirmation" 
                            required/>

                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary" 
                        :loading="isLoading"
                        @click="onSubmit">Register
                    </v-btn>
                </v-card-actions>
            </v-card>
            <div class="d-flex align-baseline " >
                    <p>kamu belum punya akun ?</p>
                    <!-- plain  untuk menghilangkan hover ketika di kursor berada dalam button -->
                    <!-- riple untuk menghilangkan hover ketika diklik-->
                    <v-btn   text plain to="/login" color="primary" :ripple="false" class="pl-1">
                        Login
                    </v-btn>
                </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    layout: 'auth',
    data(){
        return {
            emailExits: false,
            isLoading: false,
            form: {
                fullname: '',
                email: '',
                password: '',
                password_confirmation: '',
            },
            rules: {
                fullname: [
                    (value) => !!value || this.$t('FIELD_REQUIRED',{ field: 'fullname'}),
                ],
                email: [
                    (value) => !!value || this.$t('FIELD_REQUIRED',{ field: 'email'}),
                    (value) => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value) || this.$t('EMAIL_INVALID',{ field: 'email'}),
                    (value) => !this.emailExits ||  this.$t('EMAIL_EXITS',{ field: 'email'}),
                ],
                password: [
                    (value) => !!value || this.$t('FIELD_REQUIRED',{ field: 'password'}),
                    (value) => value.length >= 6 ||this.$t('FIELD_MIN',{ field: 6}),
                ],
                password_confirmation: [
                (value) => !!value || this.$t('FIELD_REQUIRED',{ field: 'password Konfirmasi'}),
                (value) => value === this.form.password || this.$t('FIELD_CONFIRM',{fieldconfirm: 'Konfirmasi Password', field: 'password'}),
                ]
            }
        }
    },
    methods: {
        resetEmailExitsMessage(){
            this.emailExits = false
        },
        async onSubmit(){
            try {
                if(this.$refs.form.validate()){
                    this.isLoading = true
                const response = await this.$axios.$post('http://localhost:3000/register', this.form);
                console.log(response)
                
                }
            } catch (error) {
                if(error.response.data.message == 'EMAIL_ALREADY_EXISTS'){
                    this.emailExits = true
                    this.$refs.form.validate()
                }
                this.isLoading = false
            }
        }
    }
}
</script>