<!--
 * @Description: 商品首页
 * @Author: wuxiaolin
 * @Date: 2019-09-20 16:01:29
 * @LastEditTime: 2019-10-02 21:28:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="home">
    <div class="nav">
      <cube-button @click="()=>{$refs.drawer.show()}">商品分类</cube-button>
    </div>
    <!-- 轮播图 -->
    <cube-slide ref="slide" :data="banners">
      <cube-slide-item v-for="item in banners" :key="item.id">
        <img :src="item.img" class="slider" />
      </cube-slide-item>
    </cube-slide>
    <!-- 商品分类 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" @select="selectHandler"></cube-drawer>
    <!-- 商品列表 -->
    <goods-list :goods="filterGoods" @addCart="onAddCart"></goods-list>
    <!-- 加入购物车小球 -->
    <div class="ball-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import GoodsList from "@/components/GoodsList.vue";
const labels = {
  dior: "迪奥",
  armani: "阿玛尼",
  chanel: "香奈儿",
  ysl: "圣罗兰"
};
export default {
  name: "home",
  data() {
    return {
      banners: [], //轮播图
      goods: [], //所有商品列表
      goodsKeys: [], //商品分类
      selectedGoodsKeys: [], //选中的商品分类
      //加入购物车小球
      ball: {
        show: false,
        el: null //目标 dom引用
      }
    };
  },
  computed: {
    filterGoods() {
      let res = [];
      this.selectedGoodsKeys.forEach(v => {
        res = [...res, ...this.goods[v]];
      });
      return res;
    },
    drawerList() {
      return this.goodsKeys.map(v => {
        return {
          value: v,
          text: labels[v]
        };
      });
    }
  },
  components: {
    GoodsList
  },
  methods: {
    selectHandler(selectedVal) {
      this.selectedGoodsKeys = [...selectedVal];
    },
    onAddCart(el) {
      this.ball.el = el;
      this.ball.show = true;
    },
    beforeEnter(el) {
      //动画初始值设置
      // 1、获取点击dom坐标
      const dom = this.ball.el;
      const rect = dom.getBoundingClientRect();
      //2、计算点击坐标
      const x = rect.left - window.innerWidth / 2;
      const y = -(window.innerHeight - rect.top - 30);
      el.style.display = "";
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    },
    enter(el, done) {
      //获取offsetHeight触发重绘
      document.body.offsetHeight;
      el.style.transform = `translate3d(0,0,0)`;
      el.addEventListener("transitionend", done);
    },
    afterEnter(el) {
      this.ball.show = false;
      el.style.display = "none";
    }
  },
  async created() {
    const bannersRes = await this.$http.get("/api/banners");
    this.banners = bannersRes.data.list;
    const goodsRes = await this.$http.get("/api/goods");
    this.goods = goodsRes.data.list;
    this.goodsKeys = goodsRes.data.keys;
    this.selectedGoodsKeys = [...this.goodsKeys];
  }
};
</script>
<style lang="scss" scoped>
.cube-slide-item > img.slider {
  height: 200px;
  width: 100%;
}
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 200;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
  }
}
</style>
