<template>
  <div id="table">
    <el-row>
      <i class="el-icon-date fixed_padding"></i>
      <el-select v-model="weekday" multiple :collapse-tags="controlWeek" placeholder="请选择星期"
                 @change="changeWeek($event)">
        <el-option v-for="item in week" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <i class="el-icon-data-line" style="margin-left: 5px"></i>
      <el-select v-model="cycleday" multiple :collapse-tags="controlDay" placeholder="请选择周次"
                 @change="changeCycle($event)">
        <el-option v-for="item in cycle" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <!--          <label class="normal" style="position: absolute;top: 10px;right: 10px">今天是：-->
      <!--            {{ cycle[currentWeek - 1].label }}&nbsp;&nbsp;{{ currentDay }}</label>-->
      <el-button  style="margin-left: 15px" size="small" @click="queryEmpty()" type="primary" plain>查询空课</el-button>
      <el-button  style="margin-left: 10px" size="small" @click="showDate(1)" type="success" plain>当前时间</el-button>
    </el-row>
    <!--    <el-button style="margin-left: 10px" @click="queryEmpty()">查询空课</el-button>-->
    <div style="margin-left: 5px;">
      <el-checkbox-group class="section" size="medium" v-model="section" @change="changeSect()">
        <el-checkbox-button plain v-for="item in sections" :label="item" :key="item.label">{{ item.label }}
        </el-checkbox-button>
      </el-checkbox-group>
    </div>
    <!--    <label class="normal" v-if="query==0" style="margin-left: 5px;position: relative;top: 10px;">社团成员表：</label>-->
    <!--    <label class="normal" v-else-if="query==1"-->
    <!--           style="margin-left: 5px;position: relative;top: 10px;">当前筛选条件下，以下成员没有课：</label>-->
    <el-table id="empty-table" ref="multipleTable" :data="tableData" stripe tooltip-effect="dark"
              style="width: 100%;position: relative;top: 10px;padding-left: 10px;"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column type="index" label="#" align="center" width="80"></el-table-column>
      <el-table-column prop="xh" label="学号" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150">
      </el-table-column>
      <el-table-column prop="zy" label="专业" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-table id="export-selected" :data="multipleSelection" stripe tooltip-effect="dark"
              style="width: 100%;position: relative;top: 10px;padding-left: 10px;display: none">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="xh" label="学号" width="120">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="zy" label="专业" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <br>
    <el-button v-if="query==1" style="position: relative;top: 15px;" @click="lookMember()">返回成员表</el-button>
    <el-button v-if="query==1" type="primary" style="position: relative;top: 15px;" @click="exportOrderData()" plain>导出表格</el-button>
    <br>
    <br>
    <br>
    <el-dialog :title="student+'的课表'" :visible.sync="dialogTableVisible">
      <el-table :data="courseData">
        <el-table-column property="name" label="课程名称"></el-table-column>
        <el-table-column property="position" label="上课地点"></el-table-column>
        <el-table-column property="teacher" label="任课教师"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
  data() {
    return {
      //星期
      week: [{
        value: 1,
        label: '周一'
      }, {
        value: 2,
        label: '周二'
      }, {
        value: 3,
        label: '周三'
      }, {
        value: 4,
        label: '周四'
      }, {
        value: 5,
        label: '周五'
      }, {
        value: 6,
        label: '周六'
      }, {
        value: 7,
        label: '周日'
      }],
      //周次
      cycle: [{
        value: 1,
        label: '第一周'
      }, {
        value: 2,
        label: '第二周'
      }, {
        value: 3,
        label: '第三周'
      }, {
        value: 4,
        label: '第四周'
      }, {
        value: 5,
        label: '第五周'
      }, {
        value: 6,
        label: '第六周'
      }, {
        value: 7,
        label: '第七周'
      }, {
        value: 8,
        label: '第八周'
      }, {
        value: 9,
        label: '第九周'
      }, {
        value: 10,
        label: '第十周'
      }, {
        value: 11,
        label: '第十一周'
      }, {
        value: 12,
        label: '第十二周'
      }, {
        value: 13,
        label: '第十三周'
      }, {
        value: 14,
        label: '第十四周'
      }, {
        value: 15,
        label: '第十五周'
      }, {
        value: 16,
        label: '第十六周'
      }, {
        value: 17,
        label: '第十七周'
      }, {
        value: 18,
        label: '第十八周'
      }],
      //节次
      sections: [{
        value: 1,
        label: '第一节'
      }, {
        value: 2,
        label: '第二节'
      }, {
        value: 3,
        label: '第三节'
      }, {
        value: 4,
        label: '第四节'
      }, {
        value: 5,
        label: '第五节'
      }, {
        value: 6,
        label: '第六节'
      }, {
        value: 7,
        label: '第七节'
      }, {
        value: 8,
        label: '第八节'
      }, {
        value: 9,
        label: '第九节'
      }, {
        value: 10,
        label: '第十节'
      }, {
        value: 11,
        label: '第十一节'
      }, {
        value: 12,
        label: '第十二节'
      }],
      //选中的星期
      weekday: [],
      //控制星期复选框隐藏
      controlWeek: false,
      //选中的周次
      cycleday: [],
      //控制周次复选框隐藏
      controlDay: false,
      //选中的课节
      section: [],
      //成员数目
      member: [],
      dialogTableVisible:false,
      courseData:[],
      query: 0,
      student:"",
      currentWeek: 0,
      currentDay: '',
      multipleSelection: []
    }
  },
  created() {
    this.getday()
    this.getweek()
    this.showDate()
    this.$axios.get('/info/data.json').then(response => {
      if (response.data) {
        // this.$message({
        //   message: '成功获取',
        //   type: 'success',
        //   duration: 1800
        // })
        this.getMember(response.data)
      } else {
        console.warn("请求到的数据为空")
      }
    }).catch(err => {
      this.$message({
        message: '请求失败' + err,
        type: 'error',
        duration: 700
      });
    })
  },
  methods: {
    //改变周
    changeWeek() {
      if (this.weekday.length > 2) {
        this.controlWeek = true
      } else {
        this.controlWeek = false
      }
    },
    //改变周次
    changeCycle() {
      if (this.cycleday.length > 2) {
        this.controlDay = true
      } else {
        this.controlDay = false
      }
    },
    //改变第几节
    changeSect() {
      let selection = []
      this.section.map(item => {
        let elem = item.label
        selection.push(elem)
      })
    },
    //处理服务端返回的数据
    getMember(data) {
      let member = data
      setTimeout(() => {
        this.member = member
        this.$message({
          message: '已自动获取当前周、星期',
          type: 'success',
          duration: 2800
        });
      }, 100)
    },
    queryEmpty() {
      //排空判定
      if (this.weekday.length == 0) {
        this.$alert('请选择星期（支持多选）', '消息提示', {
          confirmButtonText: '确定'
        });
        return;
      } else if (this.cycleday.length == 0) {
        this.$alert('请选择查询的周（支持多选）', '消息提示', {
          confirmButtonText: '确定'
        });
        return;
      } else if (this.section.length == 0) {
        this.$alert('请选择课节（支持多选）', '消息提示', {
          confirmButtonText: '确定'
        });
        return;
      }
      this.$notify({
        title: '成功',
        duration:0,
        message: '当前筛选条件下，以下成员没有课。您可以导出表格，也可以勾选指定的人导出表格。',
        type: 'success'
      });
      this.query = 1
      console.warn(this.weekday, this.cycleday, this.section)
    },
    lookMember() {
      this.query = 0
    },
    //控制表格选项
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    handleEdit(index,row){
      this.student=row.name
      this.dialogTableVisible=true
      this.courseData=row.courseInfos
      console.warn(index,row)
    },
    //获取星期几
    getday() {
      var date = new Date()
      var day = date.getDay();
      console.warn(day)
      switch (day) {
        case 0:
          this.currentDay = '星期日'
          break;
        case 1:
          this.currentDay = '星期一'
          break;
        case 2:
          this.currentDay = '星期二'
          break;
        case 3:
          this.currentDay = '星期三'
          break;
        case 4:
          this.currentDay = '星期四'
          break;
        case 5:
          this.currentDay = '星期五'
          break;
        case 6:
          this.currentDay = '星期六'
          break;

      }
    },
    //获取第几周
    getweek() {
      //这里设置从第一周-第一天的日期
      var baseDate = Date.parse("2021-03-08")
      //获取系统当前时间
      var nowDate = Date.parse(new Date())
      var duringTime = nowDate - baseDate
      //一周对应的毫秒时间 === 7天 1天24小时 1小时60分钟 1分钟60秒 1秒1000毫秒  7*24*60*60*1000
      var weekTimestamp = 7 * 24 * 60 * 60 * 1000
      //当前周,初始值0
      var currentWeek = 0
      //除一下看看间隔时间有几个周 注意是间隔时间
      var week = duringTime / weekTimestamp
      //分两种情况讨论
      //如果week正好为整数,说明恰好过去整周，当前周 === week（整周）+1（初始第一周）
      if (Number.parseFloat(week) - Number.parseInt(week) == 0) {
        currentWeek = week + 1
      } else {
        //如果week不是整数，向上取整即可
        currentWeek = Math.ceil(week)
      }
      this.currentWeek = currentWeek
    },
    //自动选择当前时间 op=0是未点击态 op=1是点击态
    showDate(op = 0) {
      let date = new Date()
      let day = date.getDay()
      let weekList = []
      let cycleList = []
      day == 0 ? weekList.push([7]) : weekList.push(day)
      cycleList.push(this.currentWeek)
      if (op == 0) {
        this.weekday = weekList
        this.cycleday = cycleList
      }else{
        console.warn(this.cycle[this.currentWeek - 1].label, this.currentDay)
        this.$alert("现在是" + "：" + this.currentDay + "（" + this.cycle[this.currentWeek - 1].label + "）", '当前时间', {
          confirmButtonText: '确定'
        });
      }
    },
    exportOrderData() {
      let section=[]
      let weekday=[]
      let cycleday=[]
      var xlsxParam = {
        raw: true
      };
      var _this=this
      var _id = ""
      _this.weekday.map((item)=>{
        weekday.push(_this.week[item-1].label)
      })
      _this.cycleday.map((item=>{
        cycleday.push(_this.cycle[item-1].label)
      }))
      _this.section.map((item)=>{
        section.push(item.label)
      })

      let weekdays=weekday.join("|")
      let cycledays=cycleday.join("|")
      let sections=section.join("、")

      console.log(weekdays,cycledays,sections)
      if (this.multipleSelection.length > 0) {
        _id = "#export-selected"
      } else {
        _id = "#empty-table"
      }
      var wb = XLSX.utils.table_to_book(document.querySelector(_id), xlsxParam);
      var wbout = XLSX.write(wb, {
        bookType: 'xlsx',
        bookSST: true,
        type: 'array'
      })
      console.warn(wbout)
      try {
        FileSaver.saveAs(new Blob([wbout], {
          type: 'application/octet-stream'
        }), weekdays+" "+cycleday+" "+sections+' 空课表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') console.log(e, wbout)
      }
      return wbout
    },
  },
  computed: {
    tableData() {
      let query = this.query
      let emptyMember = []
      let courseInfos = [] // eslint-disable-line no-unused-vars
      switch (query) {
        case 0:
          emptyMember = this.member
          break;
        case 1:
          emptyMember = this.member.filter((member) => {
            let currentMember = member
            //标记位法（为对象添加属性，这样方便标记是否有课）true表示空课，false表示
            currentMember.state = true
            //连缀筛选法
            //筛选星期（对课程筛选）
            courseInfos = member.courseInfos
                .filter((course) => {
                  if (this.weekday.indexOf(course.day) >= 0)
                    return course
                })
                //筛选周次（对课程筛选）
                .filter((course) => {
                  let cycle = this.cycleday
                  let key = false
                  //如果一会儿有课，一会儿没课（单双周情况），那么按照有课处理
                  cycle.filter((cy) => {
                    if (course.weeks.indexOf(cy) >= 0) {
                      key = true
                    }
                  })
                  if (key == true) {
                    return course
                  }
                })
                //筛选第几节课（对课程筛选并标记member.state=true（空课） Or false（有课））
                .filter((course) => {
                  //用户选择的第几节课，和课程默认上课节数
                  let userSections = [],
                      infoSections = []
                  //由于后端返回数据不利于使用JavaScript函数所以要处理数据
                  //处理数组选项 [1,2]  方便使用indexOf函数
                  this.section.map(item1 => {
                    let elem = item1.value
                    userSections.push(elem)
                  })

                  //处理成数组选项 [1,2,3,4]  方便使用indexOf函数
                  course.sections.map(item2 => {
                    let elem2 = item2.section
                    infoSections.push(elem2)
                  })
                  //遍历用户选项
                  userSections.map(item => {
                    if (infoSections.indexOf(item) >= 0) {
                      currentMember.state = false
                      // console.error("false")
                    }
                  })
                  if (currentMember.state) {
                    return course
                  }
                })
            //筛选第几节课
            member.state = currentMember.state
            if (member.state == true) {
              return member
            }
          })
          //emptyMember就是你想要的空课成员表了
      }
      return emptyMember
    }
  },
}
</script>

<style>
#table {
  /*padding-left: 2px;*/
  padding: 10px;
  background-color: #fff;
}
#empty-table{
  margin-left: 10px;
}
.el-icon-date {
  padding: 10px;
  color: #909399;
}
.fixed_padding{
  padding: 10px !important;
}
.el-icon-data-line {
  padding: 10px;
  font-size: 18px;
  color: #909399;
}

.section {
  margin-top: 10px;
  margin-left: 5px;
}

.normal {
  margin-left: 10px;
  font-size: 10px;
  color: #909399;
}
</style>
