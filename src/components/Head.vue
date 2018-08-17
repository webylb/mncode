<template>
  <div class="head">
    <span>{{title}}</span>
    <ul>
      <li v-for="(user,index) in userList" :key="index">
        <span>{{ user.name }}</span>
        <span>{{ user.age }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "head",
  props: {
    userList: {
      type: Array
    }
  },
  data() {
    return {
      title: "this is title1"
    };
  },
  methods: {
    changeTitle() {
      console.log(this.title);
    }
  }
};
</script>
<style lang="less" scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
