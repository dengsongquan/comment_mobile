<template>
  <div>
    <div class="main w">
      <div class="mainTitle">
        <div class="right1">
          <div class="rightTop">
            <span>当前单位:</span>
            <span class="depName">{{findEmployee.departmentName}}</span>
          </div>
          <div class="personList">
            <van-grid :column-num="2" style="background-color:rgba(0, 0, 0, .1);">
              <van-grid-item v-for="(value,index) in employeeList" :key="index" style="width:0;">
                <div class="photo" @click="goDetailPage(value.eid,value.departmentId)">
                  <van-image width="10rem" height="10rem" fit="contain" :src="imgSrc +value.eid"></van-image>
                </div>
                <p>姓名:{{value.name}}</p>
                <p @click="changeRole(value.role)">点击查看职责:</p>
                <van-popup position="bottom" :style="{ height: '30%' }" v-model="showRole">
                  <p style="margin-left: 10px;">{{role}}</p>
                </van-popup>
              </van-grid-item>
            </van-grid>

          </div>
        </div>
<!--        <span>机关教辅单位服务作风评价 - -->
<!--          <i class="">日常评价结果</i>-->
<!--        </span>-->

      </div>
    </div>
  </div>
</template>

<script>
import bus from "../../components/common";
import api from "../../util/api.js";
export default {
name: "personList",
  data(){
    return{
      vestinList : [],
      showRole : false, //是否显示职责弹出框
      itemClass : 0,
      tabActive : 0,
      employeeList : [],//员工列表
      findEmployee : [],
      depIds : '', //部门id
      imgSrc : api.findImage,
      headPortrait: 'this.src="' + require("../../assets/def1.png") + '"', //头像加载不出来的话显示
      role : "" ,//现实职责 2020-12-17
    }
  },
  methods: {
  changeRole(value){
    this.showRole = true;
    this.role = value;
  },
  //日常评价 2020-12-15新增
    goDetailPage(employeeId, departmentId){
      this.$router.push({
        name:"personResult",
        params:{
          eid: employeeId,
          departmentId: departmentId
        }
      })
    },
    //部门列表
    personList() {
      bus.$on("depFirstId", firstId => {
        const url = `api/employee/statistics/getEmployees?departmentId=${firstId}`;
        this.axios.post(url).then(res => {
          if (res.data.data != null){
              this.findEmployee  = res.data.data;
              this.employeeList = res.data.data.employeeList;
          }
        })
      })
    },

    //获取部门列表
    getDepId(){
      this.depIds = this.$route.params.depId;
      const url =  `api/employee/statistics/getEmployees?departmentId=${
          this.depIds
      }`;
      this.axios.post(url).then(res => {
        if (res.data.data == null){
          this.employeeList = [];
        }
        if (res.data.data != null){
          this.findEmployee = res.data.data;
          this.employeeList = res.data.data.employeeList;
        }
      })
    },
  },
  watch : {
    $route: function (newVal, oldVal) {
      this.getDepId();
    }
  },
  mounted() {
    //部门列表高亮显示
    // if (this.$route.params.depId - 1) {
    //   this.itemClass = this.$route.params.depId - 1;
    // } else {
    //   this.itemClass = 0;
    // }
  },
  created() {
    this.getDepId();
    this.personList();
  }
}
</script>

<style scoped>

</style>