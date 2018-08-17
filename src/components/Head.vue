<template>
    <Row class="head layout">
        <Col span="24">
            <Header :style="{position:'fiexd',width: '100%',padding: '2px 0px',background: '#fff'}">
                <Menu mode="horizontal" :theme="theme">
                  <Row type="flex" justify="center" class="code-row-bg">
                      <Col span="18">
                          <div class="layout-logo">
                            <router-link :to="{name:'home'}" class="brand">
                                <img src="https://bihu.com/static/media/logo.81b9b93e.png">
                            </router-link>
                          </div>
                          <div class="layout-nav">
                              <MenuItem name="1">
                                  <Icon type="ios-navigate"></Icon>
                                  Item 1
                              </MenuItem>
                              <MenuItem name="2">
                                  <Icon type="ios-keypad"></Icon>
                                  Item 2
                              </MenuItem>
                              <MenuItem name="3">
                                  <Icon type="ios-analytics"></Icon>
                                  Item 3
                              </MenuItem>
                              <MenuItem name="4">
                                  <Icon type="ios-paper"></Icon>
                                  Item 4
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
  name: "head",
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
    padding: 10px 0;
    img {
      width: 100%;
    }
  }
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
