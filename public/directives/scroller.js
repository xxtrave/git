(function iife() {
    var app = angular.module("myChatApp");
    app.directive('scrollBottom', function ($timeout) {
        return {
            scope: {
                scrollBottom: "="
            },
            link: function (scope, element) {
                scope.$watchCollection('scrollBottom', function (newValue) {
                    if (newValue) {
                        $timeout(function () {
                            element[0].parentElement.scrollTop = element[0].parentElement.scrollHeight;
                        });
                    }
                });
            }
        }
    })
    app.directive('sendEnter', function(){
        return {
            controller:"chatController",
            link:function (scope, element, attrs) {
                element.bind("keydown keypress", function (e) {
                   if (element.val() && (e.keyCode == 13 && !e.shiftKey)){
                       scope.$apply(function() {
                           // Evaluate the expression
                           scope.$eval(attrs.sendEnter);
                       });
   
                       e.preventDefault();
                    }
                });
            }
        };
    })
})();