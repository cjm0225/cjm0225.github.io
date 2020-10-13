<template>
  <div class="page">
    <el-carousel :interval="5000" arrow="always" height="759px">
      <el-carousel-item v-for="(url, index) of urls" :key="index">
        <el-image :src="url" fit="fit"></el-image>
      </el-carousel-item>
    </el-carousel>
    <div class="wrapper">
      <div class="search">
        <div
          class="trapezoid"
          v-for="(item, index) of titleList"
          :key="index"
          :class="{ active: index === acriveIndex }"
          @click="activeNav(index, item.placeholder, item.url)"
        >
          <span class="title">{{ item.title }}</span>
        </div>
      </div>

      <div class="searchInput">
        <input
          type="text"
          v-model.trim="cityName"
          :placeholder="placeholder"
          @keyup.enter="search"
          ref="input"
          v-focus
        />
        <i class="el-icon-search" @click="search"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urls: [
        "http://157.122.54.189:9095/assets/images/th01.jfif",
        "http://157.122.54.189:9095/assets/images/th02.jfif",
        "http://157.122.54.189:9095/assets/images/th03.jfif",
      ],
      titleList: [
        {
          title: "攻略",
          placeholder: "请输入城市名称",
          url: "/article?cityName=",
          city: "",
        },
        {
          title: "酒店",
          placeholder: "请输入城市搜索酒店",
          url: "/hotel?city=",
        },
        {
          title: "机票",
          placeholder: "机票",
          url: "/airTicket",
        },
      ],
      acriveIndex: 0,
      placeholder: "攻略",
      cityName: "",
      url: "/article?cityName=",
    };
  },
  // 因为autofoucs只在网页第一次进来才会聚焦,点击导航按钮后,再回来就不会聚焦
  directives: {
    focus: {
      inserted(dom) {
        dom.focus();
      },
    },
  },
  methods: {
    activeNav(index, placeholder, url) {
      this.acriveIndex = index;
      this.placeholder = placeholder;
      this.url = url;
      // 自定义指令聚焦好像只对第一个输入框生效,为了用户体验,每次点击都会聚焦
      this.$refs.input.focus();
      // 如果是用户点击了机票,不需要在此页面输入信息,直接跳转
      if (url === "/airTicket") {
        this.$router.push(url);
      }
    },
    search() {
      if (this.cityName === "") {
        this.$message.error("请输入需要搜索的信息");
        return;
      }
      this.$router.push(this.url + this.cityName);
    },
  },
};
</script>


<style lang="less" scoped>
.page {
  position: relative;
  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    .search {
      display: flex;
      width: 552px;
      .trapezoid {
        position: relative;
        width: 100px;
        border-bottom: 40px solid #0a171bad;
        border-right: 20px solid transparent;
        cursor: pointer;
        color: #fff;
        .title {
          position: absolute;
          top: 8px;
          left: 20px;

          font-weight: 500;
        }
      }
      .active {
        color: black;
        border-bottom: 40px solid #eeeeee;
      }
    }
    .searchInput {
      display: flex;
      align-items: center;
      width: 500px;
      height: 50px;
      input {
        width: 100%;
        height: 100%;
        border: 0;
        outline: none;
        text-indent: 2em;
        font-size: 16px;
      }
      .el-icon-search {
        font-size: 26px;
        padding: 12px;
        background-color: #fff;
        cursor: pointer;
        margin-left: -1px;
      }
    }
  }
}
</style>