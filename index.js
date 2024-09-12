// De dentro do objeto require() eu quero apenas o select
const { select } = require('@inquirer/prompts')

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
                console.log("cadastrar");
                break
            case "listar":
                console.log("listar");
                break
            case "sair":
                return
        }
    }
}

// roda a função
test()