angular.module('starter')
.controller('ListagemController', function($scope, CarroService){

	CarroService.obterCarros().then(function(dados){

		$scope.listaDeCarros = dados;

	});

});

angular.module('starter')
.controller('CarroEscolhidoController', function($stateParams, $scope){

	$scope.carroEscolhido = angular.fromJson($stateParams.carro);

	$scope.listaDeAcessorios = [{"nome" : "Freio ABS", "preco": 800},
								{"nome" : "Ar Condicionado", "preco": 1000},
								{"nome" : "MP3 Player" , "preco" : 500}];

	$scope.mudou = function(acessorio, isMarcado){

		if (isMarcado) {
			$scope.carroEscolhido.preco = 
						$scope.carroEscolhido.preco + acessorio.preco;
		} else {
			$scope.carroEscolhido.preco = 
						$scope.carroEscolhido.preco - acessorio.preco;
		}

	};


});

angular.module('starter')
.controller('FinalizarPedidoController', function($stateParams, $scope
	, $ionicPopup, $state, CarroService){

	$scope.carroFinalizado = angular.fromJson($stateParams.carro);

	$scope.pedido = {};

	$scope.finalizarPedido = function(){

		var pedidoFinalizado = {
			params : {
				carro : $scope.carroFinalizado.nome,
				preco : $scope.carroFinalizado.preco,
				nome :  $scope.pedido.nome,
				endereco : $scope.pedido.endereco,
				email : $scope.pedido.email
			}
		}

		CarroService.salvarPedido(pedidoFinalizado).then(function(dados){

			$ionicPopup.alert({
				title: 'Parabens',
				template: 'Você acaba de comprar um carro.'
			}).then(function(){
				$state.go('listagem');
			});

		}, function(erro){
			$ionicPopup.alert({
				title: 'Deu erro',
				template: 'Campos obrigatórios'
			});
		});

	}

});

angular.module('starter')
.controller('LoginController', function($scope, CarroService, $ionicPopup, $state, $rootScope){

	$scope.login = {};

	//funcao que vem do submit do form
	$scope.realizarLogin = function(){
		
		var dadosLogin = {
			/*params: {
				email: $scope.login.email,
				senha: $scope.login.senha
			}*/
			params: {
				email: "joao@alura.com.br",
				senha: "alura123"
			}
		};

		CarroService.realizarLogin(dadosLogin).then(function(dados){
			
			$rootScope.usuario = dados.usuario;
			$state.go('app.listagem');

		}, function(erro){
			$ionicPopup.alert({
				title: 'Erro de login',
				template: 'Email ou senha incorretos'
			});
		})
	};
});

angular.module('starter')
.controller('MenuController', function($rootScope, $scope){

	$scope.usuarioLogado = $rootScope.usuario;	

});


angular.module('starter')
.controller('PerfilController', function($rootScope, $scope){

	$scope.usuarioLogado = $rootScope.usuario;	

});
