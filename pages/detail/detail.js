// pages/post/post.js
var WxParse = require('../../wxParse/wxParse.js');
var util = require('../../utils/util.js');

var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
  success: function(res) {
    realWindowWidth = res.windowWidth
    realWindowHeight = res.windowHeight
  }
})

const app = getApp()
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id;
    this.id = id;
    let data = wx.getStorageSync(this.id);
    if (data) {
      util.chunkRender(data, 'article', this);
    }
    this.getPost(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getPost(title) {
    console.log('success', title);
    let that = this;
    db.collection('data_v1_3_0') // 获取云控制台创建的集合引用
    .where({
      dataName: 'calligraphyContent',
      title: title
    })
   .get() // 查询
      .then(res => {
       let data = res.data[0];
       console.log('success', data);
        that.setData({
          title: data.title,
          content: data.content,
          imgs: data.imgs
        });
      }).catch(err => {
        console.log('fail', err);
      })
  },
  
    //图片点击事件
  enlarge: function (event) {
      var src = event.currentTarget.dataset.src; //获取data-src
      var imgList = event.currentTarget.dataset.list;
      //图片预览
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: imgList // 需要预览的图片http链接列表
      })
    },
});