<template>
  <div class="main w" style="text-align: center;">
    <div class="right">
      <div class="rightTop" style="display: inline-block;">
        <span>机关教辅单位</span>
      </div>
      <van-popup style="text-align: center;"
          v-model="showPopup"
          position="top">
        <div class="left" style="display: inline-block;">
          <div class="leftTitle">
            <span>评价项目</span>
          </div>
          <div class="leftContent">
        <span class="subject">
          {{index == allEvaluateList.length ? allEvaluateList.length : (index + 1)}}.{{evaluateItmes.title}}
        </span>
            <ul>
              <li v-html="evaluateItmes.detail "></li>
            </ul>
          </div>
        </div>
      </van-popup>
    <van-form>
      <van-list :finished="finished" finished-text="没有更多了" style="height:600px;overflow:scroll;" v-model="loading">
        <van-row>
          <van-col span="12" v-for="(item, index) in evaluateItmes.departmentQuestionnaireDtoList" :key="index" style="width: 100% ;">
            <div style="background: white;text-align: left;padding-left: 1rem;padding-top: 1rem;">
              <span>{{index+1}}. {{item.name}}</span>
              <div v-if="evaluateItmes.typeId == 1" v-for="items in item.answers" :key="items.id">
                <van-radio-group style="margin:10px 0;"  v-model="radioItems[index]">
                  <van-radio :name="evaluateItmes.questionnaireId +'/' + item.depid + '/'+items.answerDesc + '/' + items.id">
                    <span>{{items.answerDesc}}</span>
                  </van-radio>
                </van-radio-group>
              </div>


              <van-field @input="descArea" :name="radioItems[index] = evaluateItmes.questionnaireId +'/' + item.depid + '/'+ textAreaList[index]" v-if="evaluateItmes.typeId == 2 && evaluateItmes.questionnaireId == 4 ? true : false" placeholder="请输入打交道次数"  v-model="textAreaList[index]" maxlength="4">

              </van-field>

              <van-field @input="blankDescArea" :name="radioItems[index] = evaluateItmes.questionnaireId +'/' + item.depid + '/'+ textAreaList[index]" v-if="evaluateItmes.typeId == 2 && evaluateItmes.questionnaireId != 4"   v-model="textAreaList[index]" maxlength="800">

              </van-field>
              <van-divider/>
            </div>
          </van-col>
        </van-row>
      </van-list>
      <div style="display: inline-block;margin-top: 1rem;">
        <van-button v-if="index > 0 ? true : false" size="small" type="primary" @click="backPage">上一项</van-button>
        <van-button v-if="index < allEvaluateList.length - 1 " size="small" type="primary" @click="nextPage">下一项</van-button>
        <van-button v-if="index == allEvaluateList.length - 1 " size="small" type="primary" @click="nextPage">下一项</van-button>
<!--        <van-button size="small" type="primary" @click=" showPopup = true">查看评价项目</van-button>-->

      </div>
    </van-form>
    </div>
  </div>
</template>

<script>
import { setSessionStorage, getSessionStorage } from "../../store/sessionStorage.js";
export default {
name: "teachUnit",
  data(){
    return {
      loading : false,
      showPopup : false, //显示弹出层
      finished : false,
      evaluateItmes: {}, //当前题的信息
      radioItems: [], //选择题的内容
      radioItemsR: [], //保存选择题的容器
      textAreaList: [], //保存文本域内容，但不包括Id,
      textAreaListR: [], //保存文本输入框的容器
      answerDesc: "",
      index: 0, //默认取第一个
      allEvaluateList: [], //全部的数据
      evaluateSubmit: [], //提交的数据
      isSubmit: false, //是否提交 , 关闭弹窗提示
    }
  },
  methods: {
    getEvaluateItmes(){
      // this.loading = true;
      const url = "api/department/edit"+"?a="+Math.random();
      this.axios.get(url).then(res => {
          this.allEvaluateList = res.data.data;
          this.evaluateItmes = this.allEvaluateList[this.index];
          this.echoValues(this.evaluateItmes);
          this.loading = false;
          this.finished = true;
      });
      this._getSeesionData();
    },
    //获取本地缓存
    _getSeesionData(){
      let radioItems = this.sessionStorage.getSessionStorage(this._getRadioKey(this.index));
      if (radioItems){
        this.radioItems = radioItems;
      }
      let textAreaListR = this.sessionStorage.getSessionStorage(this._getKey(this.index));
      if (textAreaListR){
        this.textAreaList = textAreaListR;
      }
    },
    //判断是否是数字
    descArea(){
      let textVal = this.textAreaList;
      textVal.forEach((j ,idx) => {
        if(j != null){
          let answersStr = j.split("/")[0];
          let val = Number(answersStr);
          if(isNaN(val)){
            this.$toast({
              message: "仅支持 0-9 的阿拉伯数字格式哦!",
              duration: 1500
            });
            this.textAreaList[idx] = "";
            return;
          }
        }
      })
    },

    //校验输入是否为空格
    blankDescArea(){
      let textVal = this.textAreaList;
      textVal.forEach((j, idx) => {
        if (j != null){
          let answersStr = j.split("/")[0];
          if(answersStr.match(/^\s*$/)){
            this.$toast({
              message: "第" + (idx + 1) + "个部门不能为空!!",
              duration: 1500
            });
            this.textAreaList[idx] = "";
            return;
          }
        }
      })
    },
    _getKey(index){
      const key = "textAreaListR-" + index;
      return key;
    },
    _getRadioKey(idx) {
      const key = "radioKey-" + idx;
      return key;
    },
    //下一项
    nextPage(){
      let arr = this.radioItems;
      this.radioItemsR[this.index] = arr;
      this._setSessionData();
      let departments = this.evaluateItmes.departmentQuestionnaireDtoList;
      if (this.evaluateItmes.necessary == 0){
        this.unNecessaryVerify(arr, departments);
      }else if (this.evaluateItmes.necessary == 1){
        this.necessaryVerify(arr, departments);
      }
    },

    necessaryVerify(arr, departments){
      if (this.evaluateItmes.typeId == 2){
        let b = arr.join("").split("undefined");
        let n = arr.join("").split("null");
        if (b.length > 1 || n.length > 1){
          this.overMessageBox();
        }else {
          this.saveSuccess();
        }
      }else if (this.evaluateItmes.typeId == 1){
        let b = arr.join("").split("/");
        if (b.length < departments.length*3 + 1){
          this.overMessageBox();
        }else {
          this.saveSuccess();
        }
      }
    },
    saveSuccess(){
      if(this.index == this.allEvaluateList.length - 1){
        this.submit();
      }else{
        const primise = new Promise((resolve) => {
          resolve(this.showToast())
        });
        primise.then(() =>{
          setTimeout((this.showPopWin),1000 );
        });
      }
    },
    //显示弹窗
    showPopWin(){
      this.showPopup = true;
      this.nextPageSize();
    },
    showToast(){
      this.$toast.success({
        message: "你的评价信息已经被保存",
        duration: 600
      })
    },
    overMessageBox(){
      if(this.index == this.allEvaluateList.length - 1){
        this.$dialog.alert({
          title:'提示',
          message:'还有项目未填写完毕，请填写完毕再提交!!'
        });
        return;
      }else{
        this.$dialog.alert({
          title:'提示',
          message:'还有项目未填写完毕，请填写完毕再进入下一项!!'
        });
        return;
      }
    },
    //异步调用
    fPromise(all){
      let promise = Promise.resolve();
      all.forEach((p, index) => {
        promise = promise.then(p)
      })
    },
    unNecessaryVerify(arr, departments){
      if(this.evaluateItmes.typeId == 2){
        let b = arr.join("").split("undefined");
        let n = arr.join("").split("null");
        if (b.length > 1 || n.length > 1){
          this.nextMessageBox();
        }else {
          this.saveSuccess();
        }
      }else if (this.evaluateItmes.typeId == 1){
        let b = arr.join("").split("/");
        if (b.length < departments.length * 3 + 1){
          this.nextMessageBox();
        }else {
          this.saveSuccess();
        }
      }
    },
    //提交功能
    submit(){
      let arr = this.radioItems;
      this.radioItemsR[this.index++] = arr;
      for(let i=0;i<this.index;++i){
        let radioItems = this.radioItemsR[i];
        radioItems.forEach(j => {
          if(j != null){
            let answersArr = j.split("/");
            if(answersArr[2] == ""){
              answersArr.splice(2,1);
              this.evaluateSubmit.push({
                questionnaireId: answersArr[0],
                evaluatedDepartmentId: answersArr[1],
                answerDesc: answersArr[2],
                answerId: answersArr[3]
              })
            }else {
              this.evaluateSubmit.push({
                questionnaireId: answersArr[0],
                evaluatedDepartmentId: answersArr[1],
                answerDesc: answersArr[2],
                answerId: answersArr[3]
              })
            }
          }
        });
      }
      this.axios({
        url: "api/department/submit",
        method: "post",
        data: { answers: this.evaluateSubmit },
        headers: {
          "Content-Type": "application/json"
        }
      }).then(res => {
        this.evaluateSubmit = [];
        this.isSubmit = true;
        if (res.data.code == 0){
          this.$dialog.confirm({
            title:'恭喜',
            message: '你的评价提交成功!'
          }).then(() => {
            this.$router.push("/page/home");
          });
          return;
        }else{
          this.$toast.fail({
            title : '错误',
            message : res.data.message
          });
          return;
        }
      });
    },
    nextMessageBox(){
      if(this.index == this.allEvaluateList.length - 1){
        this.$dialog.confirm({
          title : '提示',
          message : '检测到当前还有项目未填写完毕，是否确定提交?',
        }).then(() => {
          this.submit();
        }).catch(() => {})
      }else {
        this.$dialog.confirm({
          message : '检测到当前还有项目未填写完毕，是否确定进入下一项?',
          title : '提示'
        }).then(() =>{
          this.nextPageSize();
        }).catch(() => {});
      }
    },
    nextPageSize(){
      this.index++;
      this.radioItems = [];
      this.textAreaList = [];
      this.evaluateItmes = this.allEvaluateList[this.index];
      this.echoValues(this.evaluateItmes);
      this._getSeesionData();
    },
    //上一项
    backPage(){
      if(this.index == this.allEvaluateList.length - 1)
      {
        let arr = this.radioItems;
        this.radioItemsR[this.index] = arr;
        this._setSessionData();
      }
      this.index--;
      this._getSeesionData();
      this.evaluateItmes = this.allEvaluateList[this.index];
    },
    _setSessionData(){
      this.sessionStorage.setSessionStorage(
          this._getRadioKey(this.index),
          this.radioItems
      );
      this.sessionStorage.setSessionStorage(
          this._getKey(this.index),
          this.textAreaList
      );
    },
    echoValues(item){
      let itemlist = item.departmentQuestionnaireDtoList;
      if(item.typeId == 1){
        let radioEchoData = [];
        itemlist.forEach(j => {
          if (j.checkDesc == null || j.checkDesc == null){
            radioEchoData.push(null);
          }else{
            radioEchoData.push(`${this.index + 1}/${j.depid}/${j.checkDesc}/${j.checked}`);
          }
        });
        this.radioItems = radioEchoData;
      }
      if(item.typeId == 2){
        let textEchoData = [];
        itemlist.forEach(k => {
          if (k.checkDesc == null) {
            textEchoData.push('');
          }else{
            textEchoData.push(k.checkDesc);
          }

        });
        this.textAreaList = textEchoData;
      }
    },

  },
  created() {
    this.getEvaluateItmes();
  }
}
</script>

<style scoped>

</style>