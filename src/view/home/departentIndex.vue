<template>
    <div>
      <van-grid :column-num="1" v-if=" !canEvaluatedDepartment && !seeResult">
        <van-grid-item v-for="(item,index) in list" :key="index">
          <img alt :src="item.image" style="width: 100%;height: 100%;">
        </van-grid-item>
      </van-grid>

      <van-popover v-model="showPopover" theme="dark" placement="bottom"
                   trigger="click" :actions="actions" @select="onSelect" style="margin-left: 6rem;margin-top: 15rem;width: 15rem;">
        <template #reference>
          <van-button type="info" block v-if="canEvaluatedDepartment == true ||seeResult == true" icon="eye-o">
            查看集中评价
          </van-button>
        </template>
      </van-popover>

<!--      <router-link to="/departentPage" style="margin-top: -70px;" >-->
<!--        <van-cell is-link v-if="canEvaluatedDepartment == true">点击进入集中评价</van-cell>-->
<!--        <van-button v-if="canEvaluatedDepartment == true" round type="default" class="unitLink">-->
<!--          点击进入集中评价-->
<!--        </van-button>-->
<!--      </router-link>-->

<!--      <router-link to="/departenName">-->
<!--        <van-cell is-link v-if="seeResult == true">点击查看集中评价结果</van-cell>-->
<!--        <van-button v-if="seeResult == true" style="margin-top: 30px;" round type="default" class="unitLink" >-->
<!--          点击查看集中评价结果-->
<!--        </van-button>-->
<!--      </router-link>-->
    </div>
</template>

<script>
export default {
name: "departentIndex",
  data(){
  return {
    showPopover : false,
    list:[
        { id : 0, image : require('../../assets/kaifang.jpg') }
      ],
    canEvaluatedDepartment: false,
    seeResult : false,
    actions : [{text:'进入集中评价',path:'/teachUnit'},{text:'查看集中评价结果',path:'/departenName'}],
    }
  },
  methods:{
    //选择跳转路径
  onSelect(action){
      this.$router.push(action.path)
    },

  filterInfo(){
      this.axios("/api/evaluate/filterInfo").then(res => {
        this.canEvaluatedDepartment = res.data.canEvaluatedDepartment;
        this.seeResult = res.data.seeResult;
      })
    }
  },
  created() {
    this.filterInfo();
  }
}
</script>

<style scoped>

</style>