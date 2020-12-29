<template>
  <div >
    <div class="main w" >
      <div class="mainTitle">
        <span>
          机关教辅单位服务作风评价 -
          <i class="voting">集中评价结果</i>
        </span>
      </div>
      <div class="left1">
        <van-cell icon="user-o" :title="item.name" v-for="(item, index) in vestinList" is-link :key="index" @click="getItem(item, index)">

        </van-cell>
<!--          <van-sidebar v-model="tabActive" style="width: 100%;">-->
<!--            <van-sidebar-item :title="item.name" v-for="(item, index) in vestinList" :key="index" @click="getItem(item, index)">-->

<!--            </van-sidebar-item>-->
<!--          </van-sidebar>-->
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import bus from "../../components/common";

export default {
  name: "departenName",
  data(){
    return {
      vestinList : [],
      itemClass : 0,
      tabActive : 0,
    };
  },
  created() {
    this.getVestinList();
  },
  mounted() {
    if (this.$route.params.depId -1){
      this.itemClass = this.$route.params.depId - 1;
    } else {
      this.itemClass = 0;
    }
  },
  methods:{
    //获取部门列表
    getVestinList(){
      this.axios.get("api/department/statistics/findAllEnable").then(res => {
        this.vestinList = res.data;

        var firstId = this.vestinList[0].depid;

        //传递参数到其他页面 firstId
        bus.$emit("depFirstId", firstId);
      });
    },

    //部门列表点击样式
    getItem(item, index){
      this.itemClass = index;
      this.$router.push({
        name: 'departentResult',
        path : '/departentResult',
        query:{
          depId : item.depid,
          isParticipation:item.isParticipation
        }
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
}
</script>

<style scoped>

</style>