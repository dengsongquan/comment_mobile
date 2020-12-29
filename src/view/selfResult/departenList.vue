<template>
  <div>
    <div class="main w">
      <div class="mainTitle">
        <span>机关教辅单位服务作风评价 -
          <i>日常评价结果</i>
        </span>
      </div>
      <div class="left1">
        <van-cell :title="item.name" v-for="(item, index) in vestinList" :key="index" @click="getItem(item,index)" is-link icon="user-o"></van-cell>
<!--        <van-sidebar v-model="tabActive" style="width: 100%;">-->
<!--          <van-sidebar-item :title="item.name" v-for="(item, index) in vestinList" :key="index" @click="getItem(item,index)">-->
<!--          </van-sidebar-item>-->
<!--        </van-sidebar>-->
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import bus from "../../components/common";

export default {
name: "departenList",
  data(){
    return{
      vestinList : [],
      itemClass : 0,
      tabActive : 0,
    }
  },
  methods:{
    //获取部门列表
    getVestinList() {
      this.axios
          .get("api/employee/statistics/getDepartments")
          .then(response => {
            this.vestinList = response.data;
            var firstId = this.vestinList[0].depid;
            bus.$emit("depFirstId", firstId); // bus发送第一个部门Id
          });
    },
    //部门列表点击样式 2020-12-14新增
    getItem(item,index){
      this.itemClass = index;
      this.$router.push({
        name: 'personList',
        params:{
          depId : item.depid
        },
        path : '/personList/' + item.depid
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  mounted() {
    //部门列表高亮显示
    if (this.$route.params.depId - 1) {
      this.itemClass = this.$route.params.depId - 1;
    } else {
      this.itemClass = 0;
    }
  },
  created() {
    this.getVestinList();
  }
}
</script>

<style scoped>

</style>