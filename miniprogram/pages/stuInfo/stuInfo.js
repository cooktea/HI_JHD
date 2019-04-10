const app = getApp()

Page({
    data:{
        stu_number:"",
        post_address:"",
        phone_number:""
    },
    
    test:function(e){
        wx.cloud.callFunction({
            name:"get_stu_info",
            complete:res=>{
                console.log(res)
            }
        })
    },

    infoSubmit:function(e){
        var that = this;
        var openid = that.globalData.openid;
        var id = that.globalData.id;
        wx.cloud.init();
        const db = wx.cloud.database()
        const info = db.collection("stu_info")
        console.log(id);
        if(id){
            info.doc(id).update({
                data:{
                    stu_number:e.detail.value.stu_number,
                    post_address:e.detail.value.post_address,
                    phone_number:e.detail.value.phone_number,
                },
                success(res){
                    console.log(res)
                    wx.showToast({
                        title:"Success",
                        icon:"none",
                    })
                },
                fail(){
                    wx.showToast({
                        title:"Faild",
                        icon:"none",
                    }) 
                }
            })
        }
        else{
            info.add({
                data:{
                    stu_number:e.detail.value.stu_number,
                    post_address:e.detail.value.post_address,
                    phone_number:e.detail.value.phone_number,
                },
                success(res){
                    console.log(res)
                    wx.showToast({
                        title:"Success",
                        icon:"none",
                    })
                },
                fail(){
                    wx.showToast({
                        title:"Faild",
                        icon:"none",
                    }) 
                }
            })
        }

    },

    onLoad:function(){
        var that = this;
        that.globalData.openid = app.globalData.openid
        const db = wx.cloud.database();
        const info = db.collection("stu_info");
        info.where({_openid:that.globalData.openid}).get({
            success(res){
                console.log(res)
                that.globalData.id = res.data[0]._id;
                console.log(that.globalData.id)
                that.data.stu_number = res.data[0].stu_number
                that.data.post_address = res.data[0].post_address
                that.data.phone_number = res.data[0].phone_number
                that.setData({
                    stu_number:that.data.stu_number,
                    post_address:that.data.post_address,
                    phone_number:that.data.phone_number
                })
            }
        })
        setTimeout(()=>{
            if(!that.globalData.id){
                this.setData({
                        stu_number:"请输入学号",
                        post_address:"请输入您的电子邮箱",
                        phone_number:"请输入您的电话号码"
                })
            }
            console.log(this.data)
        },500)
    },
    globalData:{
        openid:"",
        id:"",
    }
})