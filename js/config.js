function config(){
    //criando um objeto
    const texto = {titulo:'Carrinho de produtos'}
    //pegando o valor do objeto e atribuindo ao id para exibição no HTML
    document.getElementById('tituloNav').innerHTML = texto.titulo
}

config()