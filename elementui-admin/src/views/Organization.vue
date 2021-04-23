<template>
  <div id="ManCheck">
    <transition name="el-fade-in-linear">
      <el-table v-show="show" :data="tableData" style="width: 100%" :stripe="true">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="社团 ID">
                <span>{{ props.row._id }}</span>
              </el-form-item>
              <el-form-item label="社团名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="社团类型">
                <span>{{ props.row.type }}</span>
              </el-form-item>
              <el-form-item label="所属学院">
                <span>{{ props.row.acadamic }}</span>
              </el-form-item>
              <el-form-item label="社团logo">
                <el-image
                    style="width: 50px; height: 50px"
                    :src="props.row.ImgUrl"
                    fit="fill"></el-image>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#" align="center" width="100"></el-table-column>
        <el-table-column prop="_id" label="社团ID"></el-table-column>
        <el-table-column prop="name" label="社团名称"></el-table-column>
        <el-table-column prop="type" label="社团类型"></el-table-column>
        <el-table-column prop="acadamic" label="所属学院"></el-table-column>
        <el-table-column prop="ImgUrl" label="Logo">
          <template slot-scope="scope">
            <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.ImgUrl"
                fit="fill"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </transition>
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="society">
        <el-form-item>
          <el-col :span="11"><span>社团ID：</span>
            <el-input v-model="society._id" :disabled="true"></el-input>
          </el-col>
          <el-col :span="11" :offset="1"><span>社团名称：</span>
            <el-input v-model="society.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="11"><span>社团类型：</span>
            <el-input v-model="society.type"></el-input>
          </el-col>
          <el-col :span="11" :offset="1"><span>所属学院：</span>
            <el-input v-model="society.acadamic"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="社团logo">
          <el-image
              style="width: 100px; height: 100px;border-radius: 50%"
              :src="society.ImgUrl"
              fit="fill"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitModify()">提交修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ManCheck",
  data() {
    return {
      show: false,
      dialogFormVisible: false,
      fullscreenLoading: false,
      society: {},
      tableData: [
        {
          _id: "216031",
          name: "iCAN创新社",
          type: "创新创业类",
          acadamic: "创新创业学院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/c24c8623ff202009262036.PNG",
        },
        {
          _id: "201021",
          name: "科技协会",
          type: "学术科技类",
          acadamic: "信息院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/436590aa0b202009262235.jpg",
        },
        {
          _id: "201042",
          name: "大连大学轮滑社",
          type: "文化体育类",
          acadamic: "信息院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/81d968cbf6202009221041.jpg",
        },
        {
          _id: "201043",
          name: "口译俱乐部",
          type: "文化体育类",
          acadamic: "信息院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/9f15b3c08b202009271113.JPG",
        },
        {
          _id: "216051",
          name: "未来教师协会",
          type: "志愿公益类",
          acadamic: "信息院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/a0ca713678202009262235.png",
        },
        {
          _id: "202043",
          name: "进化动漫社",
          type: "文化体育类",
          acadamic: "美院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/56fbef64ac202009301141.jpg",
        },
        {
          _id: "206041",
          name: "尚艺社",
          type: "文化体育类",
          acadamic: "日语学院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/3ad3e3d561202009262236.jpg",
        },
        {
          _id: "206042",
          name: "樱花翻译社",
          type: "学术科技类",
          acadamic: "日语学院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/b9a9aa0d68202009262245.jpg",
        },
        {
          _id: "207041",
          name: "大连大学乒博社",
          type: "文化体育类",
          acadamic: "生命院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/b2549359fb202009262058.png",
        },
        {
          _id: "207042",
          name: "麦田拾穗电影爱好者协会",
          type: "文化体育类",
          acadamic: "生命院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/4bdb9c1088202009262044.png",
        },
        {
          _id: "209021",
          name: "清风茶苑",
          type: "学术科技类",
          acadamic: "旅游学院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/5ae9b0a2be202009262100.jpg",
        },
        {
          _id: "212021",
          name: "英语协会",
          type: "学术科技类",
          acadamic: "英语学院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/f490b3ffb9202009262116.jpg",
        },
        {
          _id: "213042",
          name: "小晓表演团",
          type: "文化体育类",
          acadamic: "教育学院",
          ImgUrl: "http://nunbey.xiaoandcai.cn/organization/b8c48fb0c8202009262324.jpg",
        },
      ],
    };
  },
  mounted() {
    this.show = true
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
      this.society = row
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
      console.log(index, row);
    },
    submitModify() {
      console.warn("提交修改")
      this.dialogFormVisible = false
      const loading = this.$loading({
        lock: true,
        text: '正在提交',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close()
        setTimeout(() => {
          this.$message({
            message: '修改信息成功！',
            type: 'success'
          });
        }, 400)
      }, 1500)

    }
  }

};
</script>

<style>
#ManCheck {
  padding: 5px;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #F5F7FA40 !important;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
