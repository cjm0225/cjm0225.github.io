<template>
  <div>
    <div class="top">
      <span> 单程： 广州 - 上海 / 2020-10-18</span>
      <div class="filter">
        <!-- 起飞机场 -->
        <el-select
          placeholder="起飞机场"
          v-model="airport"
          size="mini"
          :filterable="true"
          @change="airportSelect"
        >
          <el-option
            :label="airport"
            :value="airport"
            v-for="(airport, index) of airTicketInfo.options.airport"
            :key="index"
          ></el-option>
        </el-select>

        <!-- 起飞时间 -->
        <el-select
          placeholder="起飞时间"
          v-model="flightTime"
          size="mini"
          :filterable="true"
          @change="flightTimeSelect"
        >
          <el-option
            :label="`${flightTimes.from}:00 - ${flightTimes.to}:00`"
            :value="`${flightTimes.from}-${flightTimes.to}`"
            v-for="(flightTimes, index) of airTicketInfo.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>

        <!-- 航空公司 -->
        <el-select
          placeholder="航空公司"
          v-model="company"
          size="mini"
          :filterable="true"
          @change="companySelect"
        >
          <el-option
            :label="company"
            :value="company"
            v-for="(company, index) of airTicketInfo.options.company"
            :key="index"
          ></el-option>
        </el-select>

        <!-- 机型 -->
        <el-select
          placeholder="机型"
          v-model="airSize"
          size="mini"
          :filterable="true"
          @change="airSizeSelect"
        >
          <el-option label="大" value="L"></el-option>
          <el-option label="中" value="M"></el-option>
          <el-option label="小" value="S"></el-option>
        </el-select>
      </div>
    </div>
    <div class="bottom">
      筛选:
      <el-button type="primary" round @click="cancelSelect">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: "",
      flightTime: "",
      company: "",
      airSize: "",
      filterList: [],
    };
  },
  props: ["airTicketInfo"],
  created() {
    this.filterList = this.airTicketInfo.flights;
  },
  methods: {
    filterData() {
      // 判断每个选择框value是否有值
      this.filterList = this.airTicketInfo.flights;

      // 起飞机场
      if (this.airport) {
        this.filterList = this.filterList.filter((item) => {
          return item.org_airport_name === this.airport;
        });
      }

      //起飞时间
      if (this.flightTime) {
        const start = Number(this.flightTime.split("-")[0]);
        const end = Number(this.flightTime.split("-")[1]);
        this.filterList = this.filterList.filter((item) => {
          const departTime = Number(item.dep_time.split(":")[0]);
          return start <= departTime && departTime < end;
        });
      }

      // 航空公司
      if (this.company) {
        this.filterList = this.filterList.filter((item) => {
          return item.airline_name === this.company;
        });
      }

      // 飞机机型
      if (this.airSize) {
        this.filterList = this.filterList.filter((item) => {
          return item.plane_size === this.airSize;
        });
      }

      // 通知父组件改变数据
      this.$emit("filterListhandler", this.filterList);
    },
    // 起飞机场
    airportSelect(airport) {
      this.airport = airport;
      this.filterData();
    },
    // 起飞时间
    flightTimeSelect(flightTime) {
      this.flightTime = flightTime;
      this.filterData();
    },
    // 航空公司
    companySelect(company) {
      this.company = company;
      this.filterData();
    },
    // 飞机机型
    airSizeSelect(planeSize) {
      this.planeSize = planeSize;
      this.filterData();
    },
    // 取消所有选择
    cancelSelect() {
      this.airport = "";
      this.flightTime = "";
      this.company = "";
      this.airSize = "";
      this.filterList = this.airTicketInfo.flights;
      // 通知父组件改变数据
      this.$emit("filterListhandler", this.filterList);
    },
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