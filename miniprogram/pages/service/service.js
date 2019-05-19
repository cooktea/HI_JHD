
Page({
    data:{
        service:["校园卡招领处","校历","敬请期待..."]
    },
    
    chooseService:function(e){
        if(e.currentTarget.dataset.index == "0"){
            wx.navigateTo({
                url:"school_card/school_card"
            })
        }
        if(e.currentTarget.dataset.index == "1"){
            wx.navigateTo({
                url:"Xiaoli/Xiaoli"
            })
        }
    },

    onLoad:function(){
        var that = this;
        wx.getSystemInfo({
            success(res){
                console.log(res)
                that.setData({
                    height:res.windowHeight+"px"
                })
            }
        })
    }
})