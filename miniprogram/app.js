//app.js
App({
  onLaunch: function () {
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      console.log("小程序启动成功!");
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
        name:"login",
        complete:res=>{
            that.globalData.openid = res.result
        }
    })
    setTimeout(()=>{
      console.log(that.globalData.openid)
    },2000)
  },

  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
    
  globalData:{
    userInfo:null,
    openid:""
  }
})
