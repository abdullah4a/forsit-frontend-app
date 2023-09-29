import { RouteRecordRaw } from "vue-router";
import Login from "@/views/auth/LoginView.vue";
import Logout from "@/views/auth/LogoutView.vue";
import Signup from "@/views/auth/SignupView.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth/login",
    name: "Login",
    component: Login,
    meta: { layout: "AuthLayout", guest: true },
  },
  {
    path: "/auth/register",
    name: "Signup",
    component: Signup,
    meta: { layout: "AuthLayout", guest: true },
  },
  {
    path: "/auth/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { layout: "AuthLayout", guest: true },
  },
  {
    path: "/auth/logout",
    name: "Logout",
    component: Logout,
    meta: { layout: "AuthLayout", guest: false },
  },
];

export default routes;
