class NegociacaoService
{
	constructor(){
		this._http = new HttpService();
	}

	obterNegociacoes(){
		return Promise.all([
			this.obterNegociacaoesDaSemana(),
			this.obterNegociacaoesDaSemanaAnterior(),
			this.obterNegociacaoesDaSemanaRetrasada()
		])
		.then( periodos => {
			let negociacoes = periodos
				.reduce( (dados, array) => dados.concat(array), [])
				.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));
			return negociacoes;
		})
		.catch( erro => {throw new Error(erro)} );
	}

    obterNegociacaoesDaSemana()
    {
		return new Promise( (resolve, reject) => {
			this._http.get('negociacoes/semana')
			.then(
				(negociacoes) => resolve( negociacoes.map( obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor) ))
			).catch( (erro) => {
				console.log(erro);
				reject('Não foi possível obter as negociações da semana'); 
			})
		});
    }

	obterNegociacaoesDaSemanaAnterior()
    {
		return new Promise( (resolve, reject) => {
			this._http.get('negociacoes/anterior')
			.then(
				(negociacoes) => resolve( negociacoes.map( obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor) ))
			).catch( (erro) => {
				console.log(erro);
				reject('Não foi possível obter as negociações da semana anterior'); 
			})
		});
    }

	obterNegociacaoesDaSemanaRetrasada()
    {
		return new Promise( (resolve, reject) => {
			this._http.get('negociacoes/retrasada')
			.then(
				(negociacoes) => resolve( negociacoes.map( obj => new Negociacao(new Date(obj.data), obj.quantidade, obj.valor) ))
			).catch( (erro) => {
				console.log(erro);
				reject('Não foi possível obter as negociações da semana retrasada'); 
			})
		});
    }
}