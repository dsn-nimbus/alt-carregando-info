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

      this.exibe = function() {
          $rootScope.$broadcast(AltCarregandoInfo.EVENTO_CARREGANDO_INFO);
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
                       </div>';

      var _restrict = 'A';
      var _replace = true;

    var _link = function(scope, element, attrs) {
        $rootScope.$on(AltCarregandoInfo.EVENTO_CARREGANDO_INFO, function() {
          element.removeClass('hidden');
        });

        $rootScope.$on(AltCarregandoInfo.EVENTO_ESCONDER_CARREGANDO_INFO, function() {
          element.addClass('hidden');
        });
    };

    return {
      restrict: _restrict,
      replace: _replace,
      template: _template,
      link: _link
    };
  }]);
}());
