<template>
    <div class="peosonResultTitle">
<!--      <p class="">日常评价情况</p>-->
      <van-dropdown-menu>
        <van-dropdown-item title="选择是否满意" @change="handleSatisfyChange" v-model="pleasure" :options="pleasureArr">

        </van-dropdown-item>

        <van-dropdown-item title="选择部门" v-model="depart" @change="handleDeparentChange" :options="departArr">

        </van-dropdown-item>

        <van-dropdown-item title="是否已读" v-model="isRead" :options="readArr" @change="handleIsRead" @open="getpersonResultList">

        </van-dropdown-item>
      </van-dropdown-menu>

      <van-list :finished="finished" finished-text="没有更多了" style="height: 490px;overflow: scroll;">
        <van-row>
          <van-col span="12" v-for="(item, index) in personList" :key="index" style="width: 100% ;">
            <div style="background: white;text-align: left;" @click="goPersonResult(item.employeeId, item.departmentId)">
<!--              <p style="margin-left: 10px;">序号:{{index + 1}}</p>-->
              <p style="margin-left: 10px;">时间：{{item.time}}</p>
              <p style="margin-left: 10px;">姓名：{{item.name}}</p>
              <p style="margin-left: 10px;">所属部门：{{item.departmentName}}</p>
              <p style="margin-left: 10px;">满意(次)：{{item.satisfiedCount}}</p>
              <p style="margin-left: 10px;">不满意(次)：{{item.unSatisfiedCount}}</p>
              <p style="margin-left: 10px;">是否已读：{{item.isRead == true ? "已读" : "未读"}}</p>

              <van-divider />
            </div>
          </van-col>
        </van-row>
      </van-list>
      <van-pagination @change="handleCurrentChange" style="margin-top: 10px;" v-model="currentPage" :total-items="pageLen" :page-count="pageCount"></van-pagination>
  </div>
</template>

<script>
import fakeTable from "../../components/fakeTable";
import FakeTable from "../../components/fakeTable";
export default {
  name: "personResultList",
  components: {FakeTable},
  data(){
    return{
      elementStyleObj: {
        background: "rgb(245, 249, 255) ",
        fontSize: "1rem",
        color: "#434343"
      },
      name :"姓名：",
      isShow : false, //弹出框是否显示
      tableHead: [
            { label : '时间', prop : 'time', span : '4'},
            { label : '姓名', prop : 'name', span : '4'},
            { label : '所属部门', prop : 'departmentName' , span : '4'},
            { label : '满意(次)', prop : 'satisfiedCount' , span : '4'},
            { label : '不满意(次)', prop : 'unSatisfiedCount' , span : '4'},
            { label : '筛选', prop : 'isRead' , span : '4'}],
      pleasure : 0,
      personList : [],
      perPage: 10,
      depart : 0,
      isRead : 0,
      pleasureArr : [
        {
          value: 0,
          text: "查看全部"
        },
        {
          value: 1,
          text: "不满意"
        },
        {
          value: 2,
          text: "满意"
        }
      ],// 是否满意
      departArr : [], //选择部门
      readArr:[
        {
        value : 0,
        text : "全部"
        },
        {
          value : 1,
          text : "已读"
        },
        {
          value : 2,
          text : "未读"
        }
      ], //是否已读
      loading : false,
      finished : false,
      pageLen: 0, //总条数
      currentPage: 1, //当前默认加载的页码
      pageSize: 30, //页容量
      pageCount : 1,//页码数量
      isSatisfied: "", //是否满意
      departmentId: "", //部门ID
      departmentName : "",//部门name
      headList : [],//表头
      departmentData : {},// 选中的值
      read : 0, //判断是否已读
    }
  },
  comments:{
    fakeTable
  },
  methods:{
    //选择部门
    handleDeparentChange(depId){
      this.departmentId = depId;
      this.departmentData = this.departArr.find(item => {
        return item.value === depId;
      });
      this.setContextData("departmentName", this.departmentData.text);
      this.setContextData("departmentId", this.departmentId);
      let currentPage = 1;
      this.handleCurrentChange(currentPage);
    },
    //是否已读
    handleIsRead(value){
      this.read = value;
      this.getpersonResultList();
    },
    //选择是否满意
    handleSatisfyChange(value){
      if (value === 2){
        value = false
      }else if (value === 1){
        value = true
      }else if (value === 0){
        value = "";
      }

      this.isSatisfied = value;

      this.setContextData("isSatisfied", this.isSatisfied);
      let currentPage = 1;
      this.handleCurrentChange(currentPage);
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.isRead = this.read;
      this.setContextData("currentPage", this.currentPage);
      this.getpersonResultList();
    },
    beforeClose(action, done){
      if (action === 'confirm'){
        this.isShow = false;
      }else if (done === "cancel"){
        this.isShow = false;
      }
    },
    //跳转到详情界面
    goPersonResult(eid,departmentId){
      this.$router.push({
        name:"personResult",
        params:{
          eid: eid,
          departmentId : departmentId
        }
      });
    },
    getVestinList(){
      this.axios.get("api/employee/statistics/getDepartments").then(res => {
        let depList = res.data;
        let allDep = {
          text : "查看所有部门",
          value : "",
        }
        let tempArr = [];
        depList.map(item => {
          tempArr.push({ text : item.name, value : item.depid})
        })
        tempArr.unshift(allDep);
        this.departArr = tempArr;
      })
    },
    getpersonResultList(){
      const url = `api/message/list?pageSize=${this.pageSize}&pageNumber=${
          this.currentPage
      }&departmentId=${this.departmentId}&isSatisfied=${this.isSatisfied}`;
      this.axios.post(url).then(res => {
        this.personList = res.data;
        if (this.read === 1){
          this.personList = this.personList.filter(item => item.isRead === true);
        }else if (this.read === 2){
          this.personList = this.personList.filter(item => item.isRead === false)
        }
      });
      this.getPageLen();
    },
    //获取评论总数
    getPageLen(){
      const url = `api/message/countAll?departmentId=${
          this.departmentId
      }&isSatisfied=${this.isSatisfied}`;
      this.axios.post(url).then(res => {
        this.pageLen = res.data;
        this.pageCount = Math.ceil(this.pageLen / this.pageSize);
      })
    },
    getContextData : function (key){
      const str = sessionStorage.getItem(key);
      if (typeof str == "string"){
        try{
          return JSON.parse(str);
        } catch (e){
          return str;
        }
      }
      return ;
    },
    setContextData : function (key ,value){
      if (typeof value == "string"){
        sessionStorage.setItem(key, value);
      }else {
        sessionStorage.setItem(key, JSON.stringify(value))
      }
    },
  },
  created() {
    this.isSatisfied = this.getContextData("isSatisfied") || '';
    this.pageSize = this.getContextData("pageSize") || 30;
    this.currentPage = this.getContextData("currentPage") || 1;
    this.departmentId = this.getContextData("departmentId") || '';
    this.getpersonResultList();
    this.getVestinList();
  }
}
</script>

<style lang="less" scoped>
  .vant-table{
    height: 440px;
    overflow: scroll;
    .table {
      border-radius: .185185rem;
      .th {
        height: 1.074074rem;
        line-height: 1.074074rem;
        background-color: #393943;
        text-align: center;
        border-top-left-radius: .185185rem;
        border-top-right-radius: .185185rem;
      }
      .list-tr {
        height: 1.074074rem;
        line-height: 1.074074rem;
      }
      .list-tr:nth-child(2n) {
        background-color: #33333b;
      }
    }
  }
</style>