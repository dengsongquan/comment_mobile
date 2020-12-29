<template>
  <div id="top">
<!--    <van-nav-bar title="标题" left-text="返回" left-arrow>-->
<!--      <template #right>-->
<!--        <van-icon name="search" size="18" />-->
<!--      </template>-->
<!--    </van-nav-bar>-->
<!--    <van-icon name="wap-home-o" />-->
    <van-nav-bar
      title="机关教辅单位服务作风评价"
      left-text="返回"
      right-text="主页"
      left-arrow
      @click-right="goHome"
      @click-left="exit"
    >
      <template #right>
        <van-icon name="wap-home-o" size="25"></van-icon>
      </template>
    </van-nav-bar>
        <van-dropdown-menu>
          <van-dropdown-item title="首页" @change="goto('/page/home')" :options="fPage">

          </van-dropdown-item>
          <van-dropdown-item title="下载结果" :options="downloadArr" @change="linkto">

          </van-dropdown-item>
          <van-dropdown-item title="消息中心" @change="goto('/personResultList')" :options="messageCenter"></van-dropdown-item>
<!--      <van-tab title="消息中心" @click="linkto('')"></van-tab>-->
<!--      <van-tab title="后台管理" @click="linkto('')">-->
          <van-dropdown-item title="后台管理" :options="manegeArr" @change="toBackMana"></van-dropdown-item>
        </van-dropdown-menu>
    <router-view />
<!--    <div class="footer">-->
<!--      <p class="siteinfo">-->
<!--        机关教辅党委服务热线 :-->
<!--        <span class="siteinfo ">8080</span>-->
<!--      </p>-->
<!--    </div>-->
<!--      </van-tab>-->
<!--    </van-tabs>-->
<!--    <van-grid :column-num="1" center="false">-->
<!--      <van-grid-item v-for="(item,index) in list" :key="index">-->
<!--        <img :src="item.image" style="width: 30%;float: left;">-->
<!--      </van-grid-item>-->
<!--    </van-grid>-->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
export default {
  name: "layout",
  data(){
    return{
      active:0,
      downloadResult:0,
      downloadArr: [
        { text:'下载日常评价结果', value : 0 ,url : '/selfDownLo'},
        { text:'下载集体评价结果', value : 1, url : '/departentDownLo'},
      ],
      fPage:[
        { text:'首页', value:0}
      ],
      messageCenter:[
        { text :'消息中心', value : 0}
      ],
      manegeArr : [
        { text: '人员管理', value : 0, url:'/adminPerson'},
        { text: '部门管理', value : 1, url:'/adminDepartment'},
        { text: '时间管理', value : 2, url:'/adminTime'},
        { text: '题目管理', value : 3, url:'/adminQuestion'},
      ],
      list:[
        { id : 0, image : require('../assets/szylogo.png')}
      ]
    }
  },
  methods:{
    exit(){
      history.go(-1)
    },
    //主页跳转
    goHome(){
      this.$router.push({path:'/page/home'})
    },
    //跳转
    linkto(url){
      url = this.downloadArr[url].url
      this.$router.push(url);
    },
    goto(url){
      this.$router.push(url)
    },
    toBackMana(url){
      url = this.manegeArr[url].url;
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>