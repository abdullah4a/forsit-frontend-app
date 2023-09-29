<template>
    <transition :appear="true">
        <v-app>
            <v-row justify="space-evenly" v-if="$route.name !== 'ForgotPassword'" class="row-height-full-custom hide-scrollbar">
                <v-col cols="6">
                    <div class="d-inline">
                        <v-img :src="brandImage" height="100"></v-img>
                    </div>
                    <v-card :flat="true" :class="getClass">
                        <v-card-title class="mb-4 text-h6">
                            <h1>{{ getTitle }}</h1>
                        </v-card-title>
                        <v-card-text v-if="getSubtitle !== ''">
                            <p class="text-h5">
                                {{ getSubtitle }}
                            </p>
                        </v-card-text>
                        <v-card-item>
                            <router-view></router-view>
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
            <v-row v-else>
                <router-view />
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
        getClass() {
            const classes = {
                Login: "login-input-card",
                Signup: "signup-input-card",
            };
            return classes[`${this.$route.name}`];
        },
        getTitle() {
            const titles = {
                Login: "Welcome to Ibernia!",
                Signup: "Welcome to Ibernia!",
            };
            return titles[`${this.$route.name}`];
        },
        getSubtitle() {
            const titles = {
                Login: "",
                Signup: "",
            };
            return titles[`${this.$route.name}`];
        }
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
