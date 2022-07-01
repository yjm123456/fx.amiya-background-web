<template>
  <div class="content">
    <div class="list1">
      <ul class="ul">
        <li v-for="(item, index) in title_list" :key="index" class="li">
          <span
            ref="spans"
            :style="{ color: activeStep === index ? '#1987e1' : 'skyblue' }"
            @click="jump(index)"
          >
            <div
              class="cirle"
              :style="{
                border:
                  activeStep === index
                    ? '2px solid #1987e1'
                    : '1px solid skyblue',
              }"
            ></div>
            {{ item.title }}
          </span>
          <div class="line"></div>
        </li>
      </ul>
    </div>
    <div class="result" @scroll="onScroll">
      <div class="scroll-item">
        <div class="titel_con">
          <span class="big_line"></span>
          <span class="small_line"></span>
          <span class="title1">公司介绍</span>
          <div class="english">
            <div class="english_tit">Company</div>
            <div>introduction</div>
          </div>
        </div>
        <div class="memo">
          上合未来是国内医美行业资深团队共同打造的医美产业链服务公司，旗下品牌啊美雅致力于整合
          医美产业资源，为用
          户打造医美全链路产业生态服务的专业平台，其核心主营业务涉及电商直播带
          货、机构供应链服务、产品供应链服务、机
          构代运营及IP孵化、医美商学院赋能等，通过数据关联业
          务，数字化驱动消费链条，精准定位目标市场及人群，打造医美
          行业的科技型公司。
        </div>
        <div class="bottom">
          <img :src="amy" alt="" class="amy" />
          <div class="bot_right_con">
            <div class="toc">
              <div class="toC_line">toC</div>
              <div class="to_title">
                致力于通过“机构精选、产品严选、价格优选”的选品标准，
                为用户提供“选购省心、产品放心、价格安心”的优质资源。
                同时通过“个性定制、专业服务、全程呵护”的服务理念，
                为用户打造“成果称心、到店安心、服务舒心”的极致体验。
              </div>
            </div>
            <div class="toc">
              <div class="toC_line">toB</div>
              <div class="to_title">
                致力于研究医美行业及机构痛点，通过专业化理论体系构建，
                联动业务实践市场检验，构建啊美雅针对行业机构行之有效
                的方法论体系，进而赋能医美机构业务运营能力及管理水平
                的提升，同时助力于推动中国医美行业的业务转型及产业升级。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-item">
        <div class="titel_con">
          <span class="big_line"></span>
          <span class="small_line"></span>
          <span class="title1">啊美雅业务</span>
          <div class="english">
            <div class="english_tit">A MEI YA</div>
            <div>business</div>
          </div>
        </div>
        <div class="amy_yw">
          <div class="yw_left">
            <div>
              <div class="end_title">短视频/直播运营业务</div>
              <div>
                啊美雅通过自有达人IP孵化，联动医院代运营IP孵化及医美行业专业医生IP孵化，形成强有力的短视频及直播运营矩阵。进而链接啊美雅优质的供应链体系，实现医美产业生态与医美消费生态的完美闭环，最终实现啊美雅与各合作机构共生共赢。
              </div>
            </div>
            <div class="jg_con">
              <div class="end_title">机构代运营及IP孵化</div>
              <div>
                啊美雅从战略层面制定运营策略，通过全域多维度分层级打造合作机构的流量护城河。帮助机构集中培训、一对一专业指导陪跑、以及提供各类运营分析报表工具，提升机构的流量运营能力。同时，啊美雅为业内三甲医院医生、民营医院医生及面诊师量身打造线上IP定位及包装，从个人擅长领域
                打造账号和内容的专业化定位输出，为个人和医
                院抢占更多的市场流量，助力完成流量变现。
              </div>
            </div>
          </div>
          <img
            src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/c7dc7c1afddc404582d3699a3f7af1e5.png"
            alt=""
            class="icon_kuang"
          />
          <div class="yw_right">
            <div>
              <div class="start_title">供应链运营体系</div>
              <div>
                啊美雅供应链运营体系秉持“机构精选”的服务
                理念完成全国医美医院供应链的布局，同时秉持
                “产品严选”的服务理念完成全国医美产品供应
                链的布局。以优质的“医院+产品”供应链体系
                给客户带来极致的服务体现，真正做到让客户安 心、放心、舒心。
              </div>
            </div>
            <div class="jg_con">
              <div class="start_title">啊美雅商学院</div>
              <div>
                啊美雅商学院致力于研究医美行业的发展动态及趋势，并创立具备市场价值的企业战略规划及运
                营策略的理论体系，赋能于各合作机构伙伴及医
                美行业的爱好者，以此推动医美产业互联网的升 级与转型。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="scroll-item">
        <div class="titel_con">
          <span class="big_line"></span>
          <span class="small_line"></span>
          <span class="title1">合作须知</span>
          <div class="english">
            <div class="english_tit">Cooperation</div>
            <div>guidelines</div>
          </div>
        </div>
        <div class="vedio_con">
          <!-- <video :src="vedio"  controls style="width:56%;height:440px;margin-left:20%"></video> -->
          <video :src="vedio" controls style="width:100%;height:440px;">
          </video>
        </div>
      </div>
      <div class="scroll-item">
        <div class="titel_con">
          <span class="big_line"></span>
          <span class="small_line"></span>
          <span class="title1">投诉反馈</span>
          <div class="english">
            <div class="english_tit">The complaint</div>
            <div>feedback</div>
          </div>
        </div>
        <div class="feed_back_con">
          <div class="inputcontet">
            <div class="">
              <span style="font-size:16px">意见标题</span>
              <Input
                v-model="form.title"
                placeholder="请输入意见标题"
                style="width: 400px;margin-left:15px"
              />
            </div>
            <div class="input_con">
              <span  style="font-size:16px">意见描述</span>
              <Input
                v-model="form.content"
                placeholder="请输入意见描述"
                style="width: 400px;margin-left:15px"
                type="textarea"
                :rows="4"
              />
            </div>
            <Button
              type="primary"
              style="width:100px;margin:15px 0 0 46%"
              @click="submite"
              >提交</Button
            >
          </div>
          <img :src="amy" alt="" class="feed_fack" />
        </div>
        <div class="amy_code">
          <div class="code">
            <img
              src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/dae60e742c6b4df6b60cd73304ac68e5.png"
              alt=""
              class="logo_img"
            />
            <div style="text-align:center">
              <img
                src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/9f9aabd7ee414fb695b036d4daec0e66.jpg"
                alt=""
                class="logo_img2"
              />
              <div class="bottom_title">小程序搜索“阿美雅”</div>
            </div>
            <div style="text-align:center">
              <img
                src="https://ameiya.oss-cn-hangzhou.aliyuncs.com/212bd96e53524f7b8a8eb263eb0e6914.jpg"
                alt=""
                class="logo_img3"
              />
              <div class="bottom_title">公众号搜索“啊美雅”</div>
            </div>
          </div>
          <div class="tit">
            ©CopyRight 2020-2022 Ameiy All Rights Reserved 浙ICP备2020037822号-1
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import amy from "@/assets/images/amy.jpg";
import vedio from "@/assets/images/info.mp4";
import * as api from "@/api/hospitalFeedBack";
export default {
  methods: {
    submite() {
      const { title, content, level } = this.form;
      const data = {
        title,
        content,
        level,
      };
      if(!title){
        this.$Message.warning('请先填写意见标题')
        return
      }
      if(!content){
        this.$Message.warning('请先填写意见描述')
        return
      }
      api.addHospitalFeedBack(data).then((res) => {
        if (res.code === 0) {
          this.$Message.success({
            content: "提交成功",
            duration: 3,
          });
          this.form = {};
        }
      });
    },
    jump(index) {
      var items = document.querySelectorAll(".scroll-item");
      for (var i = 0; i < items.length; i++) {
        if (index === i) {
          items[i].scrollIntoView({
            block: "start", //默认跳转到顶部
            behavior: "smooth", //滚动的速度
          });
        }
      }
    },
    onScroll(e) {
      let scrollItems = document.querySelectorAll(".scroll-item");
      for (let i = scrollItems.length - 1; i >= 0; i--) {
        // 判断滚动条滚动距离是否大于当前滚动项可滚动距离
        let judge =
          e.target.scrollTop >=
          scrollItems[i].offsetTop - scrollItems[0].offsetTop;
        if (judge) {
          this.activeStep = i;
          break;
        }
      }
    },
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        level: 0,
      },
      amy,
      vedio,
      activeStep: 0,
      title_list: [
        { title: "公司简介" },
        { title: "啊美雅业务" },
        { title: "合作须知" },
        // { title: "转化流程" },
        { title: "投诉反馈" },
      ],
    };
  },
};
</script>
<style>
.list1 {
  width: 12%;
  /* height: 40px;
  margin-bottom: 20px;
  background: pink; */
  overflow-y: hidden;
  background: #fff;
  border-radius: 2%;
}
.ul {
  height: 40px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.li {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.li > span {
  cursor: pointer;
}
.result {
  width: 90%;
  height: 800px;
  overflow-y: scroll;
  margin-left: 10px;
  color: #000;
}
.scroll-item {
  width: 100%;
  height: 600px;
  margin-top: 20px;
  background: #fff;
  border-radius: 2%;
  padding: 5% 8%;
  box-sizing: border-box;
}
.scroll-item > span {
  font-size: 40px;
}
.scroll-item:first-child {
  margin-top: 0;
}
.scroll-item:last-child {
  height: 870px;
}
.content {
  width: 100%;
  display: flex;
}
.line {
  height: 100px;
  width: 1px;
  /* color: skyblue; */
  display: block;
  border: 1px solid skyblue;
  margin-left: 7%;
}
.li:nth-child(2) {
  margin-left: 15px;
}
.li:last-child .line {
  border: none;
}
.cirle {
  width: 15px;
  height: 15px;
  border: 1px solid skyblue;
  display: inline-block;
  border-radius: 50%;
  font-weight: bold;
}
.titel_con {
  display: flex;
  align-items: flex-end;
}
.big_line {
  height: 50px;
  width: 12px;
  background: #e2b100;
}
.small_line {
  height: 35px;
  width: 6px;
  background: #e2b100;
  margin-left: 6px;
  margin-top: 15px;
}
.title1 {
  font-size: 30px;
  font-weight: bold;
  margin: 5px 10px 0;
  color: #000;
  position: relative;
  bottom: -7px;
}
.english {
  font-size: 10px;
  position: relative;
  bottom: -4px;
}
.english_tit {
  position: relative;
  bottom: -3px;
}
.memo {
  margin-top: 40px;
  font-size: 16px;
  text-indent: 2em;
}
.amy {
  width: 400px;
  height: 300px;
  margin-right: 30px;
}
.bottom {
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.toC_line {
  border: 5px solid #e2b100;
  border-radius: 50%;
  /* padding:  6px;
    box-sizing: border-box; */
  width: 45px;
  height: 45px;
  color: #e2b100;
  margin-right: 10px;
  text-align: center;
  padding-top: 6px;
  box-sizing: border-box;
}
.toc {
  display: flex;
  margin-bottom: 40px;
}
.to_title {
  flex: 1;
}
.icon_kuang {
  width: 400px;
  height: 300px;
  margin: 0 20px;
}
.amy_yw {
  display: flex;
  align-items: center;
  margin-top: 80px;
}
.end_title,
.start_title {
  font-size: 18px;
  color: #e2b100;
  font-weight: bold;
  margin-bottom: 5px;
}
.end_title {
  text-align: end;
}
.start_title {
  text-align: start;
}
.jg_con {
  margin-top: 15px;
}
.vedio_con {
  margin-top: 20px;
}
.feed_back_con {
  width: 100%;
  height: 300px;
  background: #DEC350;
  margin-top: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 100px;
  box-sizing: border-box;
}
.feed_fack {
  width: 340px;
  height: 230px;
  margin-left: 80px;
}
.input_con {
  margin-top: 40px;
}
.inputcontet {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.amy_code {
  width: 100%;
  height: 260px;
  background: #231815;
  margin-top: 80px;
  border-radius: 10px;
}
.code {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.amy_code {
  padding: 20px 10%;
  box-sizing: border-box;
  color: #fff;
  text-align: center;
}
.logo_img {
  width: 340px;
  height: 120px;
}
.logo_img2,
.logo_img3 {
  width: 150px;
  margin: 0 20px;
  text-align: center;
}
.bottom_title {
  color: #fff;
  margin-top: 5px;
}
.tit {
  margin-top: 20px;
}
</style>
