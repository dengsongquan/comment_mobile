<template>
  <div style=" width: 100%;
    height: 250%;
    background-color: aliceblue;
    padding: 10px 2px;
    margin: 5px 0;
    box-shadow: 0 1px 2px #778a97;">
    <span>全部评价完成率:</span>
    <van-progress color="rgba(112, 143, 129, 0.7)" style="margin-top: 15px;margin-bottom: 20px;" :percentage="fullFinishedRate" stroke-width="8"></van-progress>
    <span style="margin-top: 20px;">当前部门参评率:</span>
    <van-progress color="rgba(112, 143, 129, 0.7)" style="margin-top: 15px;margin-bottom: 20px;" :percentage="participationRate" stroke-width="8"></van-progress>
  </div>
</template>

<script>
export default {
name: "toRateComplete",
  data() {
    return {
      fullFinishedRate : '',
      participationRate : '',
    };
  },
  created() {
    this.fullFinishedRate = this.$route.query.fullFinishedRate
    this.participationRate = this.$route.query.participationRate
  },
}
</script>

<style scoped>

</style>