// pages/index/details.js
var WxParse = require('../../wxParse/wxParse.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.id)
    this.getDetails(options.id)
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

  /**
   * 获取新闻详情
   */
  getDetails:function(id){
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/'+id,
      success:function(res){
          that.setData({
            body:res.data.body
          })
        var article = res.data.body;
        WxParse.wxParse('article', 'html', article, that, 5);
      },
      // complete:function(res){
      //   console.log(res)
      // }
    })
  }
})