const app = getApp()

Page({
    data:{
        userInfo:{}
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
    }
})