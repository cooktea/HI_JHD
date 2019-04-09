const app = getApp()

Page({
    data:{
        userInfo:{}
    },

    setStuInfo:function(){
        wx.navigateTo({
            url:"../stuInfo/stuInfo"
        })
    },

    onLoad:function(){
        console.log("user onload");
        console.log(app.globalData);
        var that = this;
        app.getUserInfo(function(userInfo){
            that.setData({
                userInfo:userInfo
            })
        })
        wx.login({
            success(res) {
              if (res.code) {
                发起网络请求
                wx.request({
                  url: 'https://test.com/onLogin',
                  data: {
                    code: res.code
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
    }
})