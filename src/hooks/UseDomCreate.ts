import { onUnmounted } from "vue";

export const  useDomCreate = (nodeId:string) => {
    const div = document.createElement('div');
    div.id = nodeId;
    document.body.appendChild(div);
    onUnmounted(() => {
        document.body.removeChild(div);
    });
}