export default {
  showusermane(state) {
    state.username = JSON.parse(window.sessionStorage.userinfo).username
  },
  adcode(state,code){
    state.adcode = code
  },
  provinceName(state,provinceName){
    state.provinceName = provinceName
  }
}
