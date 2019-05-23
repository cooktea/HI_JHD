// miniprogram/pages/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:undefined,
    newInfo:undefined,
    imgs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var pages = getCurrentPages()
    for(var i=0;i<pages.length;i++){
      console.log(pages[i].__route__)
      if(pages[i].__route__ == 'pages/index/index'){
        this.setData({
          number:pages[i].__data__.newNumber
          
        })
        var number =this.data.number
        break
      }
      else{
        continue
      }
    }
    wx.request({
      url:'http://127.0.0.1:5000/getNewPage',
      data:{
        number:number
      },
      success(res){
        for(var i=0;i<res.data[1].length;i++){
          if(res.data[1][i][4] == 'text'){
            res.data[1][i][3] = "\t"+res.data[1][i][3]
          }
          if(res.data[1][i][4] == 'img'){
            var src = res.data[1][i][3]
            that.getImage(src,i)
          }
        }
        that.setData({
          newInfo:res.data
        })
      }
    })

  },

  getImage:function(url,index){
    var that = this
    wx.downloadFile({
      url:"http://127.0.0.1:5000/getImage/"+url,
      success(res){
        that.data.imgs[index] = res.tempFilePath
        that.setData({
          imgs:that.data.imgs
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

  }
})