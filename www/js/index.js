/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {   
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        $( '#newgame' ).bind( "click", function() {
            newGame();
        }); 
        
        newGame();
    }
    
};

var word, showWord, wrongCnt, lives;

function newGame() {
    var alphabets = 'abcdefghijklmnopqrstuvwxyz'.split('');
    var words = ['policeman', 'tobacco', 'university', 'neighborhood', 'explanation', 'accident', 'understand']; 

    wrongCnt = 0, lives = 6;
    
    $('#hangmanimg').attr('src', 'img/0.png');
    $('#letters').controlgroup("container").empty();
    
    var nr = Math.floor(Math.random() * words.length);
    word = words[nr];     

    showWord = '';
    for (var i = 0; i < word.length; i++) {
        showWord += '_ ';
    }

    $('#guessword').val(showWord);
    $('#end').html('<b>Lives: </b>' + lives);

    // Create alphabet buttons and bind listeners
    for (var i = 0; i < alphabets.length; i++) {
        $('#letters').controlgroup("container").append('<Button class="ui-btn ui-enabled" id=' + alphabets[i] + '>' + alphabets[i] + '</Button>');

        $( '#' + alphabets[i] ).bind( "click", function() {
            console.log( "Handler for .click() called." + $(this).attr('id') ); 
            $(this).addClass('ui-disabled'); 
            
            checkGuess($(this).attr('id'));
        });            
    }

    $( '#letters' ).controlgroup({
        mini: true
    });

    $("#letters").enhanceWithin().controlgroup("refresh");     
}

// Check guess and game status
function checkGuess(letter) {
    var found = false;
    for (var i = 0; i < word.length; i++) {
        console.log(word.toUpperCase().charAt(i) + " : " + letter.toUpperCase());
        if (word.toUpperCase().charAt(i) == letter.toUpperCase()) {
            showWord = showWord.substr(0, 2*i) + letter.toUpperCase() + showWord.substr(2*i + 1); 
            found = true;
        }
    }
    
    $('#guessword').val(showWord);
    
    if (!found) { // Wrong guess
        wrongCnt++;
        lives--;
        if (wrongCnt < 6) {
            $('#hangmanimg').attr('src', 'img/' + wrongCnt + '.png');
            $('#end').html('<b>Lives: </b>' + lives);            
        }
        else {
            $('#hangmanimg').attr('src', 'img/6.png');    
            showWord = word.toUpperCase();
            $('#end').html('<b>You Lost!</b>');
        }
    }
    else { // Right guess
        if (showWord.indexOf('_') == -1) {
            $('#end').html('<b>You Won!</b>');
        }
    }
}