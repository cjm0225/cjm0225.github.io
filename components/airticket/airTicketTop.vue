<template>
  <div>
    <div class="top">
      <span> 单程： 广州 - 上海 / 2020-10-18</span>
      <div class="filter">
        <!-- 起飞机场 -->
        <el-select placeholder="起飞机场" v-model="airport" size="mini">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>

        <!-- 起飞机场 -->
        <el-select placeholder="起飞机场" v-model="airport" size="mini">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>

        <!-- 起飞机场 -->
        <el-select placeholder="起飞机场" v-model="airport" size="mini">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>

        <!-- 起飞机场 -->
        <el-select placeholder="起飞机场" v-model="airport" size="mini">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </div>
    </div>
    <div class="bottom">
      筛选: <el-button type="primary" round>撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "",
    };
  },
  props: ["airTicketInfo"],
  created() {
    console.log(this.airTicketInfo);
  },
};
</script>


<style lang="less" scoped>
.top {
  display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  span {
    flex: 3;
    font-size: 14px;
  }
  .filter {
    flex: 7;
    display: flex;
    .el-select {
      /deep/ .el-input {
        width: 88%;
      }
    }
  }
}
.bottom {
  .el-button.is-round {
    border-radius: 20px;
    padding: 7px 15px;
  }
}
</style>