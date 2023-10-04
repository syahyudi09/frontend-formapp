<template>
    <v-row>
        <v-col cols="10" offset="1" md="4" offset-md="4">
            <v-card>
                <v-toolbar dark class="text-center" color="primary" >
                    <div class="d-flex justify-center w-100">
                        Login
                    </div>
                </v-toolbar>
                <v-card-text>
                    <v-alert color="red lighten" dark v-if="isError">
                        {{ $t(message) }}
                    </v-alert>
                    <v-form ref="form">
                        <v-text-field
                            label="Email"
                            :rules="rules.email" 
                            v-model="form.email" 
                            required/>

                        <v-text-field 
                            label="Password" 
                            type="Password"  
                            :rules="rules.password" 
                            v-model="form.password" 
                            required/>

                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary" 
                        :loading="isLoading"
                        @click="onSubmit">Login
                    </v-btn>
                </v-card-actions>
            </v-card>
            <div class="d-flex align-baseline " >
                    <p>kamu belum punya akun ?</p>
                    <!-- plain  untuk menghilangkan hover ketika di kursor berada dalam button -->
                    <!-- riple untuk menghilangkan hover ketika diklik-->
                    <v-btn
                    text 
                    plain
                    :to="localePath('/register')" 
                    color="primary" 
                    :ripple="false" 
                    class="pl-1">
                        Register
                    </v-btn>
                </div>
        </v-col>
    </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
    layout: 'auth',
    data(){
        return {
            isLoading: false,
            isError: false,
            message: null,
            form: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    (value) => !!value || this.$t('FIELD_REQUIRED',{ field: 'email'}),
                    (value) => /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value) || this.$t('EMAIL_INVALID',{ field: 'email'}), 
                ],
                password: [
                    (value) => !!value || this.$t('FIELD_REQUIRED',{ field: 'password'}),
                    (value) => value.length >= 6 || this.$t('FIELD_MIN',{ field: 6}),
                ]
            }
        }
    },
    methods: {
        async onSubmit(){
            try {
                this.loading = true
                const user = await this.$store.dispatch('auth/login', this.form)
                this.loading = false
            } catch (error) {
                this.isError = true
                this.message = error.response ? error.response.data.message : "SERVER_ERROR"
                this.loading = false
            }
        }
    },
}
</script>