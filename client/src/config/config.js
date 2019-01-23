import prodConfig from './prod_config'
import devConfig from './dev_config'

console.log(prodConfig)
console.log(devConfig)
if(process.env.NODE_ENV === 'production'){
    const config = prodConfig
} else{
   const config = devConfig
}


export default devConfig