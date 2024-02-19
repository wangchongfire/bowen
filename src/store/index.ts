import { createStore } from 'vuex';
import axios from 'axios';

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface PostProps {
  _id?: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string | UserProps;
  isHTML?: boolean;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  columnId?: number;
  loading:boolean;
  token:string;
}
export default createStore<GlobalDataProps>({
  state: {
    token:'',
    columns: [],
    posts: [],
    user: { isLogin: false, name: 'jack' },
    loading:false,
  },
  getters: {
    getColumnById: (state) => (id: string) => {
      return state.columns.filter(c => c._id === id);
    },
    getArticlesById: (state) => (id: string) => {
      const lists = state.posts.filter(c => {
        c._id === id
      });
      
      return lists;
    }
  },
  mutations: {
    setLoading(state,status){
      state.loading = status;
    },
    // login(state) {
    //   state.user = { isLogin: true, name: 'jack' };
    // },
    fetchColumns(state, rawData) {
      state.columns = rawData.data.list;
    },
    fetchPosts(state, rawData) {
      state.posts = rawData.data.list;
    },
    login(state,rawData){
      state.token = rawData;
    }
  },
  actions: {
    fetchColumns(context) {//获取专栏列表数据
      axios.get('/columns').then(res => {
        context.commit('fetchColumns', res.data);
      })
    },
    fetchPosts(context,id) {
      axios.get(`/columns/${id}/posts`).then(res => {
        context.commit('fetchPosts', res.data);
      })
    },
    async login(context,rawData){
      const {data} = await axios.post('/user/login',rawData);
      context.commit('login',data.data.token);      
    }
  },
  modules: {
  }
})
