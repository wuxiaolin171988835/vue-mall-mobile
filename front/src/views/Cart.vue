<template>
  <div>
    <h2 class="header">购物清单</h2>
    <div v-for="(item,index) in cart" :key="item.id" class="good">
      <div class="left">
        <img :src="item.img" alt class="img" />
        <p class="title">{{ item.title }}</p>
        <p class="price">￥{{ item.price }}</p>
      </div>
      <div class="right">
        <i class="cubeic-remove" @click="minus(index)"></i>
        <span>{{item.count}}</span>
        <i class="cubeic-add" @click="add(index)"></i>
      </div>
    </div>
    <div>总价：￥{{total}}</div>
    <div class="btn">
      <p class="tips" v-if="total<minTotal">
        最低消费￥{{minTotal}}
        <span class="detail-tips">，还差￥{{minTotal-total}}可以购买</span>
      </p>
      <cube-button :disabled="total<minTotal">
        去结算
        <span v-if="!isLogin">(需要登录)</span>
      </cube-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      minTotal: 1000
    };
  },
  computed: {
    ...mapState({
      cart: state => state.cart
    }),
    ...mapGetters(["isLogin", "total"])
  },
  methods: {
    ...mapMutations(["addCount", "minusCount"]),
    minus(index) {
      this.$store.commit("minusCount", index);
    },
    add(index) {
      this.$store.commit("addCount", index);
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  padding: 20px 0;
}
.good {
  padding: 10px;
  text-align: left;
  overflow: hidden;
  .left {
    position: relative;
    padding-left: 48px;
    float: left;
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 40px;
      height: 40px;
    }
    .title {
      font-size: 12px;
    }
    .price {
      color: red;
      margin-top: 10px;
    }
  }
  .right {
    float: right;
  }
  i {
    font-size: 18px;
  }
}
.cube-btn {
  margin: 10px auto;
  width: 150px;
  height: 40px;
  padding: 10px 0;
}
.btn {
  margin-top: 20px;
}
.tips {
  margin-top: 20px;
  font-size: 12px;
}
.detail-tips {
  color: red;
  font-size: 12px;
}
</style>