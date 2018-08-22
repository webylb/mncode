<template>
  <div class="user">
    <Header :style="{'z-index': '1'}"></Header>
    <Row type="flex" justify="center" class="code-row-bg" :style="{'z-index': '0'}">
        <Col :xs="14" :sm="14" :md="12" :lg="10" >
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px'}">
            <div class="userInfo">
                <div class="user-img">
                    <img :src="'https://oss02.bihu.com/' + userInfo.userIcon"  :alt="userInfo.userName"/>
                </div>
                <div class="user-name">
                    <p class="user-name-title">{{ userInfo.userName }}</p>
                    <p class="user-name-des">{{ userInfo.info }}</p>
                </div>
                <div class="user-attentionBtn">
                    <Button type="primary" shape="circle" ghost>关注</Button>
                </div>
            </div>
            <Menu mode="horizontal" :theme="theme" active-name="1" @on-select="SelectMenu">
                <MenuItem name="1" >
                    文章({{userInfo.artNum}})
                </MenuItem>
                <MenuItem name="2">
                    关注({{userInfo.follows}})
                </MenuItem>
                <MenuItem name="3">
                    粉丝({{userInfo.fans}})
                </MenuItem>
            </Menu>
            <ul class="articlList" v-show="tabIndex == 1 ? true : false">
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
            <ul class="followsList" v-show="tabIndex == 2 ? true : false">
                <li v-for="(item, index) in userFollow" :key="index" class="followsList-item">
                    <router-link :to="'/user/'+ item.userId" class="followsList-item-cont">
                        <div class="followsList-img">
                            <img :src="'https://oss02.bihu.com/' + item.userIcon"  :alt="item.userName"/>
                        </div>
                        <div class="followsList-namecont">
                            <p class="followsList-name">{{ item.userName }}</p>
                            <p class="followsList-fans">粉丝:{{ item.fans }}</p>
                        </div>
                    </router-link>
                    
                    <div class="followsList-attentionBtn">
                        <Button type="primary" shape="circle" ghost>关注</Button>
                    </div>
                </li>
            </ul>
            <ul class="userFansList" v-show="tabIndex == 3 ? true : false">
                <li v-for="(item, index) in userFans" :key="index" class="userFansList-item followsList-item">
                    <router-link :to="'/user/'+ item.userId" class="followsList-item-cont">
                        <div class="followsList-img">
                            <img :src="'https://oss02.bihu.com/' + item.userIcon"  :alt="item.userName"/>
                        </div>
                        <div class="followsList-namecont">
                            <p class="followsList-name">{{ item.userName }}</p>
                            <p class="followsList-fans">粉丝:{{ item.fans }}</p>
                        </div>
                    </router-link>
                    
                    <div class="followsList-attentionBtn">
                        <Button type="primary" shape="circle" ghost>关注</Button>
                    </div>
                </li>
            </ul>
            <Page :total="total" show-elevator class="pagecont" @on-change="changePage"/>
        </Content>
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
  name: "user",
  data() {
    return {
      userInfo: {},
      theme: "light",
      articleList: [],
      total: 0,
      isRender: false, // 重新渲染分页组件（定位到第一页）
      tabIndex: 1,
      userFollow: {},
      userFans: {}
    };
  },
  components: {
    Header,
    Foot
  },
  created() {
    this.getUserInfo();
    this.getArtList();
  },
  filters: {
    formatImgUrl(url) {
      let newUrl = url.split(",")[0];
      return newUrl;
    }
  },
  methods: {
    //获取当前用户信息
    getUserInfo() {
      let userID = this.$route.params.userId;
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/userHomePage", {
          queryUserId: userID
        })
        .then(res => {
          if (res.data.resMsg == "success") {
            this.userInfo = res.data.data;
            //console.log(this.userInfo);
          }
        });
    },
    // 获取文章列表
    getArtList(pageNum = 1) {
      let userId = this.$route.params.userId;
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/getUserArtList",
          {
            challenge: "",
            crash: 1,
            pageNum: pageNum,
            queryUserId: userId
          }
        )
        .then(res => {
          if (res.data.resMsg == "success") {
            this.articleList = res.data.data.list;
            this.total = res.data.data.total;
            this.isRender = true;
            console.log(res.data.data);
          }
        });
    },
    // 获取关注列表
    getFollowsList(pageNum = 1) {
      let userID = this.$route.params.userId;
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/getUserFollowList",
          {
            queryUserId: userID,
            pageNum: pageNum
          }
        )
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userFollow = res.data.data.list;
            this.isRender = true;
            console.log(res.data.data);
          }
        });
    },
    //获取粉丝列表
    getFansList(pageNum = 1) {
      let userID = this.$route.params.userId;
      this.$axios
        .post(
          "https://be02.bihu.com/bihube-pc/api/content/show/getUserFansList",
          {
            queryUserId: userID,
            pageNum: pageNum
          }
        )
        .then(res => {
          if (res.data.resMsg === "success") {
            this.userFans = res.data.data.list;
            this.isRender = true;
            console.log(res.data.data);
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
          this.getArtList();
          this.tabIndex = 1;
          break;
        case "2":
          this.getFollowsList();
          this.tabIndex = 2;
          break;
        case "3":
          this.getFansList();
          this.tabIndex = 3;
          break;
        default:
          break;
      }
    },
    //分页
    changePage(page) {
      //console.log(page);
      switch (this.tabIndex) {
        case 1:
          this.getArtList(page);
          break;
        case 2:
          this.getFollowsList(page);
          break;
        case 3:
          this.getFansList(page);
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.user {
  .userInfo {
    height: 110px;
    padding: 30px 30px 0 30px;
    display: -webkit-flex;
    display: flex;
    .user-img {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }
    .user-name {
      flex: 1;
      height: 60px;
      margin-left: 20px;
      padding-top: 5px;
      .user-name-title {
        font-size: 20px;
      }
      .user-name-des {
        color: #bcc7d7;
      }
    }
    .user-attentionBtn {
      padding-top: 20px;
    }
  }
  .articlList {
    background-color: #f5f7f9;
    padding: 1px 0;
    list-style: none;
    .articlList-item {
      position: relative;
      height: auto;
      padding: 10px;
      overflow: hidden;
      background-color: #fff;
      margin: 20px 0;
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
  .followsList,
  .userFansList {
    background-color: #f5f7f9;
    padding: 20px 0;
    list-style: none;
    li {
      height: 100px;
      padding: 24px 40px;
      border: 1px solid #f9f9f9;
      background-color: #fff;
      display: -webkit-flex;
      display: flex;
      justify-content: space-between;
      .followsList-item-cont {
        display: -webkit-flex;
        display: flex;
        .followsList-img {
          width: 50px;
          height: 50px;
          img {
            border-radius: 50%;
            height: 100%;
            width: 100%;
          }
        }
        .followsList-namecont {
          margin-left: 15px;
          margin-top: 5px;
          .followsList-name {
            font-size: 14px;
          }
          .followsList-fans {
            color: #bcc7d7;
          }
        }
      }
    }
  }
}
.pagecont {
  padding: 20px;
}
</style>
