const porta = 3003
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const bancoDeDados = require('./dataBase')

//config do bodyParser
app.use(bodyParser.urlencoded({extended:true}))

// Rotas
    //buscar produtos
app.get('/produtos', (req, resp, next)=>{
    resp.send(bancoDeDados.getProdutos())
})
    //buscar produto por id
app.get('/produtos/:id', (req, resp, next)=>{
    resp.send(bancoDeDados.getProduto(req.params.id))
})
    //add produto
app.post('/produtos', (req, resp, next)=>{
   const produto = bancoDeDados.salvarProduto({
        nome: req.body.nome,
        preco: req.body.preco
    })
    resp.send(produto)
})
    //alterar produto
app.put('/produtos/:id', (req, resp, next)=>{
    const produto = bancoDeDados.salvarProduto({
        id: req.params.id,
        nome: req.body.nome,
        preco: req.body.preco
    })
    resp.send(produto) //JSON
})
    //excluir produto
app.delete('/produtos/:id', (req, resp, next)=>{
    const produto = bancoDeDados.excluirProduto(req.params.id)
    resp.send(produto) //JSON
})

// config server
app.listen(porta, ()=>{
    console.log(`Servido rodando na porta ${porta}`)
})
