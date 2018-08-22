<template>
  <div class="home">
    <Header :style="{'z-index': '1'}"></Header>
    <Row type="flex" justify="center" class="code-row-bg" :style="{'z-index': '0'}">
        <Col :xs="0" :sm="4" :md="4" :lg="2" >
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
            <Menu :theme="theme" active-name="1" @on-select="SelectLeftMenu">
                <MenuGroup title="内容管理">
                  <MenuItem name="1">
                      <Icon type="md-document" />
                      文章管理
                  </MenuItem>
                  <MenuItem name="2">
                      <Icon type="md-chatbubbles" />
                      评论管理
                  </MenuItem>
              </MenuGroup>
            </Menu>
        </Content>
        </Col>
        <Col :xs="18" :sm="14" :md="14" :lg="10" >
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
            <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="SelectMenu">
                <MenuItem name="1" >
                    热门
                </MenuItem>
                <MenuItem name="2">
                    最新
                </MenuItem>
            </Menu>
            <ul class="articlList">
                <li v-for="(item, index) in articleList" :key="index" class="articlList-item">
                    <div class="articl-avatar-item">
                        <router-link :to="'/user/' + item.userId" >
                            <img :src="'https://oss02.bihu.com/' + item.userIcon" alt="">
                            <div class="aritcl-user">
                                <p>{{ item.userName }}</p>
                                <time class="time">{{$utils.timeFormat(item.createTime)}}</time>
                            </div>
                        </router-link>
                    </div>
                    <div class="aritcl-info-item">
                        <div class="articl-img-item">
                            <img :src="'https://oss02.bihu.com/' + item.snapimage | formatImgUrl" alt="">
                        </div>
                        <div class="articl-text-item">
                            <router-link :to="'/article/' + item.id" class="title">
                                <h3>{{ item.title }}</h3>
                                <p class="summary" v-html=" item.snapcontent +'...'"></p>
                            </router-link>
                            <div class="tag-group">
                                <Tag color="default"><Icon type="md-aperture" /> {{ item.money }}</Tag>
                                <Tag color="default"><Icon type="ios-thumbs-up-outline" /> {{ item.ups }}</Tag>
                                <Tag color="default"><Icon type="ios-chatboxes-outline" /> {{ item.cmts }}</Tag>
                            </div>
                        </div>
                    </div>
                </li>
                
            </ul>
            <Page :total="total" show-elevator class="pagecont" @on-change="changePage"/>
            <BackTop></BackTop>
        </Content>
        </Col>
        <Col :xs="0" :sm="6" :md="6" :lg="3" >
        </Col>
    </Row>     
    <Foot/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
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
      ],
      theme: "light",
      articleList: [],
      total: 0,
      isRender: false, // 重新渲染分页组件（定位到第一页）
      tabIndex: 1
    };
  },
  components: {
    Header,
    Foot
  },
  created() {
    this.getHotArtList();
  },
  filters: {
    formatImgUrl(url) {
      //console.log(url);
      let newUrl = url.split(",")[0];
      //console.log(url);
      return newUrl;
    }
  },
  watch: {
    $route(to, from) {
      this.isRender = false;
      this.getHotArtList();
    }
  },
  methods: {
    // 获取热门文章列表
    getHotArtList(pageNum = 1) {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/hotArtList", {
          category: "recommend",
          code: this.$route.query.code || "",
          pageNum: pageNum
        })
        .then(res => {
          if (res.data.resMsg == "success") {
            this.articleList = res.data.data.list;
            this.total = res.data.data.total;
            this.isRender = true;
            //console.log(res.data.data.list);
          }
        });
    },
    // 获取最新文章列表
    getNewArtList(pageNum = 1) {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/newstArtList", {
          category: "news",
          code: this.$route.query.code || " ",
          pageNum: pageNum
        })
        .then(res => {
          if (res.data.resMsg === "success") {
            this.articleList = res.data.data.list;
            this.total = res.data.data.total;
            this.isRender = true;
            //console.log(res.data.data.list);
          }
        });
    },
    //tab切换
    SelectMenu(name) {
      //console.log(name);
      this.isRender = "false";
      let index = name;
      switch (index) {
        case "1":
          this.getHotArtList();
          this.tabIndex = 1;
          break;
        case "2":
          this.getNewArtList();
          this.tabIndex = 2;
          break;
        default:
          break;
      }
    },
    //分页
    changePage(page) {
      //console.log(page);
      if (this.tabIndex == 1) {
        this.getHotArtList(page);
      } else {
        this.getNewArtList(page);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  a {
    color: #333;
  }
  .articlList {
    list-style: none;
    .articlList-item {
      position: relative;
      height: auto;
      padding: 15px 10px;
      overflow: hidden;
      border-bottom: 1px solid #ddd;
      .articl-avatar-item {
        margin-bottom: 20px;
        height: 40px;
        text-align: left;
        display: flex;
        display: -webkit-flex;
        a {
          display: flex;
          display: -webkit-flex;
          color: #333;
          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .aritcl-user {
            font-size: 14px;
            font-weight: bold;
            height: 40px;
            .time {
              font-size: 12px;
              color: #ddd;
            }
          }
        }
      }
      .aritcl-info-item {
        display: -webkit-flex;
        display: flex;
        .articl-img-item {
          width: 230px;
          height: 140px;
          img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
        }
        .articl-text-item {
          margin-left: 20px;
          position: relative;
          .title:hover {
            text-decoration: underline;
          }
          h3 {
            font-size: 18px;
          }
          .tag-group {
            position: absolute;
            left: 0;
            bottom: 0;
            i {
              font-size: 18px;
              margin-bottom: 3px;
            }
          }
        }
      }
    }
  }
  .pagecont {
    padding: 20px;
  }
}
</style>
