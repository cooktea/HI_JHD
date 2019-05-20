const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
    data: {
      Toptab: ["校内新闻","竞赛信息"],
      chooseTab:"0",
    },

    chooseTab:function(e){
      this.setData({
        chooseTab:e.currentTarget.dataset.idx,
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const db = wx.cloud.database()
    db.collection("stu_info").where({
      _openid:app.globalData.openid
    }).get().then(res=>{
      console.log(res.data[0])
      if(!res.data[0].stu_number){
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
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

  test:function(){
    wx.request({
      url:"http://127.0.0.1:5000/getExamInfo",
      data:{
        stu_number:"2018150299"
      },
      success(res){
          console.log(res.data)
      }
  })
  }
})