'use strict';

System.register(['./HttpService', './ConnectionFactory', '../dao/NegociacaoDao', '../models/Negociacao'], function (_export, _context) {
	"use strict";

	var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	return {
		setters: [function (_HttpService) {
			HttpService = _HttpService.HttpService;
		}, function (_ConnectionFactory) {
			ConnectionFactory = _ConnectionFactory.ConnectionFactory;
		}, function (_daoNegociacaoDao) {
			NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
		}, function (_modelsNegociacao) {
			Negociacao = _modelsNegociacao.Negociacao;
		}],
		execute: function () {
			_createClass = function () {
				function defineProperties(target, props) {
					for (var i = 0; i < props.length; i++) {
						var descriptor = props[i];
						descriptor.enumerable = descriptor.enumerable || false;
						descriptor.configurable = true;
						if ("value" in descriptor) descriptor.writable = true;
						Object.defineProperty(target, descriptor.key, descriptor);
					}
				}

				return function (Constructor, protoProps, staticProps) {
					if (protoProps) defineProperties(Constructor.prototype, protoProps);
					if (staticProps) defineProperties(Constructor, staticProps);
					return Constructor;
				};
			}();

			_export('NegociacaoService', NegociacaoService = function () {
				function NegociacaoService() {
					_classCallCheck(this, NegociacaoService);

					this._http = new HttpService();
				}

				_createClass(NegociacaoService, [{
					key: 'obterNegociacoes',
					value: function obterNegociacoes() {
						return Promise.all([this.obterNegociacaoesDaSemana(), this.obterNegociacaoesDaSemanaAnterior(), this.obterNegociacaoesDaSemanaRetrasada()]).then(function (periodos) {
							var negociacoes = periodos.reduce(function (dados, array) {
								return dados.concat(array);
							}, []).map(function (dado) {
								return new Negociacao(new Date(dado.data), dado.quantidade, dado.valor);
							});
							return negociacoes;
						}).catch(function (erro) {
							throw new Error(erro);
						});
					}
				}, {
					key: 'obterNegociacaoesDaSemana',
					value: function obterNegociacaoesDaSemana() {
						var _this = this;

						return new Promise(function (resolve, reject) {
							_this._http.get('negociacoes/semana').then(function (negociacoes) {
								return resolve(negociacoes.map(function (obj) {
									return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
								}));
							}).catch(function (erro) {
								console.log(erro);
								reject('Não foi possível obter as negociações da semana');
							});
						});
					}
				}, {
					key: 'obterNegociacaoesDaSemanaAnterior',
					value: function obterNegociacaoesDaSemanaAnterior() {
						var _this2 = this;

						return new Promise(function (resolve, reject) {
							_this2._http.get('negociacoes/anterior').then(function (negociacoes) {
								return resolve(negociacoes.map(function (obj) {
									return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
								}));
							}).catch(function (erro) {
								console.log(erro);
								reject('Não foi possível obter as negociações da semana anterior');
							});
						});
					}
				}, {
					key: 'obterNegociacaoesDaSemanaRetrasada',
					value: function obterNegociacaoesDaSemanaRetrasada() {
						var _this3 = this;

						return new Promise(function (resolve, reject) {
							_this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
								return resolve(negociacoes.map(function (obj) {
									return new Negociacao(new Date(obj.data), obj.quantidade, obj.valor);
								}));
							}).catch(function (erro) {
								console.log(erro);
								reject('Não foi possível obter as negociações da semana retrasada');
							});
						});
					}
				}, {
					key: 'cadastra',
					value: function cadastra(negociacao) {
						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.adiciona(negociacao);
						}).then(function () {
							return 'Negociacao adicionada com sucesso';
						}).catch(function () {
							return 'Erro ao salvar os dados';
						});
					}
				}, {
					key: 'lista',
					value: function lista() {
						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.listaTodos();
						}).catch(function (erro) {
							console.log('Não foi possível listar as negociações');
							throw new Error('Não foi possível listar as negociações');
						});
					}
				}, {
					key: 'apaga',
					value: function apaga() {
						return ConnectionFactory.getConnection().then(function (connection) {
							return new NegociacaoDao(connection);
						}).then(function (dao) {
							return dao.apagaTodos();
						}).catch(function (erro) {
							console.log('Não foi possível apagar as negociações');
							throw new Error('Não foi possível apagar as negociações');
						});
					}
				}, {
					key: 'importa',
					value: function importa(listaAtual) {
						return this.obterNegociacoes().then(function (negociacoes) {
							return negociacoes.filter(function (negociacao) {
								return !listaAtual.some(function (negociacaoExistente) {
									return negociacao.isEqual(negociacaoExistente);
								});
							});
						}).catch(function (erro) {
							console.log(erro);
							throw new Error('Não foi possível buscar as engociações');
						});
					}
				}]);

				return NegociacaoService;
			}());

			_export('NegociacaoService', NegociacaoService);
		}
	};
});
//# sourceMappingURL=NegociacaoService.js.map