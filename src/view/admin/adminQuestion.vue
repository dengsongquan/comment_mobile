<template>
<!--  style="background-color:#fff"-->
  <div class="main w">
    <div>
      <van-button size="small" @click="$router.push('/addNewQues')" type="info" icon="plus"
                  style="margin-top: 10px;margin-left: 10px;">新增评价题目
      </van-button>
      <van-list :finished="finished" finished-text="没有更多了" style="height: 530px;overflow: scroll;margin-top: 10px;">
        <van-row>
          <van-col span="12" v-for="(item, index) in questionList" :key="index" style="width: 100% ;">
            <div style="background: white;text-align: left;">
              <p style="margin-left: 10px;padding-top: 10px;">评价类型：{{ item.surveyId == 1 ? "集体评价" : "个人评价"}}</p>
              <p style="margin-left: 10px;padding-top: 10px;">题目：{{ item.title }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">题目展示顺序：{{ item.priority }}</p>
              <p style="margin-left: 10px;padding-top: 10px;">题目类型：{{ item.typeId == 1 ? "单选题" : "简单题"}}</p>
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
name: "adminQuestion",
  data(){
    return {
      finished: false,
      questionList: [],
      // 集体题目新增
      departmentForm: {
        detail: "", //题目详情介绍
        enable: true, //是否启用
        id: "", //题目id
        isOverallStatistics: true, //是否参与集体统计
        necessary: false, //是否必填 1必填 0 非必填 ,
        //选项列表，当题目类型 为1 选项题时，必填 ,
        optionDtoList: [
          {
            answerDesc: "", //选项描述
            id: "", //选项id ,
            score: 0, //选项得分 当题目参与统计权重时，不能为空 ,
            tag: 0 // 选项是否积极 当选项为 满意 不满意 时，建议选择
          }
        ],
        overallStatistics: true,
        priority: 0, // 题目展示顺序
        showDetail: false, //展示评价详情(集体评价) 1展示，0不展示 ,
        statisticTitle: "", //数据展示title ,
        statisticTitleId: 1, //统计集体评价时的标题 1评价内容, 2作风变化情况 3其他不参与
        surveyId: 1, //评价类型 1集体评价，2个人评价 ,
        tag: false, //题目是否涉及内容积极性 仅当typeId = 2 即输入框题型时 ,
        title: "", //题目 ,
        typeId: 1, // 题目类型 1单选，2输入框 ,
        weight: 0 //统计权重(集体评价) 仅当 isOverallStatistics 为true参与统计时
      },
      //个人题目新增
      personForm: {
        detail: "", //题目详情介绍
        id: "",
        enable: false, //是否启用
        necessary: false, //是否必填 1必填 0 非必填 ,
        //选项列表，当题目类型 为1 选项题时，必填 ,
        optionDtoList: [
          {
            answerDesc: "", //选项描述
            id: "", //选项id ,
            tag: 0 // 选项是否积极 当选项为 满意 不满意 时，建议选择
          }
        ],
        priority: 0, // 题目展示顺序
        surveyId: 2, //评价类型 1集体评价，2个人评价 ,
        tag: false, //题目是否涉及内容积极性 仅当typeId = 2 即输入框题型时 ,
        title: "", //题目 ,
        typeId: 1 // 题目类型 1单选，2输入框 ,
      },
    }
  },
  methods: {
    editInfo(item){
      this.$router.push({ path : '/editQues', query : { item: item }})
    },
    //获取题目列表
    getQuestionList() {
      const url = `api/management/question/list`;
      this.$axios.post(url).then(res => {
        if (res.data != null) {
          this.questionList = res.data;
        }
      });
    }
  },
  created() {
    this.getQuestionList();
  },
}
</script>

<style scoped>

</style>