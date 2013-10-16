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
            method: 'recenttracks',
            limit: 5,
            ordered: true,
            href: true,
            album: true,
            artwork: true,
            success: function() {},
            error: function() {}
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
        
        //define api method
        var apiMethod;
        
        if(plugin.settings.method === 'recenttracks') {
        
	        apiMethod = 'user.getrecenttracks';
	        
        } else if(plugin.settings.method === 'weeklyartists') {
        
	        apiMethod = 'user.getweeklyartistchart';
	        
	    } else if(plugin.settings.method === 'weeklyalbums') {
        
	        apiMethod = 'user.getweeklyalbumchart';
	        
        }
        
        $.ajax({
        	type: 'GET',
	        url: 'http://ws.audioscrobbler.com/2.0/?method='+apiMethod+'&user='+plugin.settings.username+'&api_key='+plugin.settings.key+'&limit='+plugin.settings.limit+'&extended=1&format=json',
	        success: function(data) {
	        
	        	//RECENT TRACKS
	        	
		        	//if recenttracks isn't undefined
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
	
		        	
		        	}//if recenttracks
		        	
		        //WEEKLY ARTISTS
		        
		        	if(data.weeklyartistchart !== undefined) {
		        	
		        		//define tracks list
			        	var artistsList = $('<'+listType+' class="artists"></'+listType+'>').replaceAll(el);
			        	
			        	//for each artists
			        	for(i = 0; i < data.weeklyartistchart.artist.length; i++) {
			        	
			        		//append a list item with the artist details
			        		artistsList.append('<li><span class="artist">'+data.weeklyartistchart.artist[i].name+'</span><span class="playcount">('+data.weeklyartistchart.artist[i].playcount+' plays)</span></li>');
				        	
			        	}
			        	
			        	//if href is true
			        	if(plugin.settings.href === true) {
				        	
				        	//for each track
				        	artistsList.children('li').each(function(index) {
				        		
				        		//wrap the artist with an anchor using the artist url
				        		$(this).children('.artist').wrapInner('<a href="'+data.weeklyartistchart.artist[index].url+'" target="_blank">');
					        	
				        	});
				        	
			        	}
			        	
		        	}//if weeklyartistchart
		        	
		         //WEEKLY ALBUMS
		        
		        	if(data.weeklyalbumchart !== undefined) {
		        	
		        		//define tracks list
			        	var albumsList = $('<'+listType+' class="albums"></'+listType+'>').replaceAll(el);
			        	
			        	//for each artists
			        	for(i = 0; i < data.weeklyalbumchart.album.length; i++) {
			        	
			        		//append a list item with the artist details
			        		albumsList.append('<li><span class="artist">'+data.weeklyalbumchart.album[i].artist['#text']+'</span><span class="album">'+data.weeklyalbumchart.album[i].name+'</span><span class="playcount">('+data.weeklyalbumchart.album[i].playcount+' plays)</span></li>');
				        	
			        	}
			        	
			        	//if href is true
			        	if(plugin.settings.href === true) {
				        	
				        	//for each track
				        	albumsList.children('li').each(function(index) {
				        		
				        		//wrap the artist with an anchor using the artist url
				        		$(this).children('.artist').wrapInner('<a href="'+data.weeklyalbumchart.album[index].url+'" target="_blank">');
					        	
				        	});
				        	
			        	}
			        	
		        	}//if weeklyalbumchart
		        	
		        //SUCCESS CALLBACK
		        	
		        	//run success callback function
		        	plugin.settings.success.call(this);
		        
	        },//success
	        error: function() {
	        
	        	//run error callback function
	        	plugin.settings.error.call(this);
	        	
	        }//error
	        
        });//ajax

    }//tunez

})(jQuery);