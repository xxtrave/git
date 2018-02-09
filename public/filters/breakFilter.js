(function iife(){
    var app = angular.module("myChatApp");
    app.filter('textbreakFilter', function () {
        return function (text) {
            if (text !== undefined) return text.replace(/\n/g, '<br />');
        };
    });
})()