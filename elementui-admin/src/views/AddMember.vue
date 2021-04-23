<template>
  <div id="form">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.sname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-select v-model="form.region" placeholder="请选择职务">
          <el-option label="社长" value="0"></el-option>
          <el-option label="副社长" value="1"></el-option>
          <el-option label="干事" value="2"></el-option>
          <el-option label="会员" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="教务处">
        <el-col :span="11">
          <el-input v-model="form.sno" placeholder="请输入学号"></el-input>
        </el-col>
        <el-col :span="11" style="margin-left: 10px">
          <el-input v-model="form.code" placeholder="请输入教务处密码" show-password></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="onSubmit" v-loading.fullscreen.lock="fullscreenLoading">添加成员</el-button>
      </el-form-item>
      <el-dialog :title="form.sname+'的课表'" :visible.sync="dialogTableVisible">
        <el-table :data="courseData" empty-text	="账号密码输入错误">
          <el-table-column property="name" label="课程名称"></el-table-column>
          <el-table-column property="position" label="上课地点"></el-table-column>
          <el-table-column property="teacher" label="任课教师"></el-table-column>
        </el-table>
      </el-dialog>
    </el-form>

  </div>
</template>
<style>
#form {
  padding: 10px;
}

.el-icon-date {
  padding: 0;
}

</style>
<script>
export default {
  data() {
    return {
      form: {
        sname: '',
        sno:'',
        code:'',
        region: '',
      },
      courseData:[],
      dialogTableVisible:false,
      fullscreenLoading: false
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form.region,this.form.sname,this.form.sno,this.form.code);
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios.post("/api/administration_student/schedule",{
        "password": this.form.code,
        "username": this.form.sno,
        "xn": "2020-2021",
        "xq": "2"
      }).then(res=>{
        loading.close();
        console.warn(res)
        if(res.data.status==200){
          this.courseData=res.data.data.courseInfos
        }
        this.dialogTableVisible=true
      }).catch(res=>{
        console.log(res)
      })
    }
  }
}
</script>