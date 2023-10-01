import { createStore } from 'vuex'
import AuthStore from './auth'
import ProductStore from './products'
export default createStore({
  modules: {
    auth: AuthStore,
    product: ProductStore
  }
})