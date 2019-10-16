import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  getters: {
    isLogin(state) {
      return !!state.token; //转换为boolean
    },
    cartTotal(state) {
      //购物商品总数量
      let num = 0;
      state.cart.forEach(v => (num += v.count));
      return num;
    },
    total(state) {
      //购物车总价
      let num = 0;
      state.cart.forEach(v => (num += v.count * v.price));
      // state.cart.reduce((num,v)=>{num += v.count * v.price},0)
      return num;
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    addCart(state, item) {
      const good = state.cart.find(v => v.id === item.id);
      if (good) {
        good.count++;
      } else {
        state.cart.push({
          ...item,
          count: 1
        });
      }
    },
    addCount(state, index) {
      state.cart[index].count++;
    },
    minusCount(state, index) {
      let good = state.cart[index];
      if (good.count > 1) {
        good.count--;
      } else {
        state.cart.splice(index, 1);
      }
    }
  },
  actions: {}
});
//订阅store的变化
store.subscribe((mutation, state) => {
  switch (mutation.type) {
    case 'setToken':
      localStorage.setItem('token', state.token);
      break;
    case 'addCart':
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
    case 'addCount':
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
    case 'minusCount':
      localStorage.setItem('cart', JSON.stringify(state.cart));
      break;
  }
});

export default store;
