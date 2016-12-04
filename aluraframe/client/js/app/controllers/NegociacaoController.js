class NegociacaoController
{
	constructor()
	{
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');

		this._listaNegociacoes = new Bind(
			new ListaNegociacoes(),
			new NegociacoesView( $('#negociacoesView') ),
			'adiciona', 'esvazia', 'ordena', 'inverteOrdem'
		);

		this._mensagem = new Bind(
			new Mensagem(),
			new MensagemView( $('#mensagemView') ),
			'texto'
		);

		this._ordemAtual = '';	
	}

	adiciona(event)
	{
		event.preventDefault();

		ConnectionFactory.getConnection()
		.then(connection => {
			let negociacao = this._criaNegociacao();

			new NegociacaoDao(connection).adiciona( negociacao ).then( () => {
				this._listaNegociacoes.adiciona( negociacao );
				this._mensagem.texto = 'Negociação realizada com sucesso';
				this._limpaFormulario();
			} );
		})
		.catch(erro => this._mensagem.texto = 'Negociação não pode ser realizada');

	}

	importaNegociacoes()
	{
		let service = new NegociacaoService();

		service.obterNegociacoes()
			.then( negociacoes => negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao) ) )
			.catch(erro => this.mensagem.texto = erro);

		// Promise.all([
		// 	service.obterNegociacaoesDaSemana(),
		// 	service.obterNegociacaoesDaSemanaAnterior(),
		// 	service.obterNegociacaoesDaSemanaRetrasada()
		// ]).then( negociacoes => {
		// 	negociacoes
		// 		.reduce( (arrayAchatado, array) => arrayAchatado.concat(array), [])
		// 		.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao) );
		// 	this._mensagem.texto = 'Negociações importadas com sucesso';
		// })
		// .catch(erro => this.mensagem.texto = erro);

		// service.obterNegociacaoesDaSemana()
		// 	.then( (negociacoes) => {
		// 		negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao) );
		// 		this._mensagem.texto = 'Negociações importadas com sucesso';
		// 	})
		// 	.catch(erro => this.mensagem.texto = erro);

		// service.obterNegociacaoesDaSemanaAnterior()
		// 	.then( (negociacoes) => {
		// 		negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao) );
		// 		this._mensagem.texto = 'Negociações importadas com sucesso';
		// 	})
		// 	.catch(erro => this.mensagem.texto = erro);

		// service.obterNegociacaoesDaSemanaRetrasada()
		// 	.then( (negociacoes) => {
		// 		negociacoes.forEach( negociacao => this._listaNegociacoes.adiciona(negociacao) );
		// 		this._mensagem.texto = 'Negociações importadas com sucesso';
		// 	})
		// 	.catch(erro => this.mensagem.texto = erro);
	}

	apaga()
	{
		this._listaNegociacoes.esvazia();
		this._mensagem.texto = 'Negociações apagadas com sucesso';
	}

	_criaNegociacao()
	{
		return new Negociacao(
			DateHelper.textoParaData(this._inputData.value),
			parseInt(this._inputQuantidade.value),
			parseFloat(this._inputValor.value)
		);
	}

	_limpaFormulario()
	{
		this._inputData.value = '';
		this._inputQuantidade.value = '1';
		this._inputValor.value = '0';
		this._inputData.focus();
	}

	ordena(coluna)
	{
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}