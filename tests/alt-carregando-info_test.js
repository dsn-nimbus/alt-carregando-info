describe('Directive: altCarregandoInfoDirective', function () {

  var _rootScope, _scope, _element, _compile, _AltCarregandoInfoService, _AltCarregandoInfo;
  var EVENTO_EXIBICAO_LOADING = 'alt.carregando.info';
  var EVENTO_ESCONDER_EXIBICAO_LOADING = 'alt.esconder.carregando.info';

  beforeEach(module('alt.carregando-info'));

  beforeEach(inject(function($injector) {
    _rootScope = $injector.get('$rootScope');
    _scope = _rootScope.$new();
    _compile = $injector.get('$compile');
    _AltCarregandoInfo = $injector.get('AltCarregandoInfo');
    _AltCarregandoInfoService = $injector.get('AltCarregandoInfoService');

    spyOn(_rootScope, '$broadcast').and.callThrough();

    var _html = '<div alt-carregando-info></div>';

    _element = angular.element(_html);
    _compile(_element)(_scope);

    _scope.$digest();
  }));

  describe('constante', function() {
    it('deve ter as constantes de evento setadas corretamente', function() {
        expect(_AltCarregandoInfo.EVENTO_CARREGANDO_INFO).toEqual('alt.carregando.info');
        expect(_AltCarregandoInfo.EVENTO_ESCONDER_CARREGANDO_INFO).toEqual('alt.esconder.carregando.info');
    });
  });

  describe('diretiva', function() {
      describe('criação', function() {
        it('deve ter a diretiva acessível', function() {
          expect(_element).toBeDefined();
        });
      });

    describe('exibição do modal', function() {
      it('deve chamar o service com os parâmetros corretos', function() {
        _rootScope.$broadcast(EVENTO_EXIBICAO_LOADING);

        expect(_element.hasClass('hidden')).toBeFalsy();
      });

      it('deve chamar o service com os parâmetros corretos quando for passado um parâmetro na função', function(){
        var obj = {msg: "String de teste"};
        _rootScope.$broadcast(EVENTO_EXIBICAO_LOADING, obj);

        expect(_element.hasClass('hidden')).toBeFalsy();
        expect(_element.isolateScope().temMensagem).toBe(true);
        expect(_element.isolateScope().mensagem).toEqual(obj.msg);
      });

      it('quando o parametro passado na função não for um objeto, o escopo deve ser limpo', function(){
        var obj = "String de teste";
        _rootScope.$broadcast(EVENTO_EXIBICAO_LOADING, obj);

        expect(_element.hasClass('hidden')).toBeFalsy();
        expect(_element.isolateScope().temMensagem).toBe(false);
        expect(_element.isolateScope().mensagem).toEqual("");
      });

      it('quando o parametro passado na função não tiver a propriedade msg, o escopo deve ser limpo', function(){
        var obj = {mensagem: "String de teste"};
        _rootScope.$broadcast(EVENTO_EXIBICAO_LOADING, obj);

        expect(_element.hasClass('hidden')).toBeFalsy();
        expect(_element.isolateScope().temMensagem).toBe(false);
        expect(_element.isolateScope().mensagem).toEqual("");
      });

      it('quando o parametro passado na função for uma string vazia, o escopo deve ser limpo', function(){
        var obj = {msg: ""};
        _rootScope.$broadcast(EVENTO_EXIBICAO_LOADING, obj);

        expect(_element.hasClass('hidden')).toBeFalsy();
        expect(_element.isolateScope().temMensagem).toBe(false);
        expect(_element.isolateScope().mensagem).toEqual("");
      });
    });

    describe('esconde do modal', function() {
      it('deve chamar o service com os parâmetros corretos', function() {
        _rootScope.$broadcast(EVENTO_ESCONDER_EXIBICAO_LOADING);

        expect(_element.hasClass('hidden')).toBeTruthy();
      });
    });
  })

  describe('service', function() {
      it('deve chamar o evento correto de exibição', function() {
          _AltCarregandoInfoService.exibe();

          expect(_rootScope.$broadcast).toHaveBeenCalledWith(EVENTO_EXIBICAO_LOADING, undefined);
      })

      it('deve chamar o evento correto de exibição levando o parametro passado', function(){
        var obj = {msg: "String de teste"};
        _AltCarregandoInfoService.exibe(obj);

        expect(_rootScope.$broadcast).toHaveBeenCalledWith(EVENTO_EXIBICAO_LOADING, obj);
      })

      it('deve chamar o evento correto de exibição', function() {
          _AltCarregandoInfoService.esconde();

          expect(_rootScope.$broadcast).toHaveBeenCalledWith(EVENTO_ESCONDER_EXIBICAO_LOADING);
      })
  });
});
