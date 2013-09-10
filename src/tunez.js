/*!

Name: Tunez
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: September 10, 2013
Licensed under the MIT license

*/

;(function($) {

    $.fn.tunez = function(options) {
    
    	//return if no element was bound
		//so chained events can continue
		if(!this.length) { 
			return this; 
		}

		//define default parameters
        var defaults = {
            key: null,
            username: null,
            limit: 5,
            ordered: true,
            href: true,
            album: true,
            artwork: true
        }

        //define plugin
        var plugin = this;

        //define element
        var el = $(this);

        //define settings
        plugin.settings = {}
 
        //merge defaults and options
        plugin.settings = $.extend({}, defaults, options);
        
        //api key error
        if(plugin.settings.key === null) {
	        alert('A Last.fm API key is required');
	        return false;
        }
        
        //username error
        if(plugin.settings.key === null) {
	        alert('A Last.fm username is required');
	        return false;
        }
        
       //define list type
        var listType = (plugin.settings.ordered === true) ? 'ol' : 'ul';
        
        $.ajax({
        	type: 'GET',
	        url: 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user='+plugin.settings.username+'&api_key='+plugin.settings.key+'&limit='+plugin.settings.limit+'&extended=1&format=json',
	        dataType: 'jsonp',
	        success: function(data) {
	        
	        	console.log(data);
	        	
	        	//if recentracks isn't undefined
	        	if(data.recenttracks !== undefined) {
	        	
		        	//define tracks list
		        	var tracksList = $('<'+listType+' class="tracks"></'+listType+'>').replaceAll(el);
		        	
		        	//for each track
		        	for(i = 0; i < data.recenttracks.track.length; i++) {
		        	
		        		//append a list item with the track details
		        		tracksList.append('<li><span class="details"><span class="title">'+data.recenttracks.track[i].name+'</span><span class="artist">'+data.recenttracks.track[i].artist.name+'</span></span></li>');
			        	
		        	}
		        	
		        	//if href is true
		        	if(plugin.settings.href === true) {
			        	
			        	//for each track
			        	tracksList.children('li').each(function(index) {
		        	
			        		//wrap the title with an anchor using the url
			        		$(this).children('.details').children('.title').wrapInner('<a href="'+data.recenttracks.track[index].url+'" target="_blank">');
			        		
			        		//wrap the artist with an anchor using the artist url
			        		$(this).children('.details').children('.artist').wrapInner('<a href="http://last.fm/music/'+data.recenttracks.track[index].artist.url+'" target="_blank">');
				        	
			        	});
			        	
		        	}
		        	
		        	//if album is true
		        	if(plugin.settings.album === true) {
		        	
		        		//for each track
			        	tracksList.children('li').each(function(index) {
		        	
			        		//append the album to the title
			        		$(this).children('.details').children('.title').after('<span class="album">('+data.recenttracks.track[index].album['#text']+')</span>');
				        	
			        	});
		        	
		        	}
		        	
		        	//if artwork is true
		        	if(plugin.settings.artwork === true) {
		        	
		        		//for each track
			        	tracksList.children('li').each(function(index) {
		        	
			        		//append the album to the title
			        		$(this).prepend('<img src="'+data.recenttracks.track[index].image[3]['#text']+'" alt="'+data.recenttracks.track[index].album['#text']+'" class="artwork" />');
				        	
			        	});
		        	
		        	}
	        	
	        	} else {
		        	
		        	//alert error
		        	alert(data.message);
		        	
	        	}
		        
	        }
	        
        });

    }

})(jQuery);