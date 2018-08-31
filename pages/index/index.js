Page({
  data: {
    open: false,
    mark: 0,
    newmark: 0,
    history: [],
    historyList: [],
    beforedate: getNowFormatDate(),
  },
  onLoad: function(options) {

    this.getLstest()
  },
  onPullDownRefresh: function() {
    console.log("到顶了")
  },
  // 触底函数
  onReachBottom: function() {
    console.log("到底了")
    // 获取更多历史消息
    this.data.themeId ? this.getHistoryThemes() : this.getHistory()
  },
  tap_ch: function(e) {
    if (!this.data.themes) {
      this.getThemes()
    }
    this.setData({
      open: !this.data.open
    })
  },
  tap_start: function(e) {
    if (!this.data.themes) {
      this.getThemes()
    }
    this.setData({
      mark: e.touches[0].pageX
    })
  },
  tap_drag: function(e) {
    this.setData({
      newmark: e.touches[0].pageX,
    })
  },
  tap_end: function(e) {
    // console.log(Math.abs(this.data.newmark - this.data.mark))
    this.setData({
      open: this.data.newmark - this.data.mark > 100 ? true : false
    })
    this.data.mark = this.data.newmark = 0;

  },

  // 切换主题
  changeThemes: function(e) {
    // console.log("切换主题")
    // console.log("主题id:" + e.currentTarget.dataset.id)
    this.getTargetTheme(e.currentTarget.dataset.id)
  },


  /**
   * 获取知乎日报主题列表
   * url:https://news-at.zhihu.com/api/4/themes
   */
  getThemes: function() {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/themes',
      success: function(res) {
        that.setData({
          themes: res.data.others,
        })
      }
    })
  },
  /**
   * 获取历史主题列表
   * url:https://news-at.zhihu.com/api/4/theme/#{theme_id}/before/#{story_id}
   */
  getHistoryThemes: function() {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/theme/' + that.data.themeId + '/before/' + that.data.storyId,
      success: function(res) {
        if (res.data.stories != "") {
          that.setData({
            stories: that.data.stories.concat(res.data.stories),
            storyId: res.data.stories[res.data.stories.length - 1].id,
          })
        }else{
          wx.showToast({
            title: '没有东西了',
            icon: 'loading'
          })
        }

      }
    })
  },

  /**
   * 获取最新消息
   * url:https://news-at.zhihu.com/api/4/news/latest
   */
  getLstest: function() {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      success: function(res) {
        that.setData({
          stories: res.data.stories,
          top_stories: res.data.top_stories,
          themeName: "",
          topimage: "",
          themeId: "",
          open: false,
        })
      }
    })
  },

  /**
   * 获取切换主题的消息列表
   * url：https://news-at.zhihu.com/api/4/theme/{{id}}
   */
  getTargetTheme: function(themeId) {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/theme/' + themeId,
      success: function(res) {
        // console.log(res.data.stories.length)
        that.setData({
          stories: res.data.stories,
          themeName: res.data.name,
          topimage: res.data.image,
          topdescription: res.data.description,
          themeId: themeId,
          storyId: res.data.stories[res.data.stories.length - 1].id,
          open: false,
        })
      },
    })
  },

  /**
   * 获取历史消息
   * url:https://news-at.zhihu.com/api/4/news/before/{{datastr}}}
   */
  getHistory: function() {
    var that = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/before/' + that.data.beforedate,
      success: function(res) {
        if(res.data!=""){
          that.setData({
            history: that.data.history.concat(res.data),
            beforedate: res.data.date, //前一天的日期字符串
            historyList: that.data.historyList.concat(res.data.stories) //当天消息
          })
        }else{
          wx.showToast({
            title: '没有东西了',
            icon:'loading'
          })
        }
       

      }
    })
  }


})
/**
 * 获取当前日期
 * eg:20180830
 */
function getNowFormatDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + month + strDate;
  console.log(currentdate)
  return currentdate;
}