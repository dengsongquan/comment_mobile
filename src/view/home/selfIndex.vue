<template>
  <div>
    <van-popover v-model="showPopover" theme="dark" placement="bottom"
                 trigger="click" :actions="actions" @select="onSelect" style="margin-left: 6rem;margin-top: 15rem;width: 15rem;">
      <template #reference>
        <van-button type="info" block icon="user-o">
          日常评价
        </van-button>
      </template>
    </van-popover>

<!--      <router-link to="/selfPage">-->
<!--        <van-cell is-link>点击进入日常评价</van-cell>-->
<!--      </router-link>-->
<!--      <router-link to="/departenList">-->
<!--        <van-cell is-link v-if=" seePersonResult == true">点击查看日常评价结果</van-cell>-->
<!--      </router-link>-->
  </div>
</template>

<script>
export default {
name: "selfIndex",
  data() {
    return {
      showPopover: false,
      actions : [{text:'进入日常评价',path:'/selfPage'},{text:'查看日常评价结果',path:'/departenList'}],
      seePersonResult: false //是否可以看日常结果权限
    }
  },

  methods: {
    onSelect(action){
      this.$router.push(action.path)
    },
    filterInfo(){
      const url = `api/evaluate/filterInfo`;
      this.axios(url).then(res => {
        this.seePersonResult = res.data.canSeePersonalResult;
      })
    }
  },
  created() {
    this.filterInfo();
  },
}
</script>

<style scoped>

</style>