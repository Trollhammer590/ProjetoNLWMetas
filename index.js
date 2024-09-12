const test = () => {

    while(true){
        let opção = "sair"
        switch(opção){
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

test()