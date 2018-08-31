<template>
  <div class="home">
    <Header :style="{'z-index': '1'}"></Header>
    <Row type="flex" justify="center" class="code-row-bg" :style="{'z-index': '0'}">
        <Col :xs="0" :sm="4" :md="4" :lg="2" >
        <Content :style="{margin: '88px 0 0 0', minHeight: '500px', 'z-index': '1'}">
            <ul class="home-sider">  
                <li :class="addactive == 1 ? 'active' :''" @click="addActive('1')">
                    <router-link :to="{path:'/',query:{category:'recommend'}}">
                      推荐
                    </router-link>
                </li>
                <li :class="addactive == 2 ? 'active' :''"  @click="addActive('2')">
                    <router-link :to="{path:'/',query:{category:'follow'}}">
                      关注
                    </router-link>
                </li>
                <li class="active" v-show="showCategroy == '' ? false : true">
                    <router-link :to="{path:'/', query: {code: showCategroy}}">
                      {{ showCategroy }}
                    </router-link>
                </li>
                <li class="more-btn" @mouseover="showCategoryMenu('1')" @mouseout="showCategoryMenu('0')">
                    更多
                    <div class="button-cont" v-show="isShow == 1 ? true : false">
                        <h3>热门</h3>
                        <div class="buttonGroup">
                            <Button type="primary" ghost v-for="item in categoryList" :key="item.id" @click="clickCategory(item.code)">
                                <router-link :to="{path:'/', query: {code: item.code}}">
                                    {{item.code}}
                                </router-link>
                            </Button>
                        </div>
                    </div>
                </li>
            </ul> 
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
                        <div class="articl-img-item" v-show="item.snapimage == '' ? false : true">
                            <img :src="'https://oss02.bihu.com/' + item.snapimage | formatImgUrl" alt="">
                        </div>
                        <div class="articl-text-item">
                            <router-link :to="'/article/' + item.id" class="title">
                                <h3>{{ item.title }}</h3>
                                <p class="summary" v-html=" item.snapcontent +'...'"></p>
                            </router-link>
                            <div class="tag-group">
                                <Tag color="default"><Icon type="ios-cash-outline" /> {{ item.money }}</Tag>
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
            <div :style="{margin: '88px 0 0 0', minHeight: '500px', 'z-index': '1'}">
                <img src="../../static/bihu-e.452c8664.jpg" alt="二维码" style="width: 100%;">
            </div>
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
      tabIndex: 1,
      categoryList: [],
      addactive: 1,
      showCategroy: "",
      isShow: 0
    };
  },
  components: {
    Header,
    Foot
  },
  created() {
    this.getHotArtList();
    this.getCategoryList();
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
    //获取分类列表
    getCategoryList() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/queryBoardList")
        .then(res => {
          if (res.data.resMsg == "success") {
            this.categoryList = res.data.data.noSubList;
          }
        });
    },
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
    },
    addActive(params) {
      this.addactive = params;
    },
    clickCategory(params) {
      //console.log(params);
      this.showCategroy = params;
    },
    showCategoryMenu(params) {
      this.isShow = params;
    }
  }
};
</script>
<style lang="less" scoped>
.home {
  a {
    color: #333;
  }
  .home-sider {
    list-style: none;
    text-align: right;
    li {
      width: 100px;
      height: 40px;
      text-align: center;
      font-size: 16px;
      margin: 2px 0 2px 0;
      line-height: 40px;
      cursor: pointer;
      display: inline-block;
      border-radius: 3px;
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    li:hover {
      background-color: #007bff;
      color: #fff;
      a {
        color: #fff;
      }
      h3 {
        color: #333;
      }
      .button-cont {
        a {
          color: #333;
        }
      }
    }
    .active {
      background-color: #007bff;
      color: #fff;
      a {
        color: #fff;
      }
    }
    .button-cont::before {
      content: "";
      border-left: 20px solid transparent;
      border-top: 20px solid transparent;
      border-right: 20px solid transparent;
      border-bottom: 20px solid #fff;
      position: absolute;
      left: -40px;
      transform: rotate(-90deg);
      z-index: 1001;
      top: 90px;
    }
    .more-btn {
      position: relative;
      .button-cont {
        position: absolute;
        width: 650px;
        background: #fff;
        left: 120px;
        z-index: 1000;
        padding: 20px 10px;
        top: -90px;
        -webkit-box-shadow: 1px 6px 12px rgba(0, 0, 0, 0.175);
        box-shadow: 1px 6px 12px rgba(0, 0, 0, 0.175);
        h3 {
          text-align: left;
          padding-left: 10px;
        }
        .buttonGroup {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          button {
            width: 100px;
            height: 35px;
            margin: 10px;
            line-height: 35px;
            padding: 0 10px;
            span {
              display: block;
              padding: 0;
              margin: 0;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
  .articlList {
    list-style: none;
    .articlList-item {
      position: relative;
      height: auto;
      padding: 20px 30px 30px 30px;
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
              color: #999;
            }
          }
        }
      }
      .aritcl-info-item {
        display: -webkit-flex;
        display: flex;
        min-height: 100px;
        a {
          color: #999;
        }
        .articl-img-item {
          width: 230px;
          height: 140px;
          img {
            width: 230px;
            height: 140px;
          }
        }
        .articl-text-item {
          margin-left: 20px;
          position: relative;
          .title:hover {
            text-decoration: none;
          }
          h3 {
            font-size: 18px;
            color: #212529;
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
