<template>
	<div id="ScorePoint">
		<i class="el-icon-date fixed_padding"></i>
		<el-select v-model="collage" placeholder="请选择学院" @change="changeCollage($event)">
			<el-option v-for="item in acadamic" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<i class="el-icon-data-line"></i>
		<el-select v-model="society" placeholder="请选择社团" @change="changeSociety($event)">
			<el-option v-for="item in societies" :key="item.value" :label="item.label" :value="item.value">
			</el-option>
		</el-select>
		<el-table :data="filterData" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange"
			style="width: 100%;margin-top: 10px;" id="out-table">
			<el-table-column type="selection" width="100"></el-table-column>
			<el-table-column prop="sno" label="学号"></el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="acadamic" label="学院"></el-table-column>
			<el-table-column prop="major" label="专业"></el-table-column>
			<el-table-column prop="societies" label="参加社团"></el-table-column>
			<el-table-column fixed="right" label="操作" width="120">
				<template slot-scope="scope">
					<el-button @click.native.prevent="deleteRow(scope.$index, filterData)" type="text" size="small">
						移除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-button style="margin-top: 20px" @click="exportOrderData()">导出表格</el-button>
	</div>
</template>

<script>
	import FileSaver from 'file-saver'
	import XLSX from 'xlsx'
	export default {
		name: "ScorePoint",
		data() {
			return {
				acadamic: [{
					value: 0,
					label: '全部学院'
				}, {
					value: 1,
					label: '信息工程学院'
				}, {
					value: 2,
					label: '软件工程学院'
				}, {
					value: 3,
					label: '医学院'
				}, {
					value: 4,
					label: '美术学院'
				}, {
					value: 5,
					label: '音乐学院'
				}, {
					value: 6,
					label: '日本语言文化学院'
				}, {
					value: 7,
					label: '生命科学与技术学院'
				}, {
					value: 8,
					label: '人文学部'
				}, {
					value: 9,
					label: '旅游学院'
				}, {
					value: 10,
					label: '物理科学与技术学院'
				}, {
					value: 11,
					label: '机械学院'
				}, {
					value: 12,
					label: '英语学院'
				}, {
					value: 13,
					label: '教育学院'
				}, {
					value: 14,
					label: '建筑工程学院'
				}, {
					value: 15,
					label: '国际学院'
				}, {
					value: 16,
					label: '体育学院'
				}, {
					value: 17,
					label: '创新创业学院'
				}, {
					value: 18,
					label: '经济管理学院'
				}, {
					value: 19,
					label: '护理学院'
				}, {
					value: 20,
					label: '环境与化学工程学院'
				}],
				societies: [{
					value: 0,
					label: '全部社团'
				}, {
					value: 1,
					label: '爱心联社'
				}, {
					value: 2,
					label: '棒棒堂'
				}, {
					value: 3,
					label: '交流艺术协会'
				}, {
					value: 4,
					label: '轮滑社'
				}, {
					value: 5,
					label: '进化动漫社'
				}, {
					value: 6,
					label: '书画小栖'
				}, {
					value: 7,
					label: '商艺社'
				}, {
					value: 8,
					label: '大黑山文学社'
				}, {
					value: 9,
					label: '清风茶宛'
				}, {
					value: 10,
					label: '旅行社'
				}],
				filter: 0,
				collage: "",
				society: "",
				tableData: []
			};
		},
		mounted() {
			this.getData()
		},
		methods: {
			changeCollage(e) {
				console.log("选择学院", e, this.collage)
				this.getData()
				this.filter=1
			},
			changeSociety(e) {
				console.log("选择社团", e, this.society)
				this.getData()
				this.filter=1
			},
			getData(){
				this.$axios.get("json/societies.json").then((res) => {
					console.log(res.data);
					this.showData(res.data)
				});
			},
			showData(data) {
				data = data.filter((item) => {
					item.societies = item.societies.join('、')
					return item
				})
				this.tableData = data
				this.$message({
					message: '获取社团信息成功',
					type: 'success',
					duration: 1500
				});
			},
			exportOrderData() {
				var xlsxParam = {
					raw: true
				};
				var _id = '#out-table'
				//查询到重复table的dom元素
				var fix_right = document.querySelector('.el-table__fixed-right');
				//写入时候移除多余的dom元素
				var wb = XLSX.utils.table_to_book(document.querySelector(_id).removeChild(fix_right), xlsxParam);
				//再次加入dom元素
				document.querySelector(_id).appendChild(fix_right);
				var wbout = XLSX.write(wb, {
					bookType: 'xlsx',
					bookSST: true,
					type: 'array'
				})
				try {
					FileSaver.saveAs(new Blob([wbout], {
						type: 'application/octet-stream'
					}), '社团详情表.xlsx')
				} catch (e) {
					if (typeof console !== 'undefined') console.log(e, wbout)
				}
				return wbout
			},
			toggleSelection(rows) {
				if (rows) {
					rows.forEach((row) => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			deleteRow(index, rows) {
				rows.splice(index, 1);
			},
		},
		computed: {
			filterData() {
				let filter = this.filter
				let tableData = this.tableData
				let collageIndex = this.collage
				let societyIndex = this.society
				switch (filter) {
					case 0:
						break;
					case 1:
						if (collageIndex > 0) {
							tableData=tableData.filter((item)=>{
								if(item.acadamic==this.acadamic[collageIndex].label){
									return item
								}
							})
						}
						if (societyIndex > 0) {
							tableData=tableData.filter((item)=>{
								if(item.societies.indexOf(this.societies[societyIndex].label)>=0){
									return item
								}
							})
						}
				}
				return tableData
			}
		}
	};
</script>

<style>
  #ScorePoint{
    padding: 10px;
  }
  .fixed_padding{
    padding: 10px !important;
  }
</style>
