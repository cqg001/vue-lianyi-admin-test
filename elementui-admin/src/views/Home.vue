<template>
	<el-row>
		<el-col :lg="4" :xl="3" :xs="4" :sm="4" :md="4" style="position: fixed;">
			<el-menu default-active="1-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#304156" text-color="#BFCBD9"
                style="height: 1800px"
				:collapse="collapse" :router="router">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-location"></i>
						<span>空课查询</span>
					</template>
					<router-link to="Empty">
						<el-menu-item index="1-1" align="left">
							<i class="el-icon-setting"></i>
							<span slot="title">查看空课</span>
						</el-menu-item>
					</router-link>
					<router-link to="Add">
						<el-menu-item index="1-2">
							<i class="el-icon-user"></i>
							<span slot="title">添加成员</span>
						</el-menu-item>
					</router-link>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-menu"></i>
						<span slot="title">社团管理</span>
					</template>
					<router-link to="Society">
						<el-menu-item index="2-1">
							<i class="el-icon-user"></i>
							<span slot="title">社团报名信息</span>
						</el-menu-item>
					</router-link>
					<router-link to="mancheck">
						<el-menu-item index="2-2">
							<i class="el-icon-s-custom"></i>
							<span slot="title">社团列表</span>
						</el-menu-item>
					</router-link>
				</el-submenu>
        <router-link to="scorepoint">
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">绩点查询</span>
          </el-menu-item>
        </router-link>
        <router-link to="about">
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">关于我们</span>
          </el-menu-item>
        </router-link>
			</el-menu>
		</el-col>
    <el-col :lg="4" :xl="3" :xs="4" :sm="4" :md="4">
      <div style="width: 100%;height: 100px"></div>
    </el-col>
		<el-col :lg="20" :xl="21" :xs="20" :sm="20" :md="20">
			<router-view></router-view>
		</el-col>
	</el-row>
</template>

<script>
	export default {
		data() {
			return {
				collapse: true,
				disabled: true,
				router: false
			}
		},
		created() {
			console.warn("加载")
			setTimeout(() => {
				this.collapse = false,
					this.disabled = false
			}, 800)
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>
<style>
	.menu {
		width: 100%;
		height: 1000px;
		background-color: azure;
	}

	el-menu {
		width: 100%;
	}

	a {
		text-decoration: none
	}

</style>
