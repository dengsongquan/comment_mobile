<template>
<div class="main w">
  <div class="mainTitle">
    <span>
      机关教辅单位服务作风评价 -
      <i class="voting">日常评价</i>
    </span>
  </div>
  <div class="left1">
    <div class="department">
      <van-cell :title="item.name" v-for="(item, index) in vestinList" :key="index" @click="getItem(item,index)" icon="user-o" is-link>

      </van-cell>
<!--      <van-sidebar v-model="tabActive" style="width: 100%;">-->
<!--        <van-sidebar-item :title="item.name" v-for="(item, index) in vestinList" :key="index" @click="getItem(item,index)">-->
<!--        </van-sidebar-item>-->
<!--      </van-sidebar>-->
    </div>
  </div>
</div>
</template>

<script>
import bus from "../../components/common";
export default {
name: "selfPage",
  data() {
    return {
      vestinList : [],
      tabActive : 0,
    }
  },
  methods: {

    getVestinList(){
      this.axios.get("api/employee/index").then(res => {
        this.vestinList = res.data;
        var firstId = this.vestinList[0].depid;
        bus.$emit("depFirstId", firstId);
      })
    },
    //部门列表点击样式 2020-12-14新增
    getItem(item,index){
      this.$router.push({
        name: 'vestin',
        params:{
          depId : item.depid
        },
        path : '/vestin/' + item.depid
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  created(){
    this.getVestinList();
  },
}
</script>

<style scoped>

</style>