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
    }
})