import fetch from './axios'
//首页商品列表
//size,page,cate,hot
export function fetchGoodList(params){
    return fetch({
        url:'/api/v1/jd/good/list',
        method:'GET',
        params
    })
}
//获取品类
export function fetchAllCates(params){
    return fetch({
        url:'/api/v1/jd/cates',
        method:'GET',
        params
    })
}
//获取商品详情
export function fetchGoodDetail(params){
    return fetch({
        url: '/api/v1/jd/good/detail',
        method:'GET',
        params
    })
}
//登录
export function fetchLogin(data) {
    return fetch({
      url: '/api/v1/user/login',
      method: 'POST',
      data
    })
  }
  
  // 注册
  // { username, password, password2 }
  export function fetchRegist(data) {
    return fetch({
      url: '/api/v1/user/regist',
      method: 'POST',
      data
    })
  }
  //获取购物车的列表
  export function fetchCart(params) {
    return fetch({
      url: '/api/v1/jd/cart/list',
      method: 'GET',
      params
    })
  }
  //删除一个商品
  export function fetchDelCart(params) {
    return fetch({
      url: '/api/v1/jd/cart/del',
      method: 'GET',
      params
    })
  }
  // 提交购物车
// { goods: String 用户已勾选的订单_id 连接而成的字符串 }
export function fetchSubmitCart(data) {
  return fetch({
    url: '/api/v1/jd/cart/submit',
    method: 'POST',
    data
  })
}

export function fetchGoodAddcate(data){
    return fetch({
        url: '/api/v1/jd/cart/add',
        method:'POST',
        data
    })
}
// 修改购物车商品数量
// { id: 同上, num: 修改后的数量 }
export function fetchUpdCart(data) {
    return fetch({
      url: '/api/v1/jd/cart/update',
      method: 'POST',
      data
    })
  }
  

export default {
    fetchGoodList,
    fetchAllCates,
    fetchGoodDetail,
    fetchGoodAddcate,
    fetchRegist,
    fetchLogin,
    fetchCart,
    fetchDelCart,
    fetchUpdCart,
    fetchSubmitCart
}