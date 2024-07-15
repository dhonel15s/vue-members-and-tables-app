import { createRouter, createWebHashHistory } from "vue-router";

import LayoutPage from "./pages/LayoutPage.vue";
import HomePage from "./pages/HomePage.vue";
import MembersPage from "./pages/MembersPage.vue";
import MembersEditPage from "./pages/MembersEditPage.vue";
import TopicsPage from "./pages/TopicsPage.vue";
import TopicsDetailPage from "./pages/TopicsDetailPage.vue";
import TopicEditPage from "./pages/TopicEditPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import SignupPage from "./pages/SignupPage.vue";
import NotFoundPage from "./pages/NotFoundPage.vue";

import store from "./store/index";
import { ElMessage } from "element-plus";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "default",
      component: LayoutPage,
      redirect: { name: "home" },
      meta: { requiresAuth: true },
      children: [
        {
          path: "home",
          name: "home",
          component: HomePage,
          meta: {
            requiresAuth: true,
            index: 0,
          },
        },
        {
          path: "members",
          name: "members",
          component: MembersPage,
          meta: {
            requiresAuth: true,
            index: 1,
          },
        },
        {
          path: "members/edit",
          name: "members-edit",
          component: MembersEditPage,
          props: true,
          meta: {
            requiresAuth: true,
            index: 2,
          },
        },
        {
          path: "topics",
          name: "topics",
          component: TopicsPage,
          meta: {
            requiresAuth: true,
            index: 3,
          },
        },
        {
          path: "topics/detail",
          name: "topics-detail",
          component: TopicsDetailPage,
          props: true,
          meta: {
            requiresAuth: true,
            index: 4,
          },
        },
        {
          path: "topic/edit",
          name: "topic-edit",
          component: TopicEditPage,
          props: true,
          meta: {
            requiresAuth: true,
            index: 5,
          },
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
      meta: { requiresAuth: false },
    },
    {
      path: "/:notFound(.*)",
      name: "not-found",
      component: NotFoundPage,
      meta: { requiresAuth: false },
    },
  ],
});

router.beforeEach((to, _, next) => {
  const token = store.getters.token;
  if (to.meta.requiresAuth && token === null) {
    ElMessage({
      message: "You need to login first.",
      type: "warning",
      offset: 50,
    });
    router.push({ name: "login" });
  } else {
    next();
  }
});

export default router;
