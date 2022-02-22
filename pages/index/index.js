//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    articleList: [],
    page: 1,
    hasMore: false
  },
  onLoad: function () {
    //this.getArticleList();
    let that = this;

    db.collection('data_v1_2_0') // 获取云控制台创建的集合引用
    .where({
      dataName: 'documentData'
    })
   .get() // 查询
      .then(res => {
       console.log('success', res);
        let data = res.data[0].list || [];
        data.forEach(post => {
          console.log('success', post);
          post.createdAt = that.timeFormat(post.createdAt);
        })
        that.setData({
          articleList: that.data.articleList.concat(data)
        });
      }).catch(err => {
        console.log('fail', err);
      })
  },

  // get article list
  getArticleList() {
    let url = 'https://webfem.com/posts?page=' + this.data.page + '&size=10';
    let that = this;
    wx.request({
      url: url,
      success: res => {
        let data = res.data.data || [];
        data.forEach(post => {
          post.createdAt = that.timeFormat(post.createdAt);
        })
        that.setData({
          articleList: that.data.articleList.concat(data),
          hasMore: res.data.hasMore
        });
      },
      fail: e => {
        console.log(e);
      }
    })
  },
  checkMore() {
    this.setData({
      page: this.data.page + 1
    });
    this.getArticleList();
  },
  timeFormat(s) {
    let date = new Date(s);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return [year, month, day].map(this.toStr).join('-');
  },
  toStr(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },
  toDetail(event) {
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/post/post?id=' + id,
    })
  }

})