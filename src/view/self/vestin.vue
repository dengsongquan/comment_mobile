<template>
  <div>
    <div class="main w">
      <div class="right1">
        <div class="rightTop">
          <span>当前单位:</span>
          <span class="depName">{{findEmployee.departmentName}}</span>
        </div>
        <div class="personList">
          <van-grid :column-num="2" style="background-color:rgba(0, 0, 0, .1);">
            <van-grid-item v-for="(value,index) in employeeList" :key="index" style="width:0;">
              <div class="photo" @click="goDetailPage(value.eid,value.departmentId)">
                <van-image width="10rem" height="10rem" fit="fill" :src="imgSrc +value.eid">

                </van-image>
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
    </div>
  </div>
</template>

<script>
import bus from "../../components/common";
import api from "../../util/api.js";
export default {
name: "vestin",
  data(){
    return{
      findEmployee: [],
      employeeList: [],
      vestinId:'',
      headPortrait: 'this.src="' + require("../../assets/def1.png") + '"', //头像加载不出来的话显示
      imgSrc: api.findImage, //头像的地址
      showRole : false, //是否显示职责弹出框
      role : '',
    }
  },
  watch : {
    $route: function (newVal, oldVal){
      this.getDepManList();
    }
  },
  created() {
    this.personList();
    this.getDepManList();
  },
  methods:{
    changeRole(value){
      this.showRole = true;
      this.role = value;
    },
    //日常评价 2020-12-15新增
    goDetailPage(employeeId, departmentId){
      this.$router.push({
        name:"person",
        params:{
          personEid: employeeId,
          departmentId: departmentId
        }
      })
    },
    personList(){
      bus.$on("depFirstId", firstId => {
        const url = `api/employee/findEmployeeByDepartmentId?departmentId=${firstId}`;
        // 获取部门人员 传入id
        this.axios.post(url).then(res => {
          if (res.data.data.employeeList != null){
            this.findEmployee = res.data.data;
            this.employeeList = res.data.data.employeeList
          }
        })
      })
    },

    getDepManList(){
      this.vestinId = this.$route.params.depId;
      const url = `api/employee/findEmployeeByDepartmentId?departmentId=${this.vestinId}`;
      this.axios.post(url).then(res => {
        if (res.data.data != null){
          this.findEmployee = res.data.data;
          this.employeeList = res.data.data.employeeList;
        }
      })
    },
  }
}
</script>

<style scoped>

</style>