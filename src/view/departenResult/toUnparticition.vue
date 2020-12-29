<template>
  <div class="participationEchartsBox">
    <div class="participationEchartsContent">
      <span class="joinTitle">未参评人数：{{nonparticipant}}</span>
      <ul>
        <li v-for="items in participationDetailData.unParticipationList" :key="items">
          <van-tag plain type="primary">
            {{items}}
          </van-tag>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
name: "toUnparticition",
  data() {
    return{
      participationDetailData : {},
      nonparticipant : "" , //未参评人数
    }
  },
  created() {
    this.participationDetailData = this.$route.query.participationDetailData
    this.nonparticipant = this.$route.query.nonparticipant;
  },
}
</script>

<style scoped>

</style>