<template>
  <div class="participationEchartsContent">
    <span class="joinTitle">已参评人数：{{participationCount}}</span>
    <ul>
      <li v-for="parItems in participationDetailData.participationList" :key="parItems">
        <van-tag plain type="primary">
          {{parItems}}
        </van-tag>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
name: "toPaticipation",
  data () {
    return {
      participationCount: 0,
      participationDetailData : {},
    }
  },
  created () {
    this.participationDetailData = this.$route.query.participationDetailData
    this.participationCount = this.$route.query.participationDetailData.participationCount
  },
}
</script>

<style scoped>

</style>