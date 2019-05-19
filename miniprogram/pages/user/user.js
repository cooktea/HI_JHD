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
            url:"../examInfo/examInfo"
        })
    },

    onLoad:function(){
        console.log("user onload");
    }
})