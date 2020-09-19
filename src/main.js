import Vue from 'vue'
import App from './App.vue'

import 'babel-polyfill'
import './styles/index.less'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Aside,
  Header,
  Main,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Row,
  Col,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Tooltip,
  Pagination,
  Radio,
  RadioGroup,
  Upload,
  Checkbox,
  CheckboxGroup,
  Dialog
} from 'element-ui'

// import ElementUI from 'element-ui';
// Vue.use(ElementUI);

import router from './rotuer/index.js'
Vue.use(Button).use(Form).use(FormItem).use(Input).use(Container).use(Aside).use(Header).use(Main).use(Menu)
  .use(Submenu).use(MenuItem).use(MenuItemGroup).use(Row).use(Col).use(Breadcrumb).use(BreadcrumbItem).use(Card).use(Table).use(TableColumn).use(Tooltip).use(Pagination).use(Radio).use(RadioGroup).use(Upload).use(Checkbox).use(CheckboxGroup).use(Dialog)

Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
