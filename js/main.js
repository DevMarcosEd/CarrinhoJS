let lista = [
    {'descricao':'feijão', 'qtd':'4', 'valor':'35.40'},
    {'descricao':'arroz', 'qtd':'2', 'valor':'25.00'},
    {'descricao':'óleo', 'qtd':'6', 'valor':'11.20'}
]
console.log(lista)

////somando valores dos obj da tabela para exibir o valor total
function getTotal(lista){
	var total = 0;
	for(var i in lista){
		total += lista[i].valor * lista[i].qtd;
	}
	console.log(total)
	document.getElementById("valorTotal").innerHTML = formatValor(total);
}

//percorrendo os ojb da tabela lista
function setList(lista){
    let tabela = '<thead><tr><td>Descrição</td><td>Quantidade</td><td>Valor</td><td>Ações</td></tr></thead><tbody>'
    for(let i in lista){
        tabela += '<tr><td>'+ formatDesc(lista[i].descricao)+'</td><td>'+ formatQtd(lista[i].qtd)+'</td><td>'+ formatValor(lista[i].valor) + '</td><td><button class="btn btn-default" onclick="setUpdate('+i+');">Editar</button> <button class="btn btn-default" onclick="deleteData('+i+')";>Deletar</button></td></tr>'
        // console.log(i)
    }
    tabela += '</tbody>'

    // e exibindo os obj na div que contém o id = listaTabela
    document.getElementById('listaTabela').innerHTML = tabela
    getTotal(lista)
    salvarAmazenamento(lista)
}

//Formato de Exibição dos dados
    //formato da descricao
    function formatDesc(descricao){
        let str = descricao.toLowerCase()
        str = str.charAt(0).toUpperCase() + str.slice(1)
        return str
    }

    //formato da quantidade
    function formatQtd(qtd){
        return parseInt(qtd)
    }

    //formato do valor
    function formatValor(valor){
        var str = parseFloat(valor).toFixed(2) + ""
        str = str.replace('.',',')
        str = 'R$ ' + str
        return str
    }

    //adicionando novo produto
    function addProd() {
        if(!validation()){
            return
        }
        var descricao = document.getElementById('descricao').value
        var qtd = document.getElementById('qtd').value
        var valor = document.getElementById('valor').value

        lista.unshift({'descricao':descricao, 'qtd':qtd, 'valor':valor})
        setList(lista)
    }

//botões de editar

function setUpdate(id) {
    var obj = lista[id]
    document.getElementById("descricao").value = obj.descricao;
    document.getElementById("qtd").value = obj.qtd;
    document.getElementById("valor").value = obj.valor;

    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";

    document.getElementById("inputIDUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="'+id+'">';
}

//Limpando os campos inputs
function resetForm(){
	document.getElementById("descricao").value = "";
	document.getElementById("qtd").value = "";
	document.getElementById("valor").value = "";
	document.getElementById("btnUpdate").style.display = "none";
	document.getElementById("btnAdd").style.display = "inline-block";
	
	document.getElementById("inputIDUpdate").innerHTML = "";
	document.getElementById("erros").style.display = "none";
}

//atualizando os dados
function updateData(){
	if(!validation()){
		return;
	}
	var id = document.getElementById("idUpdate").value;
	var descricao = document.getElementById("descricao").value;
	var qtd = document.getElementById("qtd").value;
	var valor = document.getElementById("valor").value;

	lista[id] = {"descricao":descricao, "qtd":qtd, "valor":valor};
	resetForm();
	setList(lista);
}

//deletando os dados
function deleteData(id){
	if(confirm("Deseja deletar este item?")){
		if(id === lista.length - 1){
			lista.pop();
		}else if(id === 0){
			lista.shift();
		}else{
			var arrAuxIni = lista.slice(0,id);
			var arrAuxEnd = lista.slice(id + 1);
			lista = arrAuxIni.concat(arrAuxEnd);
		}
		setList(lista);
	}
}

//validando e printando erros
function validation(){
	var descricao = document.getElementById("descricao").value;
	var qtd = document.getElementById("qtd").value;
	var valor = document.getElementById("valor").value;
	var erros = "";
	document.getElementById("erros").style.display = "none";

	if(descricao === ""){
		erros += '<p>Descrição vazia</p>';
	}
	if(qtd === ""){
		erros += '<p>Quantidade vazia</p>';
	}else if(qtd != parseInt(qtd)){
		erros += '<p>Quantidade de ser um valor númerico</p>';
	}
	if(valor === ""){
		erros += '<p>Valor vazio</p>';
	}else if(valor != parseFloat(valor)){
		erros += '<p>Preencha um valor válido</p>';
	}

	if(erros != ""){
		document.getElementById("erros").style.display = "block";
		document.getElementById("erros").innerHTML = "<h3>Error:</h3>" + erros;
		return 0;
	}else{
		return 1;
	}
}

//deletando lista
function deletarLista(){
	if (confirm("Deseja deletar toda a lista?")){
		lista = [];
		setList(lista);
	}
}

   

//salvando em storage
//setItem(chave, valor) :  Armazena um item com a chave e o valor.
function salvarAmazenamento(lista){
	var jsonStr = JSON.stringify(lista);
	localStorage.setItem("lista",jsonStr);
}

//verifica se já tem algo salvo
//getItem(chave): Recupera o valor do item com o nome da chave.
function initListStorage(){
	var testList = localStorage.getItem("lista");
	if(testList){
		lista = JSON.parse(testList);
	}
	setList(lista);
}

initListStorage();