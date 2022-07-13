/**
 * 工具函数封装
 */
export default {
  //时间格式化，传入的是时间对象
  dateFormat(date,rule){
    let fmt = rule || 'yyyy-MM-dd hh:mm:ss'
    if(/(y+)/.test(fmt)){
      fmt = fmt.replace(RegExp.$1,date.getFullYear())
    }
    let o ={
      'M+':date.getMonth(),
      'd+':date.getDate(),
      'h+':date.getHours(),
      'm+':date.getMinutes(),
      's+':date.getSeconds()
    }
    for(let k in o){
      if(new RegExp(`(${k})`).test(fmt)){
        const val = o[k] + ''
        fmt = fmt.replace(RegExp.$1,RegExp.$1.length == 1 ?val:('00'+val).substr(val.length))
      }
    }
    return fmt
  }
}