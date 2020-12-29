<template>
  <div class="main w">
    <!--    <p class="peosonResultTitle">评价系统 - 人员管理</p>-->
    <div class="block">
      <van-search label="姓名" shape="round" background="rgb(150, 97, 119)" show-action v-model="searchName"
                  placeholder="请输入姓名">
        <template #action>
          <van-button size="small" @click="searchList" type="info" icon="search">搜索</van-button>
          <van-button size="small" @click="$router.push('/addInfo')" type="info" icon="plus"
                      style="margin-top: 10px;margin-left: 10px;">新增
          </van-button>
        </template>
      </van-search>

      <van-dropdown-menu>
        <van-dropdown-item @change="handleDeparentChange" title="选择部门" v-model="departDown" :options="departArr">

        </van-dropdown-item>

        <van-dropdown-item @change="handleSeeResultChange" title="超级管理" v-model="manageDown" :options="manageArr">

        </van-dropdown-item>
      </van-dropdown-menu>
      <van-list :finished="finished" finished-text="没有更多了" style="height: 490px;overflow: scroll;">
        <van-row>
          <van-col span="12" v-for="(item, index) in employeeList" :key="index" style="width: 100% ;">
            <div style="background: white;text-align: left;">
              <!--              <p style="margin-left: 10px;">序号:{{index + 1}}</p>-->
              <p style="margin-left: 10px;padding-top: 10px;">所属部门：{{ item.departmentName }}</p>
              <p style="margin-left: 10px;">姓名：{{ item.name }}</p>
              <p style="margin-left: 10px;">工号：{{ item.eid }}</p>
              <p style="margin-left: 10px;">职责：{{ item.role }}</p>
              <p style="margin-left: 10px;">超级管理：
                <template v-if="item.seeResult == false">
                  <van-icon name="minus" size="1.2rem" style="fontWeight: 600;"/>
                </template>
                <template v-else>
                  <van-icon name="success" color="#13ce66" size="1.2rem" style=" fontWeight : 600; "/>
                </template>
              </p>
              <p style="margin-left: 10px;">
                角色：{{ item.title == 1 ? "正职" : item.title == 2 ? "副职" : item.title == 3 ? "普通教师" : "" }}</p>
              <p style="margin-left: 10px;">中层干部：
                <template v-if="item.midLevRepresent == true">
                  <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                </template>
                <template v-else>
                  <van-icon name="minus" size="1.2rem" style=" fontWeight : 600;"/>
                </template>
              </p>
              <p style="margin-left: 10px;">教工代表：
                <template v-if="item.tradeUnionRepresent == true">
                  <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                </template>
                <template v-else>
                  <van-icon name="minus" size="1.2rem" style="fontWeight : 600;"/>
                </template>
              </p>
              <p style="margin-left: 10px;">编辑：
                  <van-button size="small" icon="edit" type="info" @click="editInfo(index,item)" text="编辑">
                  </van-button>
                  <van-button size="small" icon="minus" @click="deleteInfo(item.id)" type="danger" text="删除">
                  </van-button>
              </p>
              <van-divider/>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <van-pagination @change="handleCurrentChange" style="margin-top: 10px;" v-model="currentPage"
                      :total-items="pageLen" :page-count="pageCount"></van-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminPerson",
  data() {
    return {
      showEdit : false, //是否显示编辑框
      //编辑数据
      finished: false,
      pageLen: 0, //总条数
      currentPage: 1, //当前默认加载的页码
      pageSize: 20, //页容量
      pageCount: 1,//页码数量
      depArr: [],//下拉部门
      manageArr: [
        {
          value: "",
          text: "查看全部"
        },
        {
          value: true,
          text: "是"
        },
        {
          value: false,
          text: "否"
        },
      ],//下拉超级管理
      searchName: '', //输入搜索的姓名
      departOne: 0,//部门名称第一位
      finish: true,
      nameCol: [], //名字下拉
      showName: false, //现实下拉弹出框
      showCell: false, //是否选中
      value1: "",
      name: "", //名称搜索
      departArr: [], //部门
      departmentId: "", //部门ID
      departmentData: {}, //选中的值
      userName: "",
      teachNo: "",//教职工号
      duty: "",//职责
      departName: '',//获取选中的部门名称 2020-12-16
      timeout: null, //超时设置 2020-12-16
      departDown: 0,
      manageDown: "",
      employeeList: [],
      seeResult: "",//supermanager
    }
  },

  methods: {
    editInfo(index,value){
      this.$router.push({ path:'/editInfo', query : { value : value}})
    },
    //2020-12-17删除一行数据
    deleteInfo(id) {
      let useId = id;
      this.$dialog.confirm({
        title: "提示",
        message: '确认删除吗?'
      }).then(() => {
        const url = `api/management/employee/delete?id=${useId}`;
        this.axios.get(url).then(res => {
          if (res.data.code == 0){
            // this.pageCount = res.data;
            this.$toast.success({
              message: "删除成功",
              duration: 900,
            });
            this.getEmployeeList();
          }else{
            this.$toast.fail({
              message: res.data.message,
              duration: 900
            });
          }
          
        })
      }).catch(() =>{})
    },
    //触发超级管理函数
    handleSeeResultChange(value) {
      this.manageDown = value;
      this.setContextData("manageDown", this.manageDown);
      let pageVal = 1;
      this.handleCurrentChange(pageVal);
    },
    //触发选择函数
    handleDeparentChange(depId) {
      this.departmentId = depId;
      this.departmentData = this.departArr.find(item => {
        return item.value === depId;
      });
      this.setContextData("departDown", this.departmentData.text);
      this.setContextData("departmentId", this.departmentId);
      let pageVal = 1;
      this.handleCurrentChange(pageVal);
    },
    handleCurrentChange(pageVal) {
      this.currentPage = pageVal;
      this.setContextData("currentPage", this.currentPage);
      this.getEmployeeList();
      this.getListCount();
    },

    //获取列表条数
    getListCount() {
      const url = `api/management/employee/listCount?departmentId=${
          this.departmentId
      }&employeeName=${this.searchName}&seeResult=${
          this.manageDown
      }&currentPage=${this.currentPage}&pageSize=30`;
      this.axios.post(url).then(res => {
        if (res.data != null) {
          this.pageLen = res.data;
          this.pageCount = Math.ceil(this.pageLen / this.pageSize);
        }
      })
    },
    //员工列表
    getEmployeeList() {
      const url = `api/management/employee/list?departmentId=${
          this.departmentId
      }&employeeName=${this.searchName}&seeResult=${
          this.manageDown
      }&currentPage=${this.currentPage}&pageSize=30`;
      this.axios.post(url).then(res => {
        if (res.data != null) {
          this.employeeList = res.data.data;
        }
      })
    },
    //搜索名称列表
    searchList(val) {
      this.userName = val;
      let pageVal = 1;
      this.handleCurrentChange(pageVal);
    },

    //确认名称 2020-12-17
    confName(value) {
      this.showName = false;
      this.userName = value;
      let tmpData;
      tmpData = /(.+)?(?:\(|（)(.+)(?=\)|）)/.exec(value)
      this.teachNo = tmpData[2];
    },
    //搜索名称
    querySearchAsync() {
      this.showName = true;
      var list = [{}];
      const url = `api/management/employee/listSystemEmployee?searchName=${
          this.userName
      }`;
      if (this.nameCol != []) {
        this.nameCol = [];
        this.axios.post(url).then(res => {
          for (let i of res.data) {
            i.value = i.employeeName + "(" + i.employeeId + ")";
          }
          list = res.data;
          list.forEach(item => {
            this.nameCol.push(item.value)
          })
          // callback(list);
        }).catch(err => {
          console.log(err)
        });
      }
    },
    //获取部门名称
    getDepart(value) {
      this.departArr.forEach(item => {
        if (item.value == value) {
          this.departName = item.text;
        }
      })
    },
    //给sessionStorage存值
    setContextData: function (key, value) {
      if (typeof value == "string") {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    // 从sessionStorage取值
    getContextData: function (key) {
      const str = sessionStorage.getItem(key);
      if (typeof str == "string") {
        try {
          return JSON.parse(str);
        } catch (err) {
          return str;
        }
      }
      return;
    },
    getDepartmentList() {
      const url = `api/management/employee/listDepartment`;
      this.axios.post(url).then(res => {
        if (res.data != null) {
          let depList = res.data;
          let allDep = {
            text: "查看所有部门",
            value: ""
          };
          let tempArr = [];
          depList.map(item => {
            tempArr.push({text: item.name, value: item.depid})
          })
          tempArr.unshift(allDep);
          this.departArr = tempArr;
        }
      })
    }
  },
  created() {
    this.departmentId = this.getContextData("departmentId") || ""; //部门id
    this.currentPage = this.getContextData("currentPage") || 1;
    this.manageDown = this.getContextData("manageDown") || ""; //是否超级管理员
    this.departDown = this.getContextData("departDown") || ""; //选择部门
    this.getDepartmentList();
    this.getEmployeeList();
    this.getListCount();
  }
}
</script>

<style scoped>

</style>