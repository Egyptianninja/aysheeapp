export default {
  messageBar: null,
  registerMessageBar(component: any) {
    this.messageBar = component;
  },
  unregisterMessageBar() {
    this.messageBar = null;
  },
  showMessage(message: any, config: any) {
    this.messageBar.pushMessage({ message }, config || {});
  }
};
