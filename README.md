#Tunez

A simple, lightweight jQuery plugin used to display songs recently scrobbled by a Last.fm user.

<strong>A Last.fm API key is required for this plugin. Click <a href="http://www.last.fm/api/account/create" target="_blank">here</a> to aquire one.</strong>

<a href="http://michael-lynch.github.io/tunez/" target="_blank">See a demo</a>

##Instructions

Include jQuery and the plugin in the head or footer of your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    
<script src="/js/plugins/tunez.js"></script>
```
    
Create an element with a class or ID that will display the recently scrobbled songs.

```html
<div id="tunez"></div>
```
    
Initialize the plugin targeting the class, ID or element. 

```js
$('#tunez').tunez();
```
	
<em>The plugin will replace the element with an ordered or unordered list with each scrobbled track and each detail will be wrapped in a span for you to style it however you wish.</em>

####Example Ouput:

```html
<ol>

	<li>
		<img src="http://last.fm" alt="ALbum Title" class="artwork">
		<span class="details">
			<span class="title"><a href="http://last.fm" target="_blank">Song Title</a></span>
			<span class="album">(Album Title)</span>
			<span class="artist"><a href="http://last.fm" target="_blank">Artist</a></span>
		</span>
	</li>

</ol>
```
	
####Options

<ol>

<li>
key: "api key"
<br />A string that defines your Last.fm API key (default: null).
</li>

<li>username: "username"
<br />A string that defines the user's Last.fm username (default: null). 
</li>

<li>limit: integer
<br />An integer that indicates the amount of scrobbled songs to display (default: 5).
</li>

<li>ordered: boolean
<br />A boolean value that indicates whether or not the list of songs should be ordered (default: true).
</li>

<li>href: true / false
<br />A boolean that indicates whether or not the song and artist should be links (default: true).
</li>

<li>album: true / false
<br />A boolean that indicates whether or not you want the album name shown (default: true).
</li>

<li>artwork: boolean
<br />A boolean to indicate whether or not the album artwork is displayed (default: true).
</li>

<li>success: function
<br />A callback function that runs after the data has been retrieved (default: function()).
</li>

<li>error: function
<br />A callback function that runs if there was an error retrieving the data (default: function()).
</li>

</ol>

#####Example:

```js
$(function() {

	$('#tunez').tunez({
		key: '1e2fbabb102c1fa0760379b9ef6f9ecc',
		username: 'michaelynch',
		limit: 10,
		ordered: false,
		href: false,
		album: false,
		artwork: false,
		success: function() {
			console.log('Rock and roll.')
		},
		error: function() {
			console.log('Without music, this is a mistake.');
		}
	});
	
});
```