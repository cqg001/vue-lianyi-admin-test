import Vue from 'vue'
import Router from 'vue-router'
import Login from "./views/Login";
import Home from './views/Home.vue'
import memberJoin from './views/MemberJoinOrganization.vue'
import EmptyTable from './views/EmptyTable.vue'
import AddMember from "./views/AddMember"
import ScorePoint from "./views/ScorePoint"
import organization from "./views/Organization"
import About from "./views/About"

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/main',
        name: 'home',
        component: Home,
        redirect: '/Empty',
        children: [
            {
                path: '/Empty',
                component: EmptyTable
            },
            {
                path: '/Add',
                component: AddMember
            },
            {
                path: '/society',
                component: memberJoin
            },
            {
                path: '/mancheck',
                component: organization
            },
            {
                path: '/scorepoint',
                component: ScorePoint
            },
            {
                path: '/about',
                component: About
            }
        ]
    },
        {
            path: '/',
            component: Login
        }
    ]
})