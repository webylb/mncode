<template>
  <div class="home">
    <Header :style="{'z-index': '1'}"></Header>
       
    <Row type="flex" justify="center" class="code-row-bg" :style="{'z-index': '0'}">
        <Col span="16">
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
                            <h5>{{ item.userName }}</h5>
                        </router-link>
                    </div>
                    <div class="aritcl-info-item">

                    </div>
                </li>
                
            </ul>
        </Content>
        </Col>
    </Row>    
        
    <Foot/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
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
      ],
      theme: "light",
      articleList: [],
      total: 0,
      isRender: false // 重新渲染分页组件（定位到第一页）
    };
  },
  components: {
    Header,
    Category,
    Foot
  },
  created() {
    this.getHotArtList();
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
            console.log(res.data.data.list);
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
            console.log(res.data.data.list);
          }
        });
    },
    SelectMenu(name) {
      //console.log(name);
      this.isRender = "false";
      let index = name;
      switch (index) {
        case "1":
          this.getHotArtList();
          break;
        case "2":
          this.getNewArtList();
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.articlList {
  list-style: none;
  .articlList-item {
    position: relative;
    height: auto;
    padding: 10px;
    overflow: hidden;
    border-bottom: 1px solid #ddd;
    .articl-avatar-item {
      margin-bottom: 20px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      h5 {
        display: inline-block;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
