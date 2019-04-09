
Page({
    data:{
        stu_number:"",
        post_address:"",
        phone_number:""
    },

    infoSubmit:function(e){
        wx.cloud.callFunction({
            name:"save_stu_info",
            complete:res=>{
                console.log(res)
            }
        })
    },

    onLoad:function(){
        
    }
})