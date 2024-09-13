// De dentro do objeto require() eu quero apenas o select
const { select, input } = require('@inquirer/prompts')

let meta = {
    value: "tomar 3L de água",
    checked: false
}

let metas = [meta];

// Temos uma função arrow assíncrona que faz o trabalho de cadastrar uma nova meta ao sistema
const cadastrarMeta = async () =>{
    // a variável constante vai esperar que o usuário informe a meta a ser cadastrada
    const meta = await input({message: "Digite a meta:"})
    
    // se a meta for um texto vazio ele vai retornar no console que a meta não pode ser vazia e encerra a aplicação
    if(meta.length == 0){
        console.log("A meta não pode ser vazia");
        return    
    }

    // caso meta não estej vazio, vai cadastrar a meta através da função push() recebendo um objeto que de valor
    // tem o que foi passado em meta e por ser uma meta nova ele não foi feito ainda, por isso checked é false
    metas.push({
        value: meta,
        checked: false
    })
}

// função arrow assíncrona é implementada dentro de uma variável constante
const test = async () => {

    // uma condição é posta caso seja verdadeira
    while(true){

        // a opção await faz com que haja uma promessa de que trará uma resposta,
        // no caso abaixo o usuário fará uma seleção por meio de select das choices. 
        const opcao = await select({
                message: "Menu >",
                choices: [
                    {
                        name: "Cadastrar meta",
                        value: "cadastrar"
                    },
                    {
                        name: "Listar metas",
                        value: "listar"
                    },
                    {
                        name: "Sair",
                        value: "sair"
                    }
                ] 
        })

        // o switch vai receber opcao e vai entrar no caso que corresponda ao valor passado em opcao
        switch(opcao){
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break
            case "listar":
                console.log("listar");
                break
            case "sair":
                console.log("Até a próxima! :)");
                return
        }
    }
}

// roda a função
test()