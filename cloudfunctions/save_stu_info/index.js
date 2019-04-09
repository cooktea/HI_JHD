// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()
  const info = db.collection("stu_info")
  if(info.where({
    _openid:wxContext.OPENID
  }).get()){
    try{
      const res = info.where({_openid:wxContext.OPENID}).update({
        data:{
          stu_number:event.stu_number,
          post_address:event.post_address,
          phone_number:wxContext.phone_number
        }
      })
      return res
    }
    catch(e){
      return e
    }
  }
  else{
    try{
      const res = info.add({
        data:{
          stu_number:event.stu_number,
          post_address:wxContext.post_address,
          phone_number:wxContext.phone_number
        }
      })
      return res
    }
    catch(e){
      return e
    }
  }
}