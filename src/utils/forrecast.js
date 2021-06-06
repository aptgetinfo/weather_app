const request=require('request')
const forecast=(lat,lon,callback)=>{
    url='http://api.weatherapi.com/v1/current.json?key=4162caab4619449dba4211502210306&q='+lat+'/'+lon+'&aqi=no'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }else if(body.error){
            callback(body.error.message,undefined)
        }
        else{
            callback(undefined,body.current.temp_c)
        }
    })
}

module.exports=forecast