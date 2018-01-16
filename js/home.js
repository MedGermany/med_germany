var youTubeIframeApi = "https://www.youtube.com/iframe_api";

function isLoadedScript(lib) {
    return document.querySelectorAll('[src="' + lib + '"]').length > 0
}

var onPlayerReady = function(event) {
	  event.target.stopVideo();
};

var playerOptions = {
	playerVars: {
		'controls': 1,
		'showinfo': 0,
		'rel': 0,
		'loop': 0,
		'autoplay': 0
	},
	events : {
		'onReady' : onPlayerReady
	}
};

jQuery(document).ready(function($){
  /*
  menu
  */
  $('.submenu-anchor').click(function(e){
    e.stopPropagation();
    $('.sub-menu').not($(this).next('.sub-menu')).hide();
    $(this).next('.sub-menu').toggle();
  });

  $('#main-menu').on('hide.bs.dropdown', function () {
    $('.sub-menu').hide();
  })

  /*
  carousel
  */
  $('#heroSlider').carousel({
    interval: 5000
  })

  $('.carousel-control-prev').click(function(){
    $('#heroSlider').carousel('prev');
  });
  $('.carousel-control-next').click(function(){
    $('#heroSlider').carousel('next');
  });

  /*
  collapsible section
  */
  var stepTwo = $('.step-two .collapse');

  stepTwo.on('hide.bs.collapse', function (e) {
    $('.step-three.collapse').collapse('hide')
  });

  //var scroll = new SmoothScroll({ speed: 5000 });

  stepTwo.on('show.bs.collapse', function (e) {
    
    //scroll.animateScroll( 550 );
    // Scroll certain amounts from current position 
    window.scrollBy({ 
      top: 530, // could be negative value
      left: 0, 
      behavior: 'smooth' 
    });

    stepTwo.not($(e.currentTarget)).collapse('hide')
  });

  var stepThree = $('.step-three.collapse');
  stepThree.on('show.bs.collapse', function (e) {
    //var scroll = new SmoothScroll({ speed: 5000 });
    //scroll.animateScroll( 550 );
    window.scrollBy({ 
      top: 300, // could be negative value
      left: 0, 
      behavior: 'smooth' 
    });

    stepThree.not($(e.currentTarget)).collapse('hide')
  });

  /*
  video
  */
	if( document.getElementById('video-9061-9062') ) {
		if(!isLoadedScript(youTubeIframeApi)) {
			var tag = document.createElement('script');
			tag.src = youTubeIframeApi;
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}
  }
  
	window.onYouTubePlayerAPIReady = function(){
    var allVideoContainers = $('.video-container');

		allVideoContainers.each(function() {
      let containerId = $(this).attr('id');
      let videoId = $(this).parent().data('embed');
      if(videoId) {
        playerOptions.videoId = videoId;
        new YT.Player(containerId, playerOptions);
      }
    });

    $('.play-button').click(function(){
      var playButton = $(this);
      var posterImg = playButton.siblings('img');

      var youtubeIframeId = playButton.next('iframe').attr('id');

      var player = YT.get(youtubeIframeId);
      player.playVideo();

      posterImg.hide();
      playButton.hide();
    });
  };
});