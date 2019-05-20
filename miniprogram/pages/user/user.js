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

    getExaminfo:function(){
        wx.navigateTo({
            url:"../examinfo/examinfo"
        })
    },

    onLoad:function(){
        console.log("user onload");
    }
})