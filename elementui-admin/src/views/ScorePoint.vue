<template>
  <div id="table">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="姓名" >
        <el-input v-model="form.sname" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-select v-model="form.grade" placeholder="请选择学年">
          <el-option label="2018-2019" value="2018-2019"></el-option>
          <el-option label="2019-2020" value="2019-2020"></el-option>
          <el-option label="2020-2021" value="2020-2021"></el-option>
        </el-select>
        <el-select v-model="form.semester" placeholder="请选择学期" style="margin-left: 10px">
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
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
        <el-button type="primary" @click="QueryScore">查询成绩</el-button>
      </el-form-item>
    </el-form>
    <el-dialog :title="form.sname+'的成绩单'" :visible.sync="dialogTableVisible">
      <el-table
          :data="exam"
          style="width: 100%" empty-text="请输入正确的教务处学号/密码">
        <el-table-column prop="courseCode" label="课程号" >
        </el-table-column>
        <el-table-column prop="courseName" label="课程名" >
        </el-table-column>
        <el-table-column prop="courseNature" label="课程类型">
        </el-table-column>
        <el-table-column prop="credit" label="学分" show-overflow-tooltip>
        </el-table-column><el-table-column prop="grades" label="成绩" show-overflow-tooltip>
      </el-table-column>
      </el-table>
      <h3>绩点：{{GradePoint}}</h3>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ScorePoint",
  data() {
    return {
      GradePoint: "",
      form:{
        sname:"",
        sno:"",
        grade:"",
        semester:"",
        year:"",
        code:""
      },
      dialogTableVisible:false,
      exam:[],
      student:[]
    }
  },
  mounted() {

  },
  methods: {
    QueryScore(){
      let username=this.form.sno
      let password=this.form.code
      let xn=this.form.grade
      let xq=this.form.semester
      console.warn(username,password)
      const loading = this.$loading({
        lock: true,
        text: '获取成绩中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios.post('api/administration_student/grade', {
        "password": password,
        "username": username,
        "xn": xn,
        "xq": xq
      }).then((res) => {
        console.log(res.data.data.grade);
        let stu={}
        stu=res
        this.exam=res.data.data.grade
        console.log(stu)
        console.log(this.CalGradePoints(res.data.data.grade));
        this.GradePoint = this.CalGradePoints(res.data.data.grade);
        stu.xh="18413001"
        stu.name="程麒阁"
        stu.zy="软件工程"
        stu.scrore=this.GradePoint
        this.student.push(stu)
        setTimeout(()=>{
          loading.close()
          this.dialogTableVisible=true
        },2000)

      });
    },
    CalGradePoints(grade) {
      let AddGradePoint = 0;
      let AddCredit = 0;

      for (let i = 0; i < grade.length; i++) {
        let credit = grade[i].credit;
        let grades = this.SwitchGrade(grade[i].grades);
        let EachGradePoint = grades - 50 > 0 ? (grades - 50) / 10 : 0;
        AddGradePoint += credit * EachGradePoint
        AddCredit += parseFloat(credit)
      }
      return (AddGradePoint / AddCredit).toFixed(2)
    },
    SwitchGrade(grade) {
      switch (grade) {
        case 'A':
          return 95
        case 'B':
          return 85
        case 'C':
          return 75
        case 'D':
          return 65
        case 'F':
          return 0
        default:
          return grade;

      }
    }
  },

}
</script>

<style>
#table{
  padding: 10px;
}
</style>