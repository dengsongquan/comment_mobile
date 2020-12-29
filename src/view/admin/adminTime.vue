<template>
  <div class="main w">
    <div class="block">
      <van-button size="small" @click="$router.push('/newTime')" type="info" icon="plus"
                  style="margin-top: 10px;margin-left: 10px;">新增时间
      </van-button>
      <van-list :finished="finished" finished-text="没有更多了" style="height: 530px;overflow: scroll;margin-top: 10px;">
        <van-row>
          <van-col span="12" v-for="(item, index) in evaluateTimeList" :key="index" style="width: 100% ;">
            <div style="background: white;text-align: left;">
              <p style="margin-left: 10px;padding-top: 10px;">评价开始日期：{{ item.startAt }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">评价结束日期：{{ item.endAt }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">结果开放时间：{{ item.resultStartShow }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">结果结束时间：{{ item.resultEndShow }}</p>
              <p style="margin-left: 10px;">是否启用：
                <template v-if="item.enable == true">
                  <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                </template>
                <template v-else>
                  <van-icon name="minus" size="1.2rem" style=" fontWeight : 600;"/>
                </template>
              </p>
              <p style="margin-left: 10px;">编辑：
                <van-button size="small" icon="edit" type="info" @click="editInfo(item)" text="编辑">
                </van-button>
              </p>
              <van-divider/>
            </div>
          </van-col>
        </van-row>
      </van-list>

    </div>
  </div>
</template>

<script>
export default {
name: "adminTime",
  data(){
    return {
      finished : false,
      evaluateTimeList : [],//时间列表
    }
  },
  methods: {
  //跳转到编辑时间
    editInfo(item){
      this.$router.push({ path: '/editTime', query: { item : item }})
    },
    //获取集体评价时间段列表
    getEvaluateTimeList() {
      const url = `api/management/evaluateTime/list`;
      this.axios.post(url).then(response => {
        if (response.data != null) {
          this.evaluateTimeList = response.data;
        }
      });
    }
  },
  created() {
    this.getEvaluateTimeList();
  },
}
</script>

<style scoped>

</style>