import Qiniu from 'qiniu'

export default ({ Meteor, Collections, Global, Random, check }) => {
  const { ACCESS_KEY, SECRET_KEY, BUCKET_NAME, DOMAIN_NAME } = Global.qiniu
  Qiniu.conf.ACCESS_KEY = ACCESS_KEY
  Qiniu.conf.SECRET_KEY = SECRET_KEY
  Qiniu.conf.BUCKET_NAME = BUCKET_NAME
  Qiniu.conf.DOMAIN_NAME = DOMAIN_NAME

  const syncQiniuIoPut = Meteor.wrapAsync(Qiniu.io.put, Qiniu.io)

  // Upload binary file
  const uploadFile = (buf, key) => {
    const putPolicy = new Qiniu.rs.PutPolicy(`${BUCKET_NAME}:${key}`)
    const uptoken = putPolicy.token()
    const extra = new Qiniu.io.PutExtra()
    let result
    try {
      result = syncQiniuIoPut(uptoken, key, buf, extra)
    } catch (e) {
      throw Meteor.Error('400', e.message)
    }
    return result
  }

  Meteor.methods({
    /**
     * files.uploadFile 上传文件到七牛云
     * @param {*} buf 文件的 buf，由前端传入
     * @param {*} type 文件的类型，image、audio、pdf、word 等
     * @param {*} extension 文件的后缀名
     */
    'files.uploadFile' (buf, type, extension) {
      check(buf, String)
      check(type, String)
      check(extension, String)

      // if (!Meteor.userId()) {
      //   throw new Meteor.Error('401', '请登录后重试！')
      // }

      const fileName = Meteor.isDevelopment
      ? `dev/${Random.hexString(8)}.${extension}`
      : `${Random.hexString(8)}.${extension}`

      const regex = new RegExp(`^data:.*${type}.*;base64,`)

      const res = uploadFile(new Buffer(buf.replace(regex, ''), 'base64'), fileName)
      return res.key
    }
  })
}
