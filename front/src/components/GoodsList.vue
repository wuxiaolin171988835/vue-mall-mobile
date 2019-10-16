<!--
 * @Description:商品列表  
 * @Author: wuxiaolin
 * @Date: 2019-09-23 21:40:55
 * @LastEditTime: 2019-10-02 21:28:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <div v-for="item in goods" :key="item.id" class="good">
      <router-link :to="`/detail/${item.id}`">
        <div class="left">
          <img :src="item.img" alt @click.stop.prevent="imgPreview(item.img)" />
        </div>
        <div class="right">
          <div class="title">{{item.title}}</div>
          <div class="info">
            <i class="cubeic-add" @click.stop.prevent="addCart($event,item)"></i>
            <span>{{item.count}}人购买</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  props: ["goods"],
  methods: {
    addCart($event, good) {
      //加入购物车
      this.$store.commit("addCart", good);
      //将点击事件派发出去，将目标对象作为参数传递出去
      this.$emit("addCart", $event.target);
    },
    imgPreview(img) {
      this.$createImagePreview({
        imgs: [img]
      }).show();
    }
  }
};
</script>

<style lang="scss" scoped>
.good {
  padding: 10px;
  overflow: hidden;

  .left {
    width: 100px;
    float: left;
    img {
      width: 100%;
    }
  }

  .right {
    margin-left: 120px;
    text-align: left;

    .title {
      line-height: 30px;
    }

    .cubeui-add {
      font-size: 22px;
    }
  }
}
</style>