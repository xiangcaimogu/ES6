function axios({
    url,
    method = 'GET',
    params = {}, //get的时候传params
    data = {} //post传data
}) {
    return new Promise((resolve, reject) => {
        method=method.toUpperCase()
        //执行ajax请求

        //处理get请求参数拼到url上
        let queryString=''
        Object.keys(params).map(i=>{
            queryString+=`${i}=${params[i]}&`
        })
        if(queryString){
            queryString=queryString.substring(0,queryString.length-1)
            url+='?'+queryString
        }



        const xhr = new XMLHttpRequest;
        xhr.open(method, url, true)
        if (method == 'GET' || method=='DELETE') {
            xhr.send()
        } else if (method == 'POST' || method=='PUT') {
            xhr.setRequestHeader('Content-Type', "application/json;charset=utf-8")
            xhr.send(JSON.stringify(data))
        }

        //监听
        xhr.onreadystatechange=function(){
            if(xhr.readyState!=4){
                return
            }
            const {status,statusText} = xhr
            if(status>=200&&status<300){
                const response={
                    data:JSON.stringify(xhr.response),
                    status,
                    statusText
                }
                resolve(response)
            }else {
                reject(new Error('reqpuire error is status is'+ status))
            }
        }
    })
}

//options 请求，返回204 也叫预请求，在跨域请求时，发送增删改查请求时，这些重要的请求，会先发送预请求options