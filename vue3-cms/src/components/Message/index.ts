
import { createApp } from "vue";
import NotifyMessage from "./NotifyMessage.vue";
let MountedNode 
function notifyMsg(options) {
  if(MountedNode) return
  function createMount(opts) {
    MountedNode = document.createElement('div')
    document.body.appendChild(MountedNode)
    const app = createApp(NotifyMessage, {
      ...opts,
      remove() {
        app.unmount()
        document.body.removeChild(MountedNode);
        MountedNode = null;
      }
    })
    return app.mount(MountedNode)
  }
  return createMount(options);
}

export {
  notifyMsg 
}