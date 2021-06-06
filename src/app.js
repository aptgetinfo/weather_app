const path=require('path')
const express =require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forrecast')



const app=express()
const port=process.env.port || 3000
const publicdir=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../tempelates/views')
const partialpath=path.join(__dirname,'../tempelates/partials')


app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)



app.use(express.static(publicdir))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Deepak Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Deepak Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpfull text',
        title:'Help',
        name:'Page'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an Address'
        })
    }
    geocode(req.query.address,(error,{lat,lon,loc}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(lat,lon,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:loc,
                address:req.query.address
            })
        })
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Deepak Kumar',
        errormsg:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Deepak Kumar',
        errormsg:'page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up and running on '+port)
})