<template>
  <div id="app">
    <transition name="route-move">
      <router-view class="child-view" />
    </transition>
    <cube-tab-bar show-slider v-model="selectedLabelDefault" @change="changeHandler" ref="slider">
      <cube-tab v-for="(item,index) in tabs" :key="index" :icon="item.icon" :label="item.value">
        <span>{{item.label}}</span>
        <span class="badge" v-if="showBadge(item.label)">{{cartTotal>50?'50+':cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      selectedLabelDefault: "",
      tabs: [
        {
          label: "Home",
          value: "/",
          icon: "cubeic-home"
        },
        {
          label: "Cart",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "Me",
          value: "/about",
          icon: "cubeic-person"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["cartTotal"])
  },
  watch: {
    $route(to) {
      let selectedLabelDefault = to.path;
      if (to.path === "/login") {
        selectedLabelDefault = this.$route.query.redirect || "/cart";
      }
      this.selectedLabelDefault = selectedLabelDefault;
    }
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val);
    },
    async logOut() {
      await this.$http.get("/api/logout");
    },
    showBadge(label) {
      return label === "Cart" && this.cartTotal > 0;
    }
  },
  created() {
    //初始化页签设置
    this.selectedLabelDefault = this.$route.path;
  }
};
</script>  
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 395px;
  margin: 0 auto;
}
.cube-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
.cube-tab {
  position: relative;
}
.cube-tab-bar-slider {
  top: 0;
}
/* 组件加载动画  */
.route-move-enter {
  transform: translate3d(-100%, 0, 0);
}
.route-move-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-move-enter-active,
.route-move-leave-active {
  transition: transform 0.3s;
}
.child-view {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding-bottom: 50px;
}
.badge {
  position: absolute;
  top: 3px;
  left: 50%;
  transform: translate(-50%, 0);
  margin-left: 15px;
  padding: 0 3px;
  height: 15px;
  border-radius: 15px;
  background: red;
  text-align: center;
  line-height: 15px;
  font-size: 10px;
  color: #fff;
}
</style>
