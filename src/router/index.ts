import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "index",
		component: () => import("@/views/Simulator.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
