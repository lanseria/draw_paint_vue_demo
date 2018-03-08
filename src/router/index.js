import Vue from 'vue';
import Router from 'vue-router';
import MyCanvas from '@/components/MyCanvas';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyCanvas',
      component: MyCanvas
    }
  ]
});
