// 使用h函数和render函数改造
import { h,render } from "vue";
import MessageComponent from '../components/MessageComponent.vue';

export type MessageType = 'success' | 'error' | 'default';
export const createMessage = (type:MessageType,message:string,timeout = 2000) => {
    const messageVNode = h(MessageComponent,{
        message:message,
        type:type,
    });

    const div = document.createElement('div');
    document.body.appendChild(div);
    render(messageVNode,div);

    const destroyMessageVNode = () => {
        render(null,div);
        document.body.removeChild(div);
    }

    setTimeout(() => {
        destroyMessageVNode();
    },timeout);

    return destroyMessageVNode;
}

// 使用 createApp来创建组件实例
// import { createApp } from "vue";
// import MessageComponent from '../components/MessageComponent.vue';

// export type MessageType = 'success' | 'error' | 'default';
// export const createMessage = (type:MessageType,message:string,timeout = 2000) => {
//     const messageInstance = createApp(MessageComponent,{
//         message:message,
//         type:type,
//     });

//     const div = document.createElement('div');
//     document.body.appendChild(div);
//     messageInstance.mount(div);

//     setTimeout(() => {
//         messageInstance.unmount();
//         document.body.removeChild(div);
//     },timeout);
// }