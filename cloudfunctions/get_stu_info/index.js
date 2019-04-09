// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
})

// 云函数入口函数
exports.main = async (event, context) => {
  const {
    OPENID,
    APPID,
    UNIONID,
  } = cloud.getWXContext()
  const db = cloud.database()
  const info = db.collection("stu_info")
  
  return info.get()

}