const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
    data: {
      news:[],
      bottomInfo:""
    },

    // chooseTab:function(e){
    //   this.setData({
    //     chooseTab:e.currentTarget.dataset.idx,
    //   })
    // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getNewslist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const db = wx.cloud.database()
    db.collection("stu_info").where({
      _openid:app.globalData.openid
    }).get().then(res=>{
      if(res.data.length == 0 || (!res.data[0].stu_number)){
        wx.showModal({
          title:"完善信息",
          content:"请点击确定完善信息",
          showCancel:false,
          success(res){
            wx.navigateTo({
              url:"../stuInfo/stuInfo"
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  onReachBottom: function (){
    wx.showLoading({
      title: '加载中',
    })
    this.getNewslist()
  },

  test:function(){
    this.getNewslist()
  },

  goNewPage:function(e){
    var number = e.currentTarget.dataset.index
    console.log(number)
    this.setData({
      newNumber:number
    })
    wx.navigateTo({
      url:'../new/new'
    })
  },

  updateImagePath:function(){
    for(var i=0;i<this.data.news.length;i++){
      this.getImage(i)
    }
  },

  getImage:function(index){
    var that = this
      if(!(this.data.news[index].imgpath == 'noImg')){
        return
      }
      else{
        var theNew = this.data.news[index]
        wx.downloadFile({
          url:"http://127.0.0.1:5000/getImage/"+this.data.news[index].img,
          success(res){
            theNew.imgpath = res.tempFilePath
            // console.log(theNew)
            that.setData({
              news:that.data.news
            })
          }
        })
      }
    // this.setData({
    //   news:this.data.news
    // })
  }, 

  getNewslist :function(){
    var that = this
    wx.request({
      url:"http://127.0.0.1:5000/getNewslist",
      data:{
        start:this.data.news.length
      },
      success(res){
        var getnews = res.data
        for(var i=0;i<getnews.length;i++){
          that.data.news[that.data.news.length] = getnews[i]
          setTimeout(function(){
            that.setData({
              news:that.data.news
            })
            wx.hideLoading({})
          },2000)
        }
        if(res.data.length == 0){
          wx.hideLoading({})
          wx.showToast({
            title:"无更多新闻",
            icon:"none",
            duration:2000
          })
        }

      }
    })
    setTimeout(function(){
      that.updateImagePath()
    },1000)
  }
})

