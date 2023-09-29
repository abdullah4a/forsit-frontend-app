<template>
    <transition :appear="true">
        <v-app>
            <v-row justify="space-evenly" class="row-height-full-custom hide-scrollbar">
                <v-col cols="6">
                    <div class="d-inline">
                        <v-img :src="brandImage" height="100"></v-img>
                    </div>
                    <div class="d-flex flex-wrap justify-start" v-if="$route.name === 'ForgotPassword'">
                        <v-btn :to="{ name: 'Login' }" variant="plain" :ripple="false" prepend-icon="mdi-arrow-left"
                            class="ms-16 ps-12">
                            Back to Login
                        </v-btn>
                    </div>
                    <v-card :flat="true" class="login-input-card" :class="submitted ? 'mt-16' : ''">
                        <v-card-title class="mb-4 text-h6">
                            <h1>{{ getTitle }}</h1>
                        </v-card-title>
                        <v-card-text>
                            <p class="text-h5">
                                {{ getSubtitle }}
                            </p>
                        </v-card-text>
                        <v-card-item>
                            <v-form ref="form" v-if="!submitted">
                                <v-text-field variant="outlined" class="py-5" type="email" v-model="userName"
                                    :rules="userNameRules" label="Email" required>
                                </v-text-field>
                                <div class="d-flex flex-wrap justify-center">
                                    <v-btn color="primaryDeep" class="mt-4" :block="false" @click="submit">
                                        Send password reset link
                                    </v-btn>
                                </div>
                            </v-form>
                            <v-card v-else :flat="true">
                                <v-card-actions class="ps-16">
                                    <v-btn variant="flat" class="ms-16" color="primaryDeep" theme="dark">
                                        Open mail app
                                    </v-btn>
                                </v-card-actions>
                                <v-card-actions class="d-flex flex-wrap justify-start">
                                    Didn't receive the email? Click to <a href="/auth/forgot-password"
                                        class="px-1">resend</a>
                                </v-card-actions>
                            </v-card>
                        </v-card-item>
                    </v-card>
                    <v-footer>
                        <!-- <AuthFooter /> -->
                    </v-footer>
                </v-col>
                <v-col cols="6">
                    <v-sheet :flat="true" color="primaryDeep" class="card-height-full-custom" theme="dark">
                        <div class="login-text-card px-16">
                            <v-card-title class="text-h4 login-text px-14">
                                Get a free 28-day trial
                            </v-card-title>
                            <v-card-text class="login-text px-16">
                                <div class="text-h6 font-weight-black px-16">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor accusantium magni veniam
                                    saepe architecto consequatur?
                                </div>
                            </v-card-text>
                        </div>
                        <div class="auth-images">
                            <v-img :src="loginPageImageSavings" class="auth-image-back"></v-img>
                            <v-img :src="loginPageImageMain" class="auth-image-front"></v-img>
                        </div>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-app>
    </transition>
</template>

<script lang="ts">

export default {
    computed: {
        loginPageImageSavings() {
            return require("@/assets/auth/savings_over_time.svg");
        },
        loginPageImageMain() {
            return require("@/assets/auth/main.svg");
        },
        brandImage() {
            return require("@/assets/logo.png");
        },
        getTitle() {
            let title = "Forgot Password"
            if (this.submitted) {
                title = 'Check your email'
            }
            return title;
        },
        getSubtitle() {
            let subtitle = "Lorem ipsum dolor sit amet consectetur. Facilisis nunc id proin sed lectus urna in.";
            if (this.submitted)
                subtitle = 'We sent a password reset link to test@gmail.com'
            return subtitle;
        }
    },
    data() {
        return {
            userName: "",
            userNameRules: [
                (v: string) => !!v || "userName is required",
                (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email must be valid"],
            processing: false,
            submitted: false
        };
    },
    methods: {
        async submit() {
            const result = await this.$refs["form"].validate();
            if (result) {
                // const username=this.user.userName
                // const password=this.user.password
                // this.processing = true;
                // this.$store
                //   .dispatch("auth/sendPasswordReset", {
                //     username,
                //     password,
                //   })
                //   .then((response: any) => {
                //     if (!response.error) {
                //       this.openSnack(
                //         "Success, Welcome " + response.firstName,
                //         "primaryDeep"
                //       );
                await this.handleSuccess();
            }
            //       })
            //       .catch((error: any) => {
            //         this.openSnack(error.message, "red-darken-2");
            //         this.processing = false;
            //         throw error;
            //       });
            //   }
        },

        openSnack(msg: string, cls: string) {
            const snackBar = { snackbar: true, color: cls, text: msg, timeout: 2000 };
            console.log(snackBar);
        },
        closeSnackBar(close: boolean) {
            const snackBar = { snackbar: close };
            console.log(snackBar);
        },
        async handleSuccess() {
            this.processing = false;
            this.submitted = true;
            // const originalPage = this.$route.query.next||'/';
            // const redirectTo = originalPage
            //   ? { path: originalPage as string }
            //   : { name: "Login" };
            // await router.push(redirectTo);
        },
    },
};
</script>

<style scoped>
.v-enter-from,
.v-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.v-enter-active {
    transition: all 1s ease-in;
}

.v-leave-active {
    transition: all 1s ease-out;
}

.v-row {
    margin: 0;
    padding: 0;
}

.v-col {
    margin: 0;
    padding: 0;
}

.hide-scrollbar {
    overflow: hidden;
    scrollbar-width: none;
}
</style>
