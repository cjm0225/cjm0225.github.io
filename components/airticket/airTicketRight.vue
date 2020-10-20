<template>
  <div>
    <!-- 认证 -->
    <div class="top">
      <div class="description">
        <div class="item">
          <i class="iconfont icon-kujialeqiyezhan_qiandingxieyi"></i>
          <span>航协认证</span>
        </div>
        <div class="item">
          <i class="iconfont icon-renzheng"></i>
          <span>出行保证</span>
        </div>
        <div class="item">
          <i class="iconfont icon-dianhua"></i>
          <span> 7X24</span>
        </div>
      </div>
      <div class="telephone">免费客服电话：4006345678转2</div>
    </div>

    <!-- 历史查询 -->
    <div class="bottom">
      <div class="title">历史查询</div>
      <div class="history" v-for="(history, index) of historyList" :key="index">
        <div class="left">
          <div class="city">
            {{ history.departCity }} - {{ history.destCity }}
          </div>
          <div>{{ history.departDate }}</div>
        </div>
        <div class="right">
          <button class="btn" @click="historyHandler(history)">选择</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    historyList() {
      return this.$store.state.history.history;
    },
  },
  methods: {
    historyHandler(history) {
      this.$emit("historyHandler", history);
    },
  },
};
</script>


<style lang="less" scoped>
.top {
  border: 1px solid #cccccc;
  .description {
    display: flex;
    margin: 10px 15px;
    .item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        font-size: 36px;
        color: #63b8ff;
      }
      .icon-renzheng {
        color: #1d9264;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .telephone {
    background-color: #f6f6f6;
    font-size: 14px;
    text-align: center;
    line-height: 34px;
  }
}
.bottom {
  margin-top: 10px;
  border: 1px solid #cccccc;
  padding: 10px;
  .title {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
  }
  .history {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .left {
      font-size: 12px;
      text-align: center;
      .city {
        font-size: 16px;
      }
    }
    .right {
      .btn {
        background-color: #ffa500;
        outline: none;
        border: none;
        border-radius: 5px;
        padding: 0 10px;
        line-height: 24px;
        font-size: 12px;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>