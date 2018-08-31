<template>
  <div class="article">
    <Header :style="{'z-index': '1'}"></Header>
    <Row type="flex" justify="center" class="code-row-bg" :style="{'z-index': '0'}">
      <Col :xs="14" :sm="14" :md="12" :lg="10" >
        <Content :style="{margin: '88px 20px 0', background: '#fff', minHeight: '500px', padding: '10px 20px'}">
            <h1>{{ article.title }}</h1>
            <div class="userInfo">
                <div class="user-img">
                    <img :src="'https://oss02.bihu.com/' + article.userIcon"  :alt="article.userName"/>
                </div>
                <div class="user-name">
                    <p class="user-name-title">{{ article.userName }}</p>
                    <time class="user-name-des">{{ $utils.timeFormat(article.creatime) }}</time>
                </div>
                <div class="user-attentionBtn">
                    <Button type="primary" shape="circle" ghost>关注</Button>
                </div>
            </div>
            <div class="articlcont" v-html="articleContent"></div>
            <div class="comment">
                <h3>共{{ comment.total }}条评论</h3>
                <ul class="articlList commentList">
                    <li v-for="(item, index) in comment.list" :key="index" class="articlList-item">
                        <div class="articl-avatar-item">
                            <router-link :to="'/user/' + item.user.userId" >
                                <img :src="'https://oss02.bihu.com/' + item.user.userIcon" alt="">
                                <div class="aritcl-user">
                                    <p>{{ item.user.userName }}</p>
                                    <time class="time">{{$utils.timeFormat(item.createTime)}}</time>
                                </div>
                            </router-link>
                        </div>
                        <div class="aritcl-info-item">
                            <div class="articl-text-item">
                                <p class="summary" v-html=" item.content"></p>
                                <div class="tag-group">
                                    <Tag color="default"><Icon type="ios-thumbs-up-outline" /> {{ item.ups }}</Tag>
                                    <Tag color="default"><Icon type="ios-thumbs-down-outline" /> {{ item.downs }}</Tag>
                                </div>
                            </div>
                        </div>
                    </li>
                    
                </ul>
            </div>
            <Page v-if="comment.pageSize < comment.total" :page-size="comment.pageSize" :total="comment.total" show-elevator class="pagecont" @on-change="changePage"/>
            <BackTop></BackTop>
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
  name: "article",
  data() {
    return {
      id: this.$route.params.id,
      userInfo: {},
      theme: "light",
      article: {},
      articleContent: "",
      comment: {}
    };
  },
  components: {
    Header,
    Foot
  },
  created() {
    this.getArtDetial();
  },
  methods: {
    //获取文章页详情
    getArtDetial() {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/api/content/show/getArticle2", {
          artId: this.id
        })
        .then(res => {
          if (res.data.resMsg == "success") {
            this.article = res.data.data;
            console.log(res);
            this.$axios
              .get("https://oss02.bihu.com/" + res.data.data.content)
              .then(res => {
                //console.log(res);
                this.articleContent = decodeURIComponent(res.data);
              });
            //获取评论
            this.$axios
              .post(
                "https://be02.bihu.com/bihube-pc/bihu/comment/listrootcomment",
                {
                  articleId: res.data.data.id
                }
              )
              .then(res => {
                this.comment = res.data.data;
                //console.log(res);
              });
          }
        });
    },
    // 获取分页数据
    getCommmentPage(pageNum = 1) {
      this.$axios
        .post("https://be02.bihu.com/bihube-pc/bihu/comment/listrootcomment", {
          articleId: this.id,
          pageNum: pageNum
        })
        .then(res => {
          if (res.data.resMsg == "success") {
            this.comment = res.data.data;
            //console.log(res);
          }
        });
    },
    //分页
    changePage(page) {
      this.getCommmentPage(page);
    }
  }
};
</script>
<style lang="less" scoped>
.article {
  h1 {
    margin: 10px 0;
    padding-top: 10px;
  }
  a {
    color: #337ab7;
  }
  p {
    font-size: 16px;
    a {
      font-size: 16px;
    }
  }
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
  .articlcont {
    overflow-x: hidden;
    img {
      width: 100%;
    }
  }
  .comment {
    margin-top: 20px;
    h3 {
      font-size: 24px;
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
      border-bottom: 1px solid #f5f7f9;
      p {
        font-size: 14px;
      }
      .articl-avatar-item {
        margin-bottom: 10px;
        height: 32px;
        text-align: left;
        display: flex;
        display: -webkit-flex;
        a {
          display: flex;
          display: -webkit-flex;
          color: #333;
          img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .aritcl-user {
            font-size: 14px;
            font-weight: bold;
            height: 32px;
            display: flex;
            line-height: 32px;
            .time {
              font-size: 12px;
              color: #ddd;
              margin-left: 10px;
            }
          }
        }
      }
      .aritcl-info-item {
        display: -webkit-flex;
        display: flex;
        padding-left: 42px;
        .articl-text-item {
          .tag-group {
            margin-top: 10px;
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
