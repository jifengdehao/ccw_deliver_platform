export default {
  showusermane(state) {
    state.username = JSON.parse(window.sessionStorage.userinfo).username
  },
  show(state,toggle){
    state.show = toggle
  }
}
