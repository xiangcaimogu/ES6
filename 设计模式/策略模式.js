// 策略类为表单校验正则及及自定义的规则
var rules = {
    // 是否中文
    isChinese: function (value) {
        if (/^[\u4e00-\u9fa5]{0,}$/.test(value)) {
            return true
        } else {
            return false
        }
    },
    //  是否不为空
    notNull: function (value) {
        if (value !== '') {
            return true
        } else {
            return false
        }
    },
    // ....不同策略
}


// 环境类
var validate = function (rule, value) {
    return rules[rule](value);
};

//业务执行
const isChinese = validate('isChinese', value)
const notNull = validate('notNull', value)
const checkResult = isChinese || notNull
if (checkResult) {
    //   .....只能支持表单项全部检测完成后总的失败回调，对于当个表单项的失败无法支持，
    // 用户往往输入完成全部表单项后才被告知表单中有错误，而且还不知道具体是哪个
}



class Validate {
    constructor () {
      this.cache = []
      if (Array.isArray(arguments[0])) {
        // 数组的单个元素{rule:string[规则的名称],value:any[校验的值],efn:fn[失败的回调]}
        this.cache = arguments[0]
      }
      // 传入参数为对象时
      this.cache.push(arguments[0])
    }
    // 执行校验,失败的话执行失败的回调，成功静默，所有的参数符合规则则返回true
    valid () {
      let i = 0
      for (const value of this.cache) {
        if (rules[value.rule] && rules[value.rule](value.value)) {
          i++
        } else {
          if (value.efn) value.efn()
          return false
        }
      }
      return i === this.cache.length
    }
  }
  