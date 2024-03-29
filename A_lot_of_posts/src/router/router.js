import { createRouter, createWebHistory } from "vue-router"
import PostPageOptionsApi from "@/pages/PostPageOptionsApi"
import PostPageId from "@/pages/PostPageId"
import PostPageVuex from "@/pages/PostPageVuex"
import PostPageCompositionApi from "@/pages/PostPageCompositionApi"

const routes = [
  // path: указывает на путь маршрута.
  // name: уникальное имя маршрута.
  // component: компонент, который будет отображаться при переходе по данному маршруту.
  { path: '/', name: 'postPageOptionsApi', component: PostPageOptionsApi },
  { path: '/:id', name: 'PostPageId', component: PostPageId },
  { path: '/composition', name: 'postPageCompositionApi', component: PostPageCompositionApi },
  { path: '/vuex', name: 'PostPageVuex', component: PostPageVuex }
]

const router = createRouter({
    routes, history: createWebHistory(process.env.BASE_URL)
})

export default router
