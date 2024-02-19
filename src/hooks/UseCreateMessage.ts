import { createApp } from "vue";
import MessageComponent from '../components/MessageComponent.vue';

export type MessageType = 'success' | 'error' | 'default';
export const createMessage = (type:MessageType,message:string,timeout = 2000) => {
    const messageInstance = createApp(MessageComponent,{
        message:message,
        type:type,
    });

    const div = document.createElement('div');
    document.body.appendChild(div);
    messageInstance.mount(div);

    setTimeout(() => {
        messageInstance.unmount();
        document.body.removeChild(div);
    },timeout);
}