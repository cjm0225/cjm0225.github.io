<template>
  <div class="airticketPage">
    <div class="title">
      <i class="iconfont icon-plane">&nbsp;国内机票</i>
    </div>
    <div class="airticket">
      <div class="left">
        <div class="top">
          <div class="nav" :class="{ active: isSingle }">
            <i class="iconfont icon-dancheng"></i> 单程
          </div>
          <div class="nav" :class="{ active: !isSingle }" @click="double">
            <i class="iconfont icon-wangfan"></i> 往返
          </div>
        </div>
        <div class="content">
          <el-form label-width="80px" :model="form">
            <el-form-item label="出发城市">
              <el-autocomplete
                v-model="form.departCity"
                :fetch-suggestions="queryHandler"
                placeholder="请输入出发城市"
                :trigger-on-focus="false"
                :highlight-first-item="true"
                @select="departCityInfo"
                @focus="departCityInputFocus"
              ></el-autocomplete>
            </el-form-item>

            <el-form-item label="到达城市">
              <el-autocomplete
                v-model="form.destCity"
                :fetch-suggestions="queryHandler"
                placeholder="请输入到达城市"
                :trigger-on-focus="false"
                :highlight-first-item="true"
                @select="destCityInfo"
                @focus="destCityInputFocus"
              ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
              <el-date-picker
                v-model="form.departDate"
                type="date"
                placeholder="请选择出发时间"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="toAirTicketPage"
                >搜索机票</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="right">
        <img src="../../static/journey.jpg" />
      </div>
    </div>

    <div class="description">
      <div class="item">
        <i class="iconfont icon-kujialeqiyezhan_qiandingxieyi"></i> 100%航协认证
      </div>
      <div class="item"><i class="iconfont icon-renzheng"></i> 出行保证</div>
      <div class="item"><i class="iconfont icon-dianhua"></i> 7X24小时服务</div>
    </div>

    <div class="bottom">
      <div class="title">
        <i class="iconfont icon-tejiajipiao">&nbsp;特价机票</i>
      </div>

      <div class="showSaleTicket">
        <div
          class="SaleTicketItem"
          v-for="(SaleTicket, index) of saleTickets"
          :key="index"
          @click="SaleTicketHandler(SaleTicket)"
        >
          <img :src="SaleTicket.cover" v-if="!SaleTicket.cover" />
          <img src="../../static/journey.jpg" v-else />
          <div class="detail">
            <span>{{ SaleTicket.departCity }}-{{ SaleTicket.destCity }}</span>
            <span>¥{{ SaleTicket.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSingle: true,
      saleTickets: [],
      form: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: "",
      },
      isdepartCityInput: true,
    };
  },
  created() {
    // 获取推荐机票信息
    this.$axios({
      url: "airs/sale",
    }).then((response) => {
      this.saleTickets = response.data.data;
    });
  },
  methods: {
    // 提示往返机票信息
    double() {
      this.$confirm("暂时没有往返机票,敬请等待", "温馨提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: false,
      });
    },
    departCityInputFocus() {
      this.isdepartCityInput = true;
    },
    destCityInputFocus() {
      this.isdepartCityInput = false;
    },
    queryHandler(queryString, callback) {
      // 在输入框输入的时候,进行城市信息获取
      this.$axios({
        url: "airs/city",
        params: {
          name: queryString,
        },
      }).then((response) => {
        // 获取数据成功之后, 因为自动补全组件必须要有value值才可以显示选项,要先改造数据
        // 有一些城市没有机场,需要把没有机场的城市过滤出来
        // 在机票接口中,数据要求城市名称格式为广州,要去掉市
        const cityInfo = response.data.data
          .filter((item) => {
            return item.sort;
          })
          .map((item) => {
            return {
              ...item,
              value: item.name.replace(/市$/, ""),
            };
          });

        // 为了防止用户没有点击选项而触发不了选择处理函数的情况,优先将第一个城市的sort加入到表单中
        // 但是要区分是出发城市还是到达城市
        if (this.isdepartCityInput) {
          this.form.departCode = cityInfo[0].sort;
        } else {
          this.form.destCode = cityInfo[0].sort;
        }

        // 改造完成之后,显示数据
        callback(cityInfo);
      });
    },
    departCityInfo(city) {
      // 需要额外增加一个参数
      this.form.departCode = city.sort;
    },
    destCityInfo(city) {
      // 需要额外增加一个参数
      this.form.destCode = city.sort;
    },
    toAirTicketPage() {
      if (this.form.departCity === "") {
        this.$message.error("请输入出发城市");
        return;
      }
      if (this.form.destCity === "") {
        this.$message.error("请输入到达城市");
        return;
      }
      if (this.form.departDate === "" || this.form.departDate === null) {
        this.$message.error("请选择出发时间");
        return;
      }
      // 编程式路由导航
      this.$router.push({
        path: "airTicket/airTicketDetail",
        query: this.form,
      });
    },
    SaleTicketHandler(SaleTicket) {
      // 由于API接口参数要求只需要五个,先处理数据再跳转
      const { peice, cover, ...data } = SaleTicket;
      // 编程式路由导航
      this.$router.push({
        path: "airTicket/airTicketDetail",
        query: data,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.airticketPage {
  padding: 0 200px;
  .title {
    .icon-plane {
      color: #ffa500;
      font-size: 20px;
    }
  }
  .airticket {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
    .left {
      width: 38%;
      border: 1px solid #cccccc;
      border-top: 0;
      .top {
        display: flex;
        width: 100%;
        .nav {
          width: 200px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          background-color: #eeeeee;
          cursor: pointer;
        }
        .active {
          border-top: 3px solid #ffa500;
          background-color: #ffffff;
        }
      }
      .content {
        padding: 15px 50px 0 20px;
        .el-date-editor,
        .el-autocomplete {
          width: 100%;
        }
      }
    }
    .right {
      width: 60%;
      text-align: right;
      height: 345px;
      img {
        width: 100%;
        height: 100%;
        object-fit: fill;
        border-radius: 10px;
      }
    }
  }
  .description {
    display: flex;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    .item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      border-right: 1px solid #ccc;
      margin: 10px 0;
      &:last-child {
        border-right: 0;
      }
      .iconfont {
        font-size: 30px;
        color: blue;
        margin-right: 5px;
      }
      .icon-renzheng {
        color: green;
      }
    }
  }
  .bottom {
    .title {
      .icon-tejiajipiao {
        color: #409eff;
        font-size: 20px;
      }
    }
    .showSaleTicket {
      display: flex;
      justify-content: space-around;
      margin: 15px 0;
      padding: 15px;
      border: 1px solid #ccc;

      .SaleTicketItem {
        cursor: pointer;
        flex: 1;
        position: relative;
        width: 25%;
        margin-right: 15px;
        &:last-child {
          margin-right: 0;
        }
        img {
          width: 100%;
          object-fit: cover;
        }
        .detail {
          display: flex;
          justify-content: space-between;

          position: absolute;
          bottom: 0;

          width: 100%;
          padding: 3px 5px;
          background-color: #0000009e;
          color: #fff;

          font-size: 14px;
        }
      }
    }
  }
}
</style>