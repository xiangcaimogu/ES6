(function(){
    requirejs.config({
        paths:{
            // baseUrl:'js', // 基本路径，出发点在根目录

            dataServer:'./module/dataServer',
            alter:'./module/alter',
            app:'../app'
        }
    })
    requirejs(['alter'],function(alter){
        alter.showMsg()
    })
})()