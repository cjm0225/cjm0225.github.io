<template>
  <div class="page">
    <div class="airTicketDetail">
      <!-- 机票详情部分 -->
      <div class="detailLeft">
        <!-- 头部筛选部分 -->
        <airTicketTop
          :airTicketInfo="airTicketInfo"
          v-if="Object.keys(airTicketInfo).length > 0"
          @filterListhandler="filterListhandler"
        >
        </airTicketTop>

        <!-- 标题 -->
        <div class="title">
          <div>航班信息</div>
          <div>起飞时间</div>
          <div>到达时间</div>
          <div>价格</div>
        </div>
        <!-- 机票信息 -->
        <div
          class="airTicketInfo"
          v-for="(airTicket, index) of airTicketList"
          :key="airTicket.id"
        >
          <div class="description" @click="reCommentShowHandler(index)">
            <div class="airport">
              {{ airTicket.airline_name }}{{ airTicket.flight_no }}
            </div>
            <div class="TimeInfo">
              <div class="departTime">
                <div class="time">{{ airTicket.dep_time }}</div>
                <div class="quay">
                  {{ airTicket.org_airport_name
                  }}{{ airTicket.org_airport_quay }}
                </div>
              </div>
              <div class="durationTime">
                {{
                  (Date.parse(airTicket.arr_datetime) -
                    Date.parse(airTicket.dep_datetime))
                    | durationTime
                }}
              </div>
              <div class="destTime">
                <div class="time">{{ airTicket.arr_time }}</div>
                <div class="quay">
                  {{ airTicket.dst_airport_name
                  }}{{ airTicket.dst_airport_quay }}
                </div>
              </div>
            </div>
            <div class="basePrice">
              ¥<span>{{ airTicket.minimumPrice }}</span
              >起
            </div>
          </div>
          <transition name="slide-fade">
            <div class="recomment" v-if="reCommentShowIndex === index">
              <div class="recommentLeft">低价推荐</div>
              <div class="recommentRight">
                <div
                  class="recommentItem"
                  v-for="(seat, index) of airTicket.seat_infos"
                  :key="index"
                >
                  <div class="company">
                    <span>{{ seat.group_name }}</span>
                    |&nbsp;{{ seat.supplierName }}
                  </div>
                  <div class="price">¥{{ seat.settle_price }}</div>
                  <div class="choose">
                    <div>
                      <el-button
                        type="warning"
                        size="mini"
                        @click="toOrderpage(seat.seat_xid)"
                        >选定</el-button
                      >
                    </div>
                    <div class="left">剩余 : {{ seat.discount }}</div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 无机票的时候显示的信息 -->
        <div v-if="airTicketList.length === 0" class="noAirticket">
          无机票信息
        </div>

        <!-- 分页组件 -->
        <div class="pagination">
          <el-pagination
            background
            layout="total,sizes,prev, pager, next,jumper"
            :page-size="pageSize"
            :current-page="currentPage"
            :page-sizes="[2, 5, 10, 20]"
            :total="total"
            @size-change="sizeChangeHandler"
            @current-change="currentPageChange"
          >
          </el-pagination>
        </div>
      </div>
      <div class="detailRight">
        <airTicketRight @historyHandler="historyHandler"></airTicketRight>
      </div>
    </div>
  </div>
</template>

<script>
import airTicketTop from "@/components/airticket/airTicketTop";
import airTicketRight from "@/components/airticket/airTicketRight";
export default {
  data() {
    return {
      // 包含所有信息
      airTicketInfo: {},
      // 专门用于显示的数组
      airTicketList: [],
      // 专门用于处理的数组
      filterList: [],
      // 推荐机票被打开的小白哦
      reCommentShowIndex: null,
      // 分页组件默认值
      pageSize: 10,
      currentPage: 1,
      // 因为机票总数量会随着时机不同而不同,所以要手动设置一个变量,储存不同时机的机票总数量
      total: 0,
      // 保存路由参数
      queryList: {},
    };
  },
  components: {
    airTicketTop,
    airTicketRight,
  },
  filters: {
    durationTime(Oldvalue) {
      // 因为00:20也算是同一天,所以才会得出负数,要加一天的毫秒数进行出来
      if (Oldvalue < 0) {
        Oldvalue += 86400 * 1000;
      }

      // 小时
      const hour = Math.floor(Oldvalue / 1000 / 60 / 60);
      // 分钟
      const minute = (Oldvalue / 1000 / 60) % 60;

      // 返回想要的格式
      return hour + "小时" + minute + "分";
    },
  },
  watch: {
    queryList: {
      immediate: true,
      handler: function () {
        this.loadPage();
      },
    },
  },
  methods: {
    toOrderpage(id) {
      console.log(id);
    },
    historyHandler(history) {
      //  编程式路由导航,不加path,只加query,可以实现在所在页面改变路由参数
      // 在 2.2.0+，可选的在 router.push 或 router.replace 中提供 onComplete 和 onAbort 回调作为第二个和第三个参数。
      this.$router.push(
        {
          query: history,
        },
        () => {
          this.queryList = this.$route.query;
        }
      );
    },
    loadPage() {
      this.$axios({
        url: "airs",
        params: this.$route.query,
      }).then((response) => {
        // 遍历机票信息
        response.data.flights.forEach((item) => {
          // 将第一个价格设置为最低价
          let minimumPrice = item.seat_infos[0].org_settle_price;
          // 遍历所有机票价格进行比较
          item.seat_infos.forEach((item) => {
            if (item.org_settle_price < minimumPrice) {
              minimumPrice = item.org_settle_price;
            }
          });
          // 比较完了就输出最低价,将最低价加到数据中
          item.minimumPrice = minimumPrice;
        });

        //将机票所有信心赋值给airTicketInfo
        this.airTicketInfo = response.data;

        // 设置机票总数量
        this.total = this.airTicketInfo.flights.length;

        // 将机票信息赋值给专门处理数据的数组
        this.filterList = this.airTicketInfo.flights;

        // 一开始进入页面的时候也需要对数据处理,因为数量显示要正确
        this.airTicketList = this.filterList.slice(
          this.currentPage - 1,
          this.pageSize
        );
      });
    },
    filterListhandler(filterList) {
      //将处理后的机票数据赋值给需要遍历的数组
      this.filterList = filterList;

      // 设置总机票数量
      this.total = this.filterList.length;

      // 每次处理数据之后,都要将分页组件的设置所在页码设为原始值
      this.currentPage = 1;

      // 然后正确显示机票,相当于第一次进入页面,因为当前页码是从1开始的,所以要减1
      this.airTicketList = this.filterList.slice(
        this.currentPage - 1,
        this.pageSize
      );
    },
    reCommentShowHandler(index) {
      // 如果已经展开,再次点击就关闭
      if (this.reCommentShowIndex === index) {
        this.reCommentShowIndex = null;
        return;
      }

      // 记录这一次被点击的下标,并展开
      this.reCommentShowIndex = index;
    },
    sizeChangeHandler(newPageSize) {
      this.pageSize = newPageSize;
      // 每页显示数量改变时,需要对数据进行处理,显示机票数量变成与newPageSize数量一样
      // 因为当前页码是从1开始的,所以要减1
      this.airTicketList = this.filterList.slice(
        this.currentPage - 1,
        this.pageSize
      );
    },
    currentPageChange(newPageIndex) {
      this.currentPage = newPageIndex;
      // 每页页码改变时,需要对数据进行处理
      // 1    2    3   4    5
      // 0 1 2 3  4 5  6 7 8 9
      // 规律:slice开始是 this.currentPage * this.pageSize - this.pageSize
      // 结束时this.currentPage * this.pageSize(不包含)
      this.airTicketList = this.filterList.slice(
        this.currentPage * this.pageSize - this.pageSize,
        this.currentPage * this.pageSize
      );
      // 因为显示隐藏推荐机票的时候,在换页的时候会自动显示之前点击过的推荐机票,所以要清空
      this.reCommentShowIndex = null;
    },
  },
};
</script>


<style lang="less" scoped>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}
.page {
  padding: 0 200px;
  margin-top: 20px;
  .airTicketDetail {
    display: flex;

    .detailLeft {
      flex: 12;
      .title {
        display: flex;
        margin-top: 20px;
        background-color: #f6f6f6;
        border: 1px solid #dddddd;
        div {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: #666666;
          line-height: 3;
        }
      }
      .airTicketInfo {
        .description {
          display: flex;
          align-items: center;
          text-align: center;
          border: 1px solid #dddddd;
          margin-top: 10px;
          padding: 15px;
          cursor: pointer;
          .airport {
            flex: 1;
            font-size: 14px;
          }
          .TimeInfo {
            flex: 2;
            display: flex;
            position: relative;
            .departTime,
            .destTime {
              flex: 1;
              .time {
                font-size: 24px;
                margin-bottom: 3px;
              }
              .quay {
                font-size: 12px;
                color: #999999;
              }
            }
            .durationTime {
              position: absolute;
              left: 140px;
              border-bottom: 1px solid #eeeeee;
              font-size: 14px;
              line-height: 36px;
              color: #b29999;
            }
            .destTime {
              flex: 1;
            }
          }
          .basePrice {
            flex: 1;
            span {
              color: #ffa517;
              font-size: 24px;
              padding: 3px 3px 0 3px;
            }
          }
        }
        .recomment {
          background-color: #f6f6f6;
          border: 1px solid #dddddd;
          border-top: 0;
          display: flex;
          .recommentLeft {
            flex: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
          }
          .recommentRight {
            flex: 12;

            .recommentItem {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10px 0;
              border-bottom: 1px solid #ccc;
              &:last-child {
                border-bottom: 0;
              }
              .company {
                flex: 10;
                font-size: 12px;

                span {
                  color: #008000;
                }
              }
              .price {
                flex: 3;

                color: #ffa500;
                font-size: 20px;
              }
              .choose {
                flex: 2;
                .left {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
      .pagination {
        display: flex;
        justify-content: center;
        margin: 10px 0;
      }
    }
    .detailRight {
      flex: 4;
    }
  }
  .detailRight {
    margin-left: 15px;
  }
}
</style>