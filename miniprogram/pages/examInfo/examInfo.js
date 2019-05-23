const app = getApp()

Page({
    data:{
        examInfo:[],
        info:''
    },

    onLoad:function(){
        var that = this;
        this.setData({
            info:"正在查询，请稍候"
        })
        const db = wx.cloud.database()
        db.collection("stu_info").where({
            _openid:app.globalData.openid
        }).get().then(res=>{
            wx.request({ 
                url:"http://127.0.0.1:5000/getExamInfo",
                data:{
                    stu_number:res.data[0].stu_number
                },
                success(res){
                    that.setData({
                        examInfo:res.data
                    })
                    if(res.data.length == 0){
                        that.setData({
                            info:"最近可能没有考试哦"
                        })
                    }
                }
            })
        })
    }
})