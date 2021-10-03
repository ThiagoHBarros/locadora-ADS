import sql from 'mssql'
import {sqlConfig} from '../sql/config.js'


sql.on('error', err => {
    console.error(err)
})

sql.connect(sqlConfig).then(pool => {

    return pool.request()
    .input('titulo', sql.VarChar(100),'L ')
    .input('preco', sql.Numeric(7,2), 12.20)
    .input('diretor', sql.VarChar(100),'Michael Jackson')
    .input('genero', sql.VarChar(100),'Drama')
    .output('codigogerado', sql.Int)
    .execute('SP_I_LOC_FILME')
    
}).then(result => {
    console.log(result)
}).catch(err =>{
    console.log(err.message)
})