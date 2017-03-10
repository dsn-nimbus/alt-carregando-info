;(function() {
  "use strict";

  angular
    .module('alt.carregando-info', [])
    .constant('AltCarregandoInfo', {
      EVENTO_CARREGANDO_INFO: 'alt.carregando.info',
      EVENTO_ESCONDER_CARREGANDO_INFO: 'alt.esconder.carregando.info'
    })
    .service('AltCarregandoInfoService', ['$rootScope', 'AltCarregandoInfo', function($rootScope, AltCarregandoInfo) {
      // sempre usar o service para chamada de bloqueio de tela
      // facilita o entendimento das chamadas e os mocks na hora dos testes

      this.exibe = function(obj) {
        $rootScope.$broadcast(AltCarregandoInfo.EVENTO_CARREGANDO_INFO, obj);
      };

      this.esconde = function() {
        $rootScope.$broadcast(AltCarregandoInfo.EVENTO_ESCONDER_CARREGANDO_INFO);
      };
    }])
    .directive('altCarregandoInfo', ['$rootScope', 'AltCarregandoInfo', function($rootScope, AltCarregandoInfo) {
      var _template = '<div id="alt-carregando-info-container" class="hidden">\
                          <div id="alt-carregando-info-coberta"></div>\
                          <div id="alt-carregando-info-aviso">\
                            <p class="fa fa-fw fa-refresh fa-spin"></p>\
                          </div>\
                          <div id="alt-carregando-info-mensagem" ng-if="temMensagem">\
                            <span ng-bind="mensagem"></span>\
                          </div>\
                       </div>';

      var _restrict = 'A';
      var _replace = true;

      var _limpaEscopo = function(escopo) {
        escopo.temMensagem = false;
        escopo.mensagem = "";
      };

      var _link = function(scope, element, attrs) {
        _limpaEscopo(scope);

        $rootScope.$on(AltCarregandoInfo.EVENTO_CARREGANDO_INFO, function(event, obj) {
          _limpaEscopo(scope);

          if(angular.isObject(obj) && obj.msg && obj.msg.length){
            scope.temMensagem = !!obj.msg;
            scope.mensagem = obj.msg;
          }

          element.removeClass('hidden');
        });

        $rootScope.$on(AltCarregandoInfo.EVENTO_ESCONDER_CARREGANDO_INFO, function() {
          element.addClass('hidden');
        });
    };

    return {
      scope: {},
      restrict: _restrict,
      replace: _replace,
      template: _template,
      link: _link
    };
  }]);
}());
