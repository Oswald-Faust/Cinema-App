import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
	{
		name: 'Home',
		path: '/',
		component: Home
	},
	{
		name: 'About',
		path: '/about',
		component: () => import('@/views/About.vue'),	
	},
	{
		name: 'Login',
		path: '/login',
		component: () => import('@/views/Login.vue')
	},
	{
		name: 'Blank',
		path: '/blank',
		component: () => import('@/views/Blank.vue')
	},
	{
		name: 'Editing',
		path: '/editing-film',
		component: () => import('@/views/EditingFilm.vue')
	},
	{
		name: 'Programmation',
		path: '/programmation',
		component: () => import('@/views/ProgrammationFilm.vue')
	},
	{
		name: 'UserControl',
		path: '/user-control',
		component: () => import('@/views/UserControl.vue')
	},
	{
		name: 'Profil',
		path: '/profil',
		component: () => import('@/views/Profil.vue')
	},
	{
		name: 'Media',
		path: '/media',
		component: () => import('@/views/Media.vue')
	},
	{
		name: 'Parametres',
		path: '/parametres',
		component: () => import('@/views/ParameterVue.vue')
	},
	{
		name: 'LogOut',
		path: '/log-out',
		component: () => import('@/views/LogOut.vue')
	},
	{
		name: 'LogOut',
		path: '/log-out',
		component: () => import('@/views/LogOut.vue')
	},

]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
