Page({
    data:{
        cards:[],
        card_info:{
            number:null,
            time:null,
            location:null
        },
        currentView:"1",//"0":校园卡信息登记页面,"1":被捡到的校园卡列表页面
        submitType:"",//"0":捡卡提交，"1":"丢卡提交"
        imgurl:"",
    },

    onLoad:function(){
        this.camera = wx.createCameraContext()
        const db = wx.cloud.database()
        const _ = db.command
        console.log(this.data.cards)
        db.collection("school_card").limit(20).where({
            timestamp : _.gt((Number)(new Date()).valueOf()-1000*60*60*24*7)
        })
        .get().then(res=>{
            console.log(res.data.length)
            for(var i=0;i<res.data.length;i++){
                this.data.cards[i]=res.data[res.data.length-1-i]
            }
            console.log(this.data.cards)
            this.setData({
                cards:this.data.cards
            })
            console.log(this.data.cards)
        })
    },
    submitLostCard:function(e){
        if(e.detail.value.number && e.detail.value.contact){
            const db = wx.cloud.database()
            const info = db.collection("school_card")
            info.add({
                data:{
                    cardInfo:{
                        number:e.detail.value.number,
                        time:e.detail.value.time,
                        location:e.detail.value.location,
                        contact:e.detail.value.contact
                    },
                    timestamp:(new Date()).valueOf(),
                    type:2//1:捡卡，2:丢卡
                },
                success:res=>{
                    wx.showToast({
                        title:"提交成功",
                        icon:"success",
                        duration:2000
                    })
                },
                fail:err=>{
                    wx.showToast({
                        title:"提交失败",
                        icon:"none",
                        duration:2000
                    })
                }
            })
        }
        else{
            wx.showToast({
                title:"请输入学号和联系方式",
                icon:"none",
                duration:2000
            })
        }
    },

    submitCard:function(e){
        this.setData({
            card_info:{
                number:e.detail.value.number,
                time:e.detail.value.time,
                location:e.detail.value.location
            }
        })
        if(this.data.imgurl){
            wx.showLoading({
                title: '上传中',
                })
                
            wx.cloud.uploadFile({
                cloudPath:"schoolCard/"+this.data.card_info.number+(new Date()).valueOf()+".jpg",
                filePath:this.data.imgurl,
                success:res => {
                    const db = wx.cloud.database()
                    const info = db.collection("school_card")
                    info.add({
                        data:{
                            cardInfo:this.data.card_info,
                            imgid:res.fileID,
                            timestamp:(new Date()).valueOf(),
                            type:1//1:捡卡，2:丢卡
                        },
                        success:res=>{
                            wx.hideLoading()
                            wx.showToast({
                                title:"上传成功",
                                icon:"success",
                                duration:2000
                            })
                            if(this.data.card_info.number){
                                //TODO:上传成功后调用后台发送邮件
                            }

                        },
                        fail:err=>{
                            wx.cloud.deleteFile({
                                fileList:[res.fileID]
                            })
                            wx.showToast({
                                title:"上传失败",
                                icon:"none",
                                duration:2000
                            })
                        }
                    })
                },
                fail:err=>{
                    wx.showToast({
                        title:"上传失败",
                        icon:"none",
                        duration:2000
                    })
                }
            })
        }
        else{
            wx.showToast({
                title: '请给拾获的校园卡拍照',
                icon: 'none',
                duration: 2000
                })
        }

        
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