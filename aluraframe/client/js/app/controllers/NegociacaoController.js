class NegociacaoController
{
	constructor()
	{
		let $ = document.querySelector.bind(document);
		this._inputData = $('#data');
		this._inputQuantidade = $('#quantidade');
		this._inputValor = $('#valor');
	}

	adiciona(event)
	{
		event.preventDefault();
		
		let negociacao = new Negociacao(
			new Date(...
				this._inputData.value
				.split('-')
				.map( (item, i) => item - i % 2 )
			),
			this._inputQuantidade.value,
			this._inputValor.value
		);

		this.cleanForm();
		console.log(negociacao);
		return negociacao;
	}

	cleanForm()
	{
		this._inputData.value = '';
		this._inputQuantidade.value = '1';
		this._inputValor.value = '0';
		this._inputData.focus();
	}
}