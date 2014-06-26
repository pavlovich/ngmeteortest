ngMeteor = angular.module('ngMeteor', []);

ngMeteor.config(['$interpolateProvider',
    function ($interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }
]);


var renderTemplateInContext = function(templateOrName, context) {
    var template = (typeof templateOrName === 'string') ? Template[templateOrName] : templateOrName;
    var div = document.createElement('div');
    var component = UI.renderWithData(template, context);
    UI.insert(component, div);
    return div.innerHTML;
};


var expandElement = function(element, attrs) {
    var template = Template['t1'];
    var context = {thing: 'hello kitty'};
    var result = renderTemplateInContext(template, context);
    element.replaceWith(result);
};

ngMeteor.directive('testdir', ['$compile', function ($compile) {
    return {
        restrict: 'E',
        scope: true,
        controller: ['$scope', function($scope){
            $scope.testvar = 'thing';
            $scope.$on("$destroy", function() {
                console.log('destroying ...');
            });
        }],
        compile: function compile(element, attrs) {
            expandElement(element, attrs);
        }
    };
}]);

angular.element(document).ready(function() {

    if (!angular.element(document).injector()){
        angular.bootstrap(document, ['ngMeteor']);
    }

    if(Package['iron-router']){
        var oldRun = Router.run;
        Router.run = function() {
            var runResult = oldRun.apply(this, arguments);
            var templateKey = this._currentController.route.options.template ? this._currentController.route.options.template : this._currentController.route.name;
            var oldRendered = Template[templateKey].rendered;
            Template[templateKey].rendered = function(){
                    angular.element(document).injector().invoke(
                        ['$compile', '$document', '$rootScope', function ($compile, $document, $rootScope) {
                            $compile($document)($rootScope);
                            $rootScope.$digest();
                        }]
                    );

                if(oldRendered && typeof oldRendered == 'function') {
                    oldRendered.apply(this, arguments);
                };
                Template[templateKey].rendered = oldRendered;
            };
            return runResult;
        };
    }
});
