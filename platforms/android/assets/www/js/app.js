/* CODE BY @GUSTAVOCOSTAW */

var app = angular.module('myApp', ['ngRoute']).config(
    function($routeProvider) {
        /*ROTAS*/
        $routeProvider
            .when('/oficinas', {
                templateUrl: 'templates/oficinas.html',
                controller: 'Oficinas'
            })
            .when('/vistorias', {
                templateUrl: 'templates/vistorias.html',
                controller: 'Vistorias'
            })
            .when('/vistoria/:id', {
                templateUrl: 'templates/vistoria.html',
                controller: 'Vistoria'
            })
            .when('/oficina/:id', {
                templateUrl: 'templates/oficina.html',
                controller: 'Oficina'
            })
            .otherwise({
                redirectTo: '/vistorias'
            });

    }).run(function() {
    //remove 300ms delay touch
    FastClick.attach(document.body);
});

/* CONTROLLERS */
app.controller('Speakers', function($scope, $routeParams, Speakers) {

    $scope.speakers = {};

    //factory obter speakers
    Speakers.getSpeakers(function(data) {
        $scope.speakers = data;
    });

});
app.controller('Vistorias', function($scope, $routeParams, Vistorias) {

    $scope.vistorias = {};

    //factory obter speakers
    Vistorias.getVistoria(function(data) {
        $scope.vistorias = data;
    });

});
app.controller('Vistoria', function($scope, $filter, $routeParams, $window, Vistorias) {

    var myfilter = $filter;
    Vistorias.getVistoria(function(data) {
        //filter passando data me retornar o objeto no json com o id da rota
        $scope.vistoria = myfilter('filter')(data, {
            id: $routeParams.id
        })[0];
    });

    //função do botão chamado pelo ng-click para voltar no navegador.
    $scope.backApp = function() {
        $window.history.back();
    }
});
app.controller('Oficina', function($scope, $filter, $routeParams, $window, Oficinas) {

    var myfilter = $filter;
    Oficinas.getOficina(function(data) {
        //filter passando data me retornar o objeto no json com o id da rota
        $scope.oficina = myfilter('filter')(data, {
            id: $routeParams.id
        })[0];
    });

    //função do botão chamado pelo ng-click para voltar no navegador.
    $scope.backApp = function() {
        $window.history.back();
    }
});
app.controller('Speaker', function($scope, $filter, $routeParams, $window, Speakers) {

    var myfilter = $filter;
    Speakers.getSpeakers(function(data) {
        //filter passando data me retornar o objeto no json com o id da rota
        $scope.speaker = myfilter('filter')(data, {
            id: $routeParams.id
        })[0];
    });

    //função do botão chamado pelo ng-click para voltar no navegador.
    $scope.backApp = function() {
        $window.history.back();
    }
});
app.controller('Agenda', function($scope, Agenda) {

    $scope.agenda = {};

    //factory obter agenda
    Agenda.getAgenda(function(data) {
        $scope.agenda = data;
    });

});
app.controller('Oficinas', function($scope, Oficinas) {

    $scope.oficinas = {};

    //factory obter agenda
    Oficinas.getOficina(function(data) {
        $scope.oficinas = data;
    });

});
/*FACTORYS*/
app.factory('Agenda', function($http) {
    var agendaList;
    var obj = {};

    obj = {
        getAgenda: function(callback) {
            //se já tiver os dados retornar
            if (agendaList) {
                callback(agendaList);
                return false;
            } else {
                
                $http({
                    method: 'GET',
                    url: 'data/agenda.json'
                }).success(function(data) {
                    // erros
                    obj.saveAgenda(data);
                    callback(data);

                }).
                error(function() {
                    //error
                });
            }
        },
        saveAgenda: function(data) {
            agendaList = data;
        }
    }

    return obj;
})

app.factory('Oficinas', function($http) {
    var oficinaList;
    var obj = {};

    obj = {
        getOficina: function(callback) {
            //se já tiver os dados retornar
            if (oficinaList) {
                callback(oficinaList);
                return false;
            } else {
                
                $http({
                    method: 'GET',
                    url: 'data/oficina.json'
                }).success(function(data) {
                    // erros
                    obj.saveOficina(data);
                    callback(data);

                }).
                error(function() {
                    //error
                });
            }
        },
        saveOficina: function(data) {
            oficinaList = data;
        }
    }

    return obj;
})
app.factory('Vistorias', function($http) {
    var vistoriaList;
    var obj = {};

    obj = {
        getVistoria: function(callback) {
            //se já tiver os dados retornar
            if (vistoriaList) {
                callback(vistoriaList);
                return false;
            } else {
                
                $http({
                    method: 'GET',
                    url: 'data/vistorias.json'
                }).success(function(data) {
                    // erros
                    obj.saveVistoria(data);
                    callback(data);

                }).
                error(function() {
                    //error
                });
            }
        },
        saveVistoria: function(data) {
            vistoriaList = data;
        }
    }

    return obj;
})
/* FACTORYS */
app.factory('Speakers', function($http) {
        var speakerList;
        var obj = {};

        obj = {
            getSpeakers: function(callback) {
                if (speakerList) {
                    callback(speakerList);
                    return false;
                } else {

                $http({
                    method: 'GET',
                    url: 'data/speakers.json'
                }).success(function(data) {
                    // erros
                    obj.saveSpeakers(data);
                    callback(data);

                }).
                error(function() {
                    //error
                });
            }
        },
        saveSpeakers: function(data) {
            speakerList = data;
        }
    }

    return obj;
});