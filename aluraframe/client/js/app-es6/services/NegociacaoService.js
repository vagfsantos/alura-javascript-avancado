import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {Negociacao} from '../models/Negociacao';

export class NegociacaoService
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

    cadastra(negociacao)
    {
    	return ConnectionFactory.getConnection()
    		.then(connection => new NegociacaoDao(connection))
    		.then( dao => dao.adiciona( negociacao ) )
    		.then( () => 'Negociacao adicionada com sucesso' )
    		.catch( () => 'Erro ao salvar os dados' )
    }

    lista()
    {
    	return ConnectionFactory.getConnection()
    		.then(connection => new NegociacaoDao(connection))
    		.then( dao => dao.listaTodos() )
    		.catch( erro => {
    			console.log('Não foi possível listar as negociações');
    			throw new Error('Não foi possível listar as negociações');
    		});
    }

    apaga()
    {
    	return ConnectionFactory.getConnection()
    		.then(connection => new NegociacaoDao(connection))
    		.then( dao => dao.apagaTodos() )
    		.catch( erro => {
    			console.log('Não foi possível apagar as negociações');
    			throw new Error('Não foi possível apagar as negociações');
    		});
    }

    importa(listaAtual)
    {
    	return this.obterNegociacoes()
	    		.then( negociacoes => 
	    			negociacoes.filter( negociacao => 
	    				!listaAtual.some( negociacaoExistente => negociacao.isEqual(negociacaoExistente) )
	    			)
	    		)
	    		.catch( erro => {
	    			console.log(erro);
	    			throw new Error('Não foi possível buscar as engociações')
	    		})
    }
}