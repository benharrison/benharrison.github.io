window.streetball = (function(){
    // private members
    var player1,
        player2,
        draftedby = [{},{}],
        draftees = [{},{}],
        chartTemplate,
        _isLoading = false;
        
    var loadPlayers = function(callback)
    {
        var resultsCount = 0;
        // player 1
        $.jribbble.getPlayerById( $('#player_one_id').val(), function(data){
            resultsCount++;
            player1 = new Player(data);
            log('player1', data);
            
            // player1 drafted by
            $.jribbble.getPlayerById( data.drafted_by_player_id, function(dat2){
                resultsCount++;
                //log('player1 drafted by', dat2);
                draftedby[0] = dat2;
                if (resultsCount === 6 && typeof(callback) === 'function')
                    { callback(); }
            });
        });
        $.jribbble.getPlayerDraftees($('#player_one_id').val(), function(data){
            resultsCount++;
            draftees[0] = data;
            //log('p1 draftees', data);
            if (resultsCount === 6 && typeof(callback) === 'function')
                { callback(); }
        });
        
        
        // player 2
        $.jribbble.getPlayerById( $('#player_two_id').val(), function(data){
            resultsCount++;
            player2 = new Player(data);
            log('player2', data);
            
            // player2 drafted by
            $.jribbble.getPlayerById( data.drafted_by_player_id, function(dat2){
                resultsCount++;
                //log('player2 drafted by', dat2);
                draftedby[1] = dat2;
                if (resultsCount === 6 && typeof(callback) === 'function')
                    { callback(); }
            });
        });
        $.jribbble.getPlayerDraftees($('#player_two_id').val(), function(data){
            resultsCount++;
            //log('p2 draftees', data);
            draftees[1] = data;
            if (resultsCount === 6 && typeof(callback) === 'function')
                { callback(); }
        });
    }
    
    var clearUI = function()
    {
        $('#player_charts').html('').hide();
    }
    
    var displayPlayers = function()
    {
        $('.player_card').show();
        
        var displayPlayer = function(playerNumber)
        {
            var playerIndex = playerNumber - 1;
            var OneOrTwo = playerNumber === 1 ? 'one' : 'two';
            var p = playerNumber === 1 ? player1 : player2;
            var slug;
            
            $('#player_' + OneOrTwo).find('img').attr('src', p.avatar_url);
            $('#player_' + OneOrTwo).find('h3').html(p.name);
            $('#player_' + OneOrTwo).find('.location').html(p.location);
            
            // drafted by
            var $ul = $('#player_' + OneOrTwo).find('ul').html('');
            slug = draftedby[playerIndex].url.substring(20);
            $ul.append('<li><span>Drafted by:</span></li>');
            $ul.append('<li><a href="#" data-slug="' + slug + '">' + draftedby[playerIndex].name + '</a></li>');
            
            // draftees
            $ul.append('<li><hr /></li><li><span>Draftees:</span></li>');
            for (var i = 0; i < draftees[playerIndex].players.length; i++)
            {
                slug = draftees[playerIndex].players[i].url.substring(20);
                $ul.append('<li><a href="#" data-slug="' + slug + '">' + draftees[playerIndex].players[i].name + '</a></li>');
            }
        }
        
        displayPlayer(1);
        displayPlayer(2);
    }
    
    var playGame = function()
    {
        clearUI();
        
        var p1id = $('#player_one_id').val().toLowerCase();
        var p2id = $('#player_two_id').val().toLowerCase();
        if (p1id !== '' && p2id !== '')
        {
            location.hash = streetball.hash = '#' + p1id + '-vs-' + p2id;
            
            _isLoading = true;        
            loadPlayers(function(){
                displayPlayers();
                
                $('#player_charts').show();
                drawChart('seasons', 'Current Season', "This is the number of years registered, rounded up. So if you just signed up you're in season 1.");
                drawChart('shots', 'Shots', "");
                drawChart('followers', 'Followers', "");
                drawChart('following', 'Following', "");
                drawChart('comments_received', 'Comments Received', "");
                drawChart('comments_made', 'Comments Made', "");
                drawChart('draftees', 'Draftees', "");
                
                setTimeout(function() { _isLoading = false; }, 500);
            });
        }
    }
    
    var drawChart = function(value, dataName, dataDescription)
    {
        var total = player1[value] + player2[value];
        
        var view = {
            name : dataName,
            p1Value : player1[value],
            p2Value : player2[value],
            p1Percent : (player1[value] / total) * 100,
            p2Percent : (player2[value] / total) * 100,
        }

        //log('chart data', view);
        
        $('#player_charts').append(Mustache.render(chartTemplate, view));
    }
    
    // document ready
    $(document).ready(function(){
        // background image
        $.backstretch('images/background.jpg');
        
        // hash change
        $(window).hashchange(function(){
            if (!streetball.IsLoading)
            {
                if (location.hash != streetball.hash)
                {
                    var playerIds = location.hash.replace('#','').toLowerCase(); //.split['-vs-'];
                    if (playerIds.indexOf('-vs-') > 0)
                    {
                        log(streetball.hash, location.hash);
                        streetball.hash = location.hash;
                        
                        playerIds = playerIds.split('-vs-');
                        $('#player_one_id').val(playerIds[0]);
                        $('#player_two_id').val(playerIds[1]);
                            
                        playGame();
                    }
                }
            }
        });
        $(window).hashchange();
        
        // initiate game play
        $('#player_one_id, #player_two_id').bind('keypress', function(e){
            if (e.which === 13) {
                playGame();
            }
        });
        $('#play_button').bind('click', function(){
            playGame();
        });
        
        //
        chartTemplate = $('#chart_template').html();
        
        // substitute players
        $('.dropdown-menu a').live('click', function(){
            var $dropdown = $(this).parents('.dropdown-menu');
            var playerNumber = parseInt($dropdown[0].id.replace('dropdown-', ''), 10);
            streetball.substitutePlayer(playerNumber, $(this).data('slug'));
            return false;
        });
    });
    
    // public members
    return {
        IsLoading : _isLoading,
        hash : '',
        substitutePlayer : function(playerNumber, subPlayerId)
        {
            var OneOrTwo = playerNumber === 1 ? 'one' : 'two';
            $('#player_' + OneOrTwo + '_id').val(subPlayerId);
            playGame();
        }
    }
})();

// player object
window.Player = function(data) {
    //log('new Player', data);
    
    this.avatar_url = data.avatar_url;
    this.shots = data.shots_count;
    this.followers = data.followers_count;
    this.following = data.following_count;
    this.name = data.name;
    this.comments_received = data.comments_received_count;
    this.comments_made = data.comments_count;
    this.draftees = data.draftees_count;
    this.url = data.url;
    this.location = data.location;
    
    // seasons
    var years = 365.25 * 24 * 60 * 60 * 1000;
    this.seasons = Math.ceil((new Date() - new Date(data.created_at)) / years);
    
}
    
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};