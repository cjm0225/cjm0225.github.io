<template>
  <div class="airTicketDetail">
    <div class="detailLeft">
      <div class="title">
        <div>航班信息</div>
        <div>起飞时间</div>
        <div>到达时间</div>
        <div>价格</div>
      </div>
      <el-collapse>
        <div class="airTicketInfo">
          <div class="description">
            <div class="airport">测试</div>
            <div class="TimeInfo">
              <div class="departTime">
                <div class="time">测试</div>
                <div class="quay">测试</div>
              </div>
              <div class="durationTime">测试</div>
              <div class="destTime">
                <div class="time">测试</div>
                <div class="quay">测试</div>
              </div>
            </div>
            <div class="basePrice">¥<span>测试</span>起</div>
          </div>
          <div class="comment">
            <div class="commentLeft">低价推荐</div>
            <div class="commentRight">
              <div class="commentItem">
                <div class="company">
                  <span>测试</span>
                  |&nbsp;测试
                </div>
                <div class="price">¥测试</div>
                <div class="choose">
                  <div>
                    <el-button type="warning" size="mini">选定</el-button>
                  </div>
                  <div class="left">剩余 : 测试</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse>
    </div>

    <div class="detailRight"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.airTicketDetail {
  display: flex;
  .detailLeft {
    flex: 11;
    padding: 0 200px;
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
      .comment {
        background-color: #f6f6f6;
        border: 1px solid #dddddd;
        border-top: 0;
        display: flex;
        .commentLeft {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
        }
        .commentRight {
          flex: 12;

          .commentItem {
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
  }
  .detailRight {
    flex: 3;
  }
}
</style>