(function iife(){
    var app = angular.module("myChatApp");
    app.controller("chatController",['$scope','$rootScope','$timeout','socketFactory',firstCtrl]);
    function firstCtrl($scope, $rootScope,$setTimeout,socketFactory){
        var $this, timeout;
        $this = this;
        $this.chatMsg;  
        $this.msg;
        $this.isTyping;
        $this.chat = [];
        $this.typing = false;
        timeout = undefined;
        $this.getToday = function(){
            return new Date();
        }
        $this.sendMsg = function(chatMsg){
            var chatInfo = {
                message: chatMsg,
                username: $rootScope.username
            }
            addChatInfo(chatInfo);
            socketFactory.emit('new message',chatInfo);
            $this.chatMsg = '';
        }
        socketFactory.on('new message',function(data){
            console.log(data);
            addChatInfo(data.message);
        })
        function addChatInfo(chatInfo){
            $this.chat.push(chatInfo);
        }
        $this.userTyping = function(){
            if($this.typing == false) {
                $this.typing = true
                socketFactory.emit('typing',$rootScope.username);
                timeout = $setTimeout(timeoutFunction, 600);
              } 
        }
                
        function timeoutFunction(){
            socketFactory.emit('stop typing',false);
        }
        
        socketFactory.on('typing',function(data){
            $this.isTyping = data.username;
        })
        socketFactory.on('user left',function(data){
            for (i in $rootScope.onlineUsers){
                if(data.username === $rootScope.onlineUsers[i].username){
                    $rootScope.onlineUsers.splice(i,1);
                }
            }
        })
        
        socketFactory.on('stop typing',function (data){
            $this.isTyping = '';
            $this.typing = false;
        });
        socketFactory.on('disconnect',function(){
            console.log("You've been disconnected")
        })
        /* socket.on('users',function(data){
            console.log(data);
        }) */
    }
})();
