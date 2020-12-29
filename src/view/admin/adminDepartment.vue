<template>
  <div class="main w">
    <div class="block">
      <van-button size="small" @click="$router.push('/newDepart')" type="info" icon="plus"
                  style="margin-top: 10px;margin-left: 10px;">新增部门
      </van-button>

      <van-list :finished="finished" finished-text="没有更多了" style="height: 530px;overflow: scroll;margin-top: 10px;">
        <van-row>
          <van-col span="12" v-for="(item, index) in departmentList" :key="index" style="width: 100% ;">
            <div style="background: white;text-align: left;">
              <p style="margin-left: 10px;padding-top: 10px;">部门名称：{{ item.name }}</p>
              <p style="margin-left: 10px;">是否启用：
                <template v-if="item.enable == true">
                  <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                </template>
                <template v-else>
                  <van-icon name="minus" size="1.2rem" style=" fontWeight : 600;"/>
                </template>
              </p>
              <p style="margin-left: 10px;">是否参与评价：
                <template v-if="item.isParticipation == true">
                  <van-icon name="success" color="#13ce66" size="1.2rem" style="fontWeight : 600;"/>
                </template>
                <template v-else>
                  <van-icon name="minus" size="1.2rem" style="fontWeight : 600;"/>
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
  name: "adminDepartment",
  data(){
    return {

      finished : false,
      departmentList : [], //部门列表
    }
  },
  methods: {
    editInfo(item){
      this.$router.push({ path:'/editDepart', query : { item : item}})
    },
    //获取集体评价部门列表
    getDepartmentList() {
      const url = `api/management/department/list`;
      this.axios.post(url).then(response => {
        if (response.data != null) {
          this.departmentList = response.data;
        }
      });
    },
  },

  created(){
    this.getDepartmentList();
  }
}
</script>

<style scoped>

</style>