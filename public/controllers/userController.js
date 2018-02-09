(function iife(){
    var app = angular.module("myChatApp");
    app.controller("loginCtrl",['$scope','$rootScope','$location','$cookies','$timeout','socketFactory',loginCtrl]);
    function loginCtrl($scope,$rootScope,$location,$cookies,$timeout,socketFactory){
        var $this = this;
        $this.username = undefined;
        $rootScope.onlineUsers=[];
        function userJoined(username){
            socketFactory.emit('addUser', username);
            socketFactory.on('user joined',function(message){
                console.log(message)
                //$rootScope.onlineUsers = JSON.parse(message);
                //$rootScope.$apply();
                console.log($rootScope.onlineUsers)
            })
        }
        if(sessionStorage.username){
            $location.path('/chat') ;
            $this.username = JSON.parse(sessionStorage.username);
            console.log( $this.username);
            $rootScope.username = $this.username;
            userJoined($rootScope.username);
        }
        else{
            $this.login = function(userName){
                $this.username = userName;
                sessionStorage.username = JSON.stringify($this.username);
                $location.path('/chat')  
                socketFactory.emit('new-user', $this.username);
                $rootScope.username = $this.username;
            }
        }
    }
})();