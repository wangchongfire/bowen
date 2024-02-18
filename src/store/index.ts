import { createStore } from 'vuex';
import {ColumnProps,PostProps,testData,testPosts} from '../testData';

interface UserProps{
    isLogin:boolean;
    name?:string;
    id?:number;
}
export interface GlobalDataProps{
    columns:ColumnProps[];
    posts:PostProps[];
    user:UserProps;
}

export default createStore<GlobalDataProps>({
  state: {
    columns:testData,
    posts:testPosts,
    user:{isLogin:false},
  },
  getters: {
    getColumnById : (state) => (id:number) => {
      return state.columns[id - 1];
    },
    getArticlesById : (state) => (id:number) => {
      return state.posts.filter((article) => {
        return article.columnId === id;
      });
    }
  },
  mutations: {
    login(state){
        state.user = {isLogin:true,name:'jack'};
    }
  },
  actions: {
  },
  modules: {
  }
})
