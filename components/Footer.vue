<template>
  <div class="footer">
    <div class="top">
      <div class="navigation">
        <div class="title">游悠旅游网</div>
        <div>上亿旅行者共同打造的"旅行神器</div>
        <div><span class="orangefont">30,000</span>多个全球旅游目的地</div>
        <div><span class="orangefont">540,000</span>多个细分目的分新玩法</div>
        <div><span class="orangefont">40,000,000</span>次攻略下载</div>
        <div><span class="orangefont">26,000</span>家旅游产品供应商</div>
        <div><span class="orangefont">60000</span>多个全球旅游目的地</div>
      </div>
      <div class="navigation">
        <div class="title">关于我们</div>
        <div>隐私政策 商标声明</div>
        <div>服务协议 游记协议</div>
        <div>商城平台服务协议</div>
        <div>网络信息侵权通知指引</div>
        <div>闲云旅游旅游网服务监督员</div>
        <div>网站地图加入闲云旅游</div>
      </div>
      <div class="navigation">
        <div class="title">旅行服务</div>
        <div>旅游攻略 酒店预订</div>
        <div>旅游特价 国际租车</div>
        <div>旅游问答 旅游保险</div>
        <div>旅游指南 订火车票</div>
        <div>旅游资讯 APP下载</div>
      </div>
      <div class="quickCode">
        <img src="@/static/wechat.png" alt="" />
        <div class="follow">关注我们</div>
      </div>
    </div>
    <div class="bottom">
      京ICP备08001421号 京公网安备110108007702 Copyright © 2016-2019 博学谷 All
      Rights Reserved
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  background-color: #333333;
  padding: 30px 150px;
  padding-bottom: 0;
  color: #cccccc;
  font-size: 12px;
  line-height: 24px;

  .top {
    display: flex;
    padding-bottom: 30px;
    border-bottom: 1px solid #666666;
    .navigation {
      margin-left: 80px;
      .title {
        font-size: 16px;
        margin-bottom: 10px;
      }
      .orangefont {
        color: #ff8c27;
      }
      &:nth-child(3) {
        flex: 1;
      }
    }
    .quickCode {
      width: 150px;
      height: 150px;
      margin-right: 100px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .follow {
        text-align: center;
      }
    }
  }
  .bottom {
    text-align: center;
    line-height: 120px;
  }
}
</style>