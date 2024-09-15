// De dentro do objeto require() eu quero select que mostra uma lista para nós, o input pega informações de usuário
// o checkbox
const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem vindo(a) ao app de Metas."
let meta = {
    value: "Tomar 3L de água.",
    checked: false
}

let metas = [meta];

// Temos uma função arrow assíncrona que faz o trabalho de cadastrar uma nova meta ao sistema
const cadastrarMeta = async () => {
    // a variável constante vai esperar que o usuário informe a meta a ser cadastrada
    const meta = await input({message: "Digite a meta:"})
    
    // se a meta for um texto vazio ele vai retornar no console que a meta não pode ser vazia e encerra a aplicação
    if(meta.length == 0){
        mensagem = "A meta não pode ser vazia";
        return    
    }

    // caso meta não estej vazio, vai cadastrar a meta através da função push() recebendo um objeto que de valor
    // tem o que foi passado em meta e por ser uma meta nova ele não foi feito ainda, por isso checked é false
    metas.push({
        value: meta,
        checked: false
    })

    mensagem ="Meta cadastrada com sucesso!"
}

// Temos uma funcão arrow assíncrona que lista para nós as metas criadas no projeto
const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use SETAS para mudar de meta, ESPAÇO para marcar ou desmarcar, ENTER para finalizar etapa.",
        choices: [...metas],
        instructions: false
    })

    if(respostas.length == 0){
        mensagem ="Nenhuma meta selecionada.";
        return
    }

    // essa situação fará com que todas as metas sejam desmarcadas, mas quando elas entrarem na situação abaixo serão marcadas
    // novamente.
    metas.forEach((m)=>{
        m.checked = false;
    })

    // o forEach significa para cada. Como respostas está recebendo cada meta cadastrada, o forEach vai analisar cada uma
    // e executar a função que faz com que haja uma comparação entre a primeira (resposta) meta cadastrada no sistema
    // com a meta que o usuário selecionou em resposta, para saber se vai ser ou não desmarcada usamos outra função chamada
    // find() que retornará em verdadeiro ou falso se a resposta condiz com uma meta em metas. Ela não encontrou a meta com o
    // nome passado em respostas.
    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta;
        })

        meta.checked = true
    })

    
    mensagem ="Meta(s) marcada(s) como concluída(s).";
}

// Temos uma função arrow assíncrona que vai filtrar apenas as metas que retornam verdadeiro no checked
const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) =>{
        return meta.checked;
    })

    if(realizadas.length == 0){
        let mensagem = "Não existem metas Realizadas :(";
        return;
    }

    await select({
        message:"Metas Realizadas: " +metas.length,
        choices: [...realizadas]
    })
}

// A função metasAbertas vai conferir se o atributo checked de cada meta é true ou false. Para checked = false, vai ser
// retornado meta.checked != true, trazendo um retorno verdadeiro o que faz com que entre na variável as metas não marcadas (abertas).
const metasAbertas = async () => {
    const abertas = metas.filter((meta)=>{
        // o ! antes de meta.checked faz com que o valor se inverta de false para true
        return !meta.checked;
    })

    if(abertas.length == 0){
        let mensagem = "Parabéns! Não há metas abertas :)";
        return;
    }

    await select({
        message: "Metas Abertas: " +metas.length,
        choices:[...abertas]
    })
}

const deletarMetas = async () => {
    const metasDesmarcadas = metas.map((meta) =>{
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione com ESPAÇO um item para deletar.",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar.length == 0){
        mensagem = "Nenhum item para deletar.";
        return
    }

    // nessa função está sendo analisaco cada item e passado para um filtro que diz que caso o valor de meta.value seja diferente
    // de item, vai ser armazenado em metas. E só vai ficar aquilo que foi selecionado.
    itensADeletar.forEach((item)=>{
        metas = metas.filter((meta)=>{
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

// vai limpar o console sempre que a aplicação for iniciada
const mostrarMensagem = () =>{
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

// função arrow assíncrona é implementada dentro de uma variável constante
const test = async () => {

    // uma condição é posta caso seja verdadeira
    while(true){
                            mostrarMensagem(); // vai limpar o console sempre que a aplicação for iniciada 
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
                        name: "Metas realizadas",
                        value: "realizadas"
                    },
                    {
                        name: "Metas abertas",
                        value: "abertas"
                    },
                    {
                        name: "Deletar metas",
                        value: "deletar"
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
                break
            case "listar":
                await listarMetas();
                break
            case "realizadas":
                await metasRealizadas();
                break
            case "abertas":
                await metasAbertas();
                break
            case "deletar":
                    await deletarMetas();
                break
            case "sair":
                console.log("Até a próxima! :)");
                return
        }
    }
}

// roda a função
test()