<template>
    <Row class="header layout">
        <Col span="24">
            <Header :style="{position: 'fixed',width: '100%',padding: '0',background: '#fff'}">
                <Menu mode="horizontal" :theme="theme" class="header-menu">
                  <Row type="flex" justify="center" class="code-row-bg">
                      <Col :xs="18" :sm="16" :md="16" :lg="14" >
                          <div class="layout-logo">
                            <router-link :to="{name:'home'}" class="brand">
                                <img src="https://bihu.com/static/media/logo.81b9b93e.png">
                            </router-link>
                          </div>
                          <div class="layout-nav">
                              <MenuItem name="1">
                                  登陆
                              </MenuItem>
                              <MenuItem name="2">
                                  注册
                              </MenuItem>
                          </div>
                      </Col>
                  </Row>
                </Menu>
            </Header>
        </Col>
    </Row>
</template>
<script>
export default {
  name: "header",
  props: {
    userList: {
      type: Array
    }
  },
  data() {
    return {
      theme: "light"
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
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.header-menu {
  height: 65px;
  line-height: 65px;
  .code-row-bg {
    height: 65px;
    .layout-logo {
      width: 110px;
      height: 100%;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 0px;
      left: 20px;
      .brand {
        display: inline-block;
        width: 100%;
        height: 100%;
        padding: 12px 0;
        img {
          width: 100%;
        }
      }
    }
    .layout-nav {
      display: inline-block;
      height: 65px;
      float: right;
    }
  }
}

</style>
