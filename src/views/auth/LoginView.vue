<template>
  <v-form ref="form">
    <v-text-field variant="outlined" class="py-1" v-model="user.userName" :rules="userNameRules"
      label="Username / Phone No." required>
    </v-text-field>
    <v-text-field variant="outlined" class="py-1" type="password" v-model="user.password" :rules="passwordRules"
      label="Password" required>
    </v-text-field>
    <div class="d-flex flex-wrap justify-end">
      <router-link :to="{ name: 'ForgotPassword' }" class="mx-4">
        Forgot Password ?
      </router-link>
    </div>
    <div class="d-flex flex-wrap justify-center">
      <v-btn color="primaryDeep" class="mt-4" :block="false" @click="login()">
        Login
      </v-btn>
    </div>
    <v-divider class="my-4"></v-divider>
    <div class="d-flex flex-wrap justify-center">
      Don't have an account
      <router-link :to="{ name: 'Signup' }" class="mx-1">Sign up</router-link>
    </div>
  </v-form>
</template>
<script lang="ts">
export default {
  data() {
    return {
      user: {
        userName: "",
        password: "",
      },
      userNameRules: [
        (v: string) => !!v || "userName is required",
        (v: string) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Email must be valid",
      ],
      passwordRules: [(v: string) => !!v || "Password is required"],
      processing: false,
    };
  },
  methods: {
    async login() {
      // const result = await this.$refs["form"].validate();
      // if (result) {
      //   const username = this.user.userName
      //   const password = this.user.password
      //   this.processing = true;
      //   this.$store
      //     .dispatch("auth/login", {
      //       username,
      //       password,
      //     })
      //     .then(async (response: any) => {
      //       if (!response.error) {
              //       this.openSnack(
              //         "Success, Welcome " + response.firstName,
              //         "primaryDeep"
              //       );
              await this.handleSuccess();
            // }
      //     })
      //     .catch((error: any) => {
      //       this.openSnack(error.message, "red-darken-2");
      //       this.processing = false;
      //       throw error;
      //     });
      // }
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
      // const originalPage = this.$route.query.next||'/';
      // const redirectTo = originalPage
      //   ? { path: originalPage as string }
      //   : { name: "Login" };
      // await router.push(redirectTo);
      console.log("Redirecting");
      await this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style scoped></style>
