import Vue from 'vue'
import App from './App.vue'
import Board from './components/Board'
import Cell from './components/Cell'

window.Event = new Vue();

Vue.component('Board', Board);
Vue.component('Cell', Cell);

new Vue({
  el: '#app',
  render: h => h(App)
})
