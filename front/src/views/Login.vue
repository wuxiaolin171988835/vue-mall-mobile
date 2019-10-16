<template>
  <div>
    <cube-form :model="model" :schema="schema" @validate="validateHandler" @submit="loginHandler"></cube-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      validity: {},
      valid: undefined,
      model: {
        //数据模型
        username: "",
        password: ""
      },
      schema: {
        //表单结构模型
        fields: [
          {
            type: "input",
            modelKey: "username",
            label: "用户名",
            props: {
              placeholder: "请输入用户名"
            },
            rules: {
              required: true
            },
            trrigger: "blur",
            messages: {
              required: "用户名为必填项"
            }
          },
          {
            type: "input",
            modelKey: "password",
            label: "密码",
            props: {
              placeholder: "请输入密码",
              type: "password",
              eye: {
                open: false
              }
            },
            rules: {
              required: true
            },
            trrigger: "blur",
            messages: {
              required: "密码为必填项"
            }
          },
          {
            type: "submit",
            label: "登录"
          }
        ]
      }
    };
  },
  methods: {
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    async loginHandler(e) {
      e.preventDefault();
      //get方式
      // const res = await this.$http.get("http://localhost:3001/api/login", {
      //   params: {
      //     username: this.model.username,
      //     password: this.model.password
      //   }
      // });
      //post方式
      const res = await this.$http.post("http://localhost:3001/api/login", {
        username: this.model.username,
        password: this.model.password
      });
      const { code, token, message } = res.data;

      if (code === 0) {
        //登录成功
        localStorage.setItem("token", token);
        this.$store.commit("setToken", token);
        //重定向
        const redirect = this.$route.query.redirect || "/";
        this.$router.push(redirect);
      } else {
        //登录失败
        const toast = this.$createToast({
          time: 1000,
          txt: message || "登录失败",
          type: "error"
        });
        toast.show();
        setTimeout(() => {
          toast.hide();
        }, 2000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>