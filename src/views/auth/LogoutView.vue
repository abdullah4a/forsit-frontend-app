<template>
  <div class="home">
    <h1>Stay Relaxed. You're being redirected to Login</h1>
  </div>
</template>
  
  <script lang="ts" setup>
// Import statements
import router from "@/router";
import { onMounted } from "vue";
import { useStore } from "vuex";

// Properties Initialization
const delay = 1000;
const store = useStore();

// functions declaration
const redirect = () => {
  store.dispatch(`auth/logout`).then(() => {
    console.log("Logout called");
    
    router.push({ name: "Login", query: { signedOut: "1" } });
  });
};
  // Hooks
onMounted(() => {
  setTimeout(() => redirect(), delay);
})
</script>
  