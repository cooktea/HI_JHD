Page({
    data:{
        card_info:{},
        currentView:"0",//"0":校园卡信息登记页面,"1":被捡到的校园卡列表页面
        submitType:"",//"0":捡卡提交，"1":"丢卡提交"
        imgurl:"",
    },

    onLoad:function(){
        this.camera = wx.createCameraContext()
    },

    uploadImg:function(){
        
    },

    goFindCard:function(){
        var that = this;
        this.setData({
            submitType:"0",
            currentView:'0',
        })
    },

    retakephoto:function(){
        this.setData({
            imgurl:"",
        })
    },

    takephoto:function(){
        this.camera.takePhoto({
            quality:"high",
            success:(res)=>{
                this.setData({
                    imgurl:res.tempImagePath
                })
            }
        })
    },

    goLostCard:function(){
        this.setData({
            submitType:'1',
            currentView:'0',
        })
        console.log("...")
    },

    error(e){
        console.log(e.detail)
    }

})