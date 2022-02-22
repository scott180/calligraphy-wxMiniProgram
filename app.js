//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'calligraphy-0g9vrn6013c4210e'
    })
  },
  
  globalData: {
    userInfo: null
  }
});