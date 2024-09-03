const dotenv = require('dotenv')
dotenv.config()
const axios = require('axios')

const PROTOCOL = process.env.PROTOCOL
const BASE_URL = process.env.BASE_URL
const Q = process.env.Q
const APP_ID = process.env.APP_ID
const UNITS = process.env.UNITS
const LANG = process.env.LANG

const url = `${PROTOCOL}://${BASE_URL}?q=${Q}&appid=${APP_ID}&units=${UNITS}&lang=${LANG}`
const url = `${PROTOCOL}://${BASE_URL}?q=${Q}&appid=${APP_ID}&units=${UNITS}&lang=${LANG}`

axios
    .get(url)
    .then(res => {
        console.log(res)
        return res.data
    })
    .then(res => {
        console.log(res.cnt)
        return res
    })
    .then(res => {
        console.log(res.list)
        return res["list"]
    })
    .then(res => {
        //imprimir somente algumas info do resultado
        for(let previsao of res){
            console.log(`
                ${new Date(previsao.dt * 1000).toLocaleString()},
                ${'Min: ' + previsao.main.temp_min}\u00B0C,
                ${'Max: ' + previsao.main.temp_max}\u00B0C,
                ${'Umid: ' + previsao.main.humidity}%,
                ${previsao.weather[0].description}
                `)
        }
        return res
    })
    .then(res => {
        //verifica quantas temperaturas tem sensação térmica acima do 30 graus
        const lista = res.filter(r => r.main.feels_like >= 30)
        console.log(`${lista.length} previsões tem sensação térmica acima de 30 graus Celsius`)
    })
    .catch(err => {
        console.log(err)
    })