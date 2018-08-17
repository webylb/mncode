<template>
  <div class="home">
    <Head :userList="userList" />
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Category msg="Welcome to Your Vue.js App"/>
    <Foot/>
  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Category from "@/components/Category.vue";
import Foot from "@/components/Foot.vue";

export default {
  name: "home",
  data() {
    return {
      userList: [
        {
          id: "1",
          name: "黄仔",
          age: "27"
        },
        {
          id: "2",
          name: "鱼仔",
          age: "28"
        }
      ]
    };
  },
  components: {
    Head,
    Category,
    Foot
  }
};
</script>
