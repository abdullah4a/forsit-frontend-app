<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="5">
        <v-text-field
          variant="outlined"
          class="py-1"
          v-model="user.firstName"
          :rules="firstNameRules"
          label="First Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="5">
        <v-text-field
          variant="outlined"
          class="py-1"
          v-model="user.lastName"
          :rules="lastNameRules"
          label="Last Name"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          variant="outlined"
          class="py-1"
          v-model="user.userName"
          :rules="userNameRules"
          label="Username"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="5">
        <v-text-field
          variant="outlined"
          class="py-1"
          type="password"
          v-model="user.password"
          :rules="passwordRules"
          label="Password"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="5">
        <v-text-field
          variant="outlined"
          class="py-1"
          type="password"
          v-model="user.confirmPassword"
          :rules="[
                (v: any) => !!v || 'phone is required',
                (v: string) => v === user.password || `Password didn't matched`,
              ]"
          label="Confirm Password"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          variant="outlined"
          class="py-1"
          name="phone"
          v-model="user.phoneNumber"
          :rules="phoneRules"
          label="Country"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="checkbox"
          :rules="[(v: any) => !!v || 'You must agree to continue!']"
          label="I agree and consent to the Terms of Business, its policies, and the Privacy Policy."
          required
        ></v-checkbox>
      </v-col>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="4">
          <div class="d-flex flex-wrap justify-center">
            <v-btn color="primaryDeep" class="mt-2" @click="register()">
              Register
            </v-btn>
          </div>
        </v-col>
        <v-col cols="4"></v-col>
      </v-row>
      <v-divider class="my-4"></v-divider>
      <v-row>
        <v-col cols="4"></v-col>
        <v-col cols="6">
          Already have an account?
          <router-link :to="{ name: 'Login' }" class="mx-1"
            >Sign in</router-link
          >
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-row>
  </v-form>
</template>
<script lang="ts">
import { generalStorage } from "@/storages/generalStorage";
import { localStorageKeys } from "@/utils/enum/localStorageKeys.enum";

export default {
  computed: {
    // loginPageImageSavings() {
    //   return require("@/assets/auth/savings_over_time.svg");
    // },
    // loginPageImageMain() {
    //   return require("@/assets/auth/main.svg");
    // },
    // brandImage() {
    //   return require("@/assets/auth/brand-logo-small.png");
    // },
  },
  data() {
    return {
      checkbox: false,
      user: {
        firstName: "",
        lastName: "",
        userName: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      },
      userNameRules: [
        (v: string) => !!v || "Username is required",
        (v: string) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Email must be valid",
      ],
      phoneRules: [
        (v: string) => !!v || "phone is required",
        (v: string) =>
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v) ||
          "Phone Number must be valid",
      ],
      firstNameRules: [(v: string) => !!v || "First Name is required"],
      lastNameRules: [(v: string) => !!v || "Last Name is required"],

      passwordRules: [],
    };
  },
  methods: {
    register() {
      console.log("Registering User");
      // Validate user
      this.$refs["form"].validate().then((valid: any) => {
        if (!valid) {
          alert("Please fill all fields correctly.");
        } else {
          const userData = { ...this.user } as any;
          delete userData["confirmPassword"];
          this.$store
            .dispatch("auth/signUp", { ...userData })
            .then((user: Record<string, any>) => {
              generalStorage.setLocalItem(localStorageKeys.USER, user);
            })
            .catch((err: any) => {
              throw err;
            });
        }
      });
    },
  },
};
</script>
<style scoped>
.v-row {
  margin: 0;
  padding: 0;
}

.v-col {
  margin: 0;
  padding: 0;
}
</style>
