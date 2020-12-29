<template>
  <div>
    <div class="main w">
      <div class="right1">
        <div class="rightTop">
          <span class="depName">{{personInfo.departmentName}}</span>
          <span class="rateName">{{personInfo.name}}</span>
        </div>
        <div class="rightMain">
          <div class="personsPhoto">
            <img :src="imgSrc + personInfo.employeeId" @click=" showPop = true" alt=""  :onerror="headPortrait" />
            <van-popup v-model="showPop" position="bottom" :style="{ height: '30%' }">
              <div class="personsMessage">

                  <p class="personName">姓名 : {{personInfo.name}}</p>
<!--                <p>-->

                  <p class="personRole">职责 : {{personInfo.role}}</p>
<!--                </p>-->
              </div>

              <div v-if="this.$store.state.currentUserEid == resultEid? false:true"
                   class="historyTable">
                <div class="criterionContent">
                  <span style="">满意 : {{personInfo.satisfiedCount}} 次 </span>
                  <span >不满意: {{personInfo.unSatisfiedCount}}次</span>
                </div>
              </div>
            </van-popup>
          </div>

          <van-list v-if="this.$store.state.currentUserEid == resultEid? false:true"
                    :finished="finished" finished-text="没有更多了" style="height: 320px;overflow: scroll;">
            <van-row>
              <van-col span="12" v-for="(item, index) in tableData" :key="index" style="width: 100% ;">
                <div style="background: white;text-align: left;">
                  <!--              <p style="margin-left: 10px;">序号:{{index + 1}}</p>-->
                  <p style="margin-left: 10px;">评价时间：{{item.time }}</p>
                  <p style="margin-left: 10px;">筛选：<span :style="{color:(item.isSatisfied == true ?  '#67c23a' : 'red')}">{{item.isSatisfied == true ? "满意" : "不满意"}}</span></p>
                  <p style="margin-left: 10px;">姓名：{{item.employeeName}}</p>
                  <p style="margin-left: 10px;">所属部门：{{item.employeeBelongDepartmentName}}</p>
                  <p style="margin-left: 10px;">评价详情：{{item.detail}}</p>
                  <van-divider />
                </div>
              </van-col>
            </van-row>
          </van-list>
          <van-pagination v-if=" isNull !== 0" style="margin-top: 40px;" @change="handleCurrentChange" v-model="currentPage" :total-items="pageLen" :page-count="pageCount"></van-pagination>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import api from "../../util/api.js";
export default {
name: "personResult",
  data(){
    return{
      finished : false,
      isSatisbool : 0,
      personInfo: {}, //个人信息
      imgSrc: api.findImage, //头像的地址
      headPortrait: 'this.src="' + require("../../assets/def1.png") + '"', //头像加载不出来的话显示
      resultEid: "", //当前结果页面的eid 2020-12-14新增
      pageLen: 0,
      showPop : false, //是否打开弹窗
      pageSize: 10,
      currentPage: 1,
      pageCount : 1, //页码
      isSatisfied: '',
      isSatis : [
        {
          value : 0,
          text : "全部"
        },
        {
          value : 1,
          text : "满意"
        },
        {
          value : 2,
          text : "不满意"
        },
      ], //是否满意
      eid: '',
      departmentId: '',
      isNull : 0,
      tableData: [], //
      satisfiedData: [
        //满不满意数据
        {
          satisfiedCount: 0,
          unSatisfiedCount: 0
        }
      ],
    }
  },
  created() {
    this.initParam();
    this.getResultInfo();
  },

  watch:{
    $route: function (newVal, oldVal){
      this.getResultInfo();
    }
  },

  methods:{
  //分页功能
    handleCurrentChange : function(val){
      this.currentPage = val;
      this.getResultInfo();
    },
  initParam: function (){
    this.eid = this.$route.params.eid;
    this.departmentId = this.$route.params.departmentId
  },
  //2020-12-14新增获取员工结果信息
    getResultInfo(){
      const url = `api/employee/statistics/getEmployeeEvaluatedDetail?eid=${
          this.eid
      }&departmentId=${this.departmentId}&isSatisfied=${
          this.isSatisfied}&pageSize=${this.pageSize}&pageNumber=${this.currentPage}`; //模板字符串

      this.axios.post(url).then(res => {
        // this.tableData = res.data.dataList;
        if (res.data != null){
          this.tableData = res.data.dataList;
          if (this.tableData == null){
            this.tableData = []
          }
          this.isNull = res.data.totoalNum;
          this.pageLen =Math.ceil(res.data.totoalNum / this.pageSize);
          this.personInfo = res.data;
          this.resultEid = this.personInfo.employeeId;

          this.satisfiedData[0].satisfiedCount = res.data.satisfiedCount;
          //不满意次数
          this.satisfiedData[0].unSatisfiedCount = res.data.unSatisfiedCount
        }
      })
    },
    //获取评论数
  }
}
</script>

<style scoped>

</style>