<template>
  <div>
    <van-popover v-model="showPopover" theme="dark" placement="bottom"
      trigger="click" :actions="actions" @select="onSelect" style="margin-left: 6rem;margin-top: 15rem;width: 15rem;">
    <template #reference>
      <van-button type="primary" block icon="comment-o">
        进入评价
      </van-button>
    </template>
    </van-popover>

<!--    <router-link to="/departentIndex">-->
<!--      <van-cell is-link>集中评价</van-cell>-->
<!--    </router-link>-->
<!--    <router-link to="/selfIndex">-->
<!--      <van-cell is-link>日常评价</van-cell>-->
<!--    </router-link>-->
  </div>
</template>

<script>

export default {
  name : "home",
  data () {
    return {
      showPopover: false,
      actions : [{text:'集中评价',path:'/departentIndex'},{text:'日常评价',path:'/selfIndex'}],
    }
  },
  methods: {
    onSelect(action){
      this.$router.push(action.path)
    },
  },
}
</script>

<style scoped>

</style>