import request from '../../utils/request.js'
Page({
  data: {
    bannersList:[],// 轮播图数据
    recommendList:[], //推荐歌曲数据
    topList:[] //排行榜
  },
  //options(Object)
   onLoad: function(option) {
    /* wx.request({
      url: 'http://localhost:3000/banner?type=2',
      success: (res) => {
        console.log(res);
        this.setData({
          bannersList:res.data.banners
        })
      },
      fail: (err) => {
        console.log('请求失败',err);
      },
      complete: () => {}
    }); */
   this.getInitData()
  },

  // 封装获取初始化数据的方法
  async getInitData(){
    // 获取轮播图数据
    let bannerListResult=await request('/banner', {type:2})
    // console.log(bannerListResult);
    this.setData({
      bannersList:bannerListResult.banners
    })

    // 获取推荐歌曲数据
    let recommendListResult=await request('/personalized', {limit:30})
    // console.log(recommendListResult);
    this.setData({
      recommendList:recommendListResult.result
    })

    // 获取排行榜数据
    /* 
      idx:0-20
      需求：0-20
    */
   let index=0
   let topListArr=[]
   while(index<10){
    let topListResult=await request('/top/list', {idx:index++})
    //slice截取不会影响原数组 splice可以对数组进行增删改，会影响原数组 
    let obj={name:topListResult.playlist.name,tracks:topListResult.playlist.tracks.slice(0,3)}
    topListArr.push(obj)
    // console.log(topListResult);
    // 用户等待时间较短，体验较好，会渲染多次，会导致项目性能变差
    this.setData({
      topList:topListArr
    })
  }
  // 更新状态数据,等待时间比较久，用户体验较差
  /* this.setData({
    topList:topListArr
  }) */
   
  },

  
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  