import express from 'express'
const app = express()
const port = 4000

app.use(express.urlencoded({extended: true}))// converte carac. especiais em html entity
app.use(express.json())//Fará o parse no conteúdo json
app.disable('x-powered-by')//removendo por questoes de segurança 

import rotasFilmes from './routes/filmes.js'

//rotas restfull do nosso app
app.use('/api/filmes', rotasFilmes)


//define nossa rota default
app.get('/api', (req, res)=> {
    res.status(200).json({
        mensagem: 'API da Locadora 100% funcional',
        versao: '1.0.0'
    })

})

//rota de conteudo publico
app.use('/', express.static('public'))

//rota para tratar erros 404
app.use(function(req,res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, function(){
    console.log(`Servidor web rodando na porta ${port}`)   
})
