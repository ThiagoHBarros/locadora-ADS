//API REST DE FILMES
import express  from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'
const router = express.Router()

/***********************************
 * GET /FILMES
 * RETORNAR A LISTA DE TODOS OS FILMES
 * ***********************************/
router.get("/", (req, res)=>{
    try{
        sql.connect(sqlConfig).then(pool =>{
            return pool.request()
            .execute('SP_S_LOC_FILME')
        }).then(dados =>{
            res.status(200).json(dados.recordset)
        }).catch(err =>{
            res.status(400).json(err) // 400 - Bad Request
        })
    }catch(err){
        console.error(err)
    }
})
/*************************************
 * GET /FILMES/TITULO
 * RETORNAR UM FILME ATRAVÉS DO TITULO
 *************************************/
 router.get("/:titulo", (req, res)=>{
    const titulo = req.params.titulo
    try{
        sql.connect(sqlConfig).then(pool =>{
            return pool.request()
            .input('titulo', sql.VarChar(100), titulo)
            .execute('SP_S_LOC_FILME_FILTRO')
        }).then(dados =>{
            res.status(200).json(dados.recordset)
        }).catch(err =>{
            res.status(400).json(err) // 400 - Bad Request
        })
    }catch(err){
        console.error(err)
    }
})


/*************************************
 * POST /FILMES/ 
 * INSERE NOVO FILME
 *************************************/
router.post("/", (req,res)=> {
    sql.connect(sqlConfig).then(pool =>{
        const{titulo, preco, diretor, genero} = req.body
        return pool.request()
        .input('titulo', sql.VarChar(100), titulo)
        .input('preco', sql.Numeric(7,2), preco)
        .input('diretor', sql.VarChar(100), diretor)
        .input('genero', sql.VarChar(100), genero)
        .output('titulogerado', sql.Int)
        .execute('SP_I_LOC_FILME')
    }).then(dados =>{
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)//bad request
    })
})
/*************************************
 * PUT /FILMES/ 
 * ALTERA A INFORMACAO DE UM FILME
 *************************************/
 router.put("/", (req,res)=> {
    sql.connect(sqlConfig).then(pool =>{
        const{titulo, preco, diretor, genero} = req.body
        return pool.request()
        .input('titulo', sql.VarChar(100), titulo)
        .input('preco', sql.Numeric(7,2), preco)
        .input('diretor', sql.VarChar(100), diretor)
        .input('genero', sql.VarChar(100), genero)
        .execute('SP_I_LOC_FILME')
    }).then(dados =>{
        res.status(200).json('Filme alterado com sucesso!!')
    }).catch(err => {
        res.status(400).json(err.message)//bad request
    })
})
/*************************************
 * DELETE/FILMES/ 
 * APAGA UM FILME PELO CÓDIGO
 *************************************/
router.delete('/:titulo', (req,res) =>{
    sql.connect(sqlConfig.then(pool =>{
        const titulo = req.params.titulo
        return pool.request()
        .input('titulo', sql.Int, titulo)
        .execute('SP_D_LOC_FILME')
    }).then(dados => {
        res.status(200).json('Filme deletado com sucesso!!')

    }).catch(err => {
        res.status(400).json(err.message)
    })
    )
})

export default router 