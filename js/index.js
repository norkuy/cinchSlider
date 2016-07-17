(function($) {



var cinchSlider = function(el, options) {
  var numSlides = $('.slide').toArray();
  el = $(el);
  
  var initials = {
    index: 0,
    speed: 5000,
    animation: 'fadeInOut'
  }


cinchSlider.prototype.coreStart = function() {
  el.addClass('carousel load');
  var height = $(numSlides[initials.index]).height(); 
  $('.carousel').css("height", height + "px");
  $('.carousel').append('<div class="arrow-left arrows"></div>');
  $('.carousel').append('<div class="arrow-right arrows"></div>');
  this.pause(false);

}

cinchSlider.prototype.isHovered = function() {

    $(document).on('mouseover', '.carousel', function(e) {
    console.log('hover');
    that.pause(true);
    });
    $(document).on('mouseout', '.carousel', function(e) {
    console.log('hover');
    that.pause(false);
    });  
}


cinchSlider.prototype.pause = function(hover) {
   clearInterval(this.rotator);
   if (hover === false) {
    this.rotator = setInterval(function() {that.animator(initials.animation, 'right', 'true')}, initials.speed);
    console.log(hover);
    } 
  $(document).on('click', '.carousel', function() {
     clearInterval(rotator);
  });
}

    
cinchSlider.prototype.slides = function(increment) {

    if (increment === 'plus') {
    initials.index++;  
    } else {
    initials.index--;  
    }
}
cinchSlider.prototype.zIndexSetup = function() {
     for (var i = 0; i <= numSlides.length; i++) {
      $(numSlides[i]).css("z-index", (numSlides.length - 1) - i);
    }

}

var that = this;
  
cinchSlider.prototype.liActive = function() {
    $('li').eq(initials.index).addClass('active');
    $('li').eq(initials.index).siblings().removeClass('active');
}

cinchSlider.prototype.animator = function(animation, direction, indicators) {
  switch(true) {
  case(animation === 'fadeInOut' && direction === undefined && indicators === 'false'):
      this.liActive();
      $(numSlides[initials.index]).addClass('fadeInOut active');
      $(numSlides[initials.index]).siblings().removeClass('fadeInOut');

    break;
  case(animation === 'fadeInOut' && direction === 'right' && initials.index < numSlides.length - 1):
        this.slides('plus');
        this.liActive();
        $(numSlides[initials.index]).addClass('fadeInOut active');
        $(numSlides[initials.index - 1]).removeClass('fadeInOut active');
        $(numSlides[initials.index]).siblings().removeClass('fadeInOut active');
        break;
  case(animation === 'fadeInOut' && direction === 'right' && initials.index === numSlides.length - 1):
        initials.index = 0;
        this.liActive();
        $(numSlides[initials.index]).addClass('fadeInOut active');
        $(numSlides[numSlides.length - 1]).removeClass('fadeInOut active');
        $(numSlides[initials.index]).siblings().removeClass('fadeInOut active');
        break;
  case(animation === 'fadeInOut' && direction === 'left' && initials.index > 0):
        $(numSlides[initials.index]).removeClass('fadeInOut active');
        this.slides('minus');
        this.liActive();
        $(numSlides[initials.index]).addClass('fadeInOut active');       
        $(numSlides[initials.index]).siblings().removeClass('fadeInOut active');
        break;
  case(animation === 'fadeInOut' && direction === 'left' && initials.index === 0):
        $(numSlides[0]).removeClass('fadeInOut active');
        initials.index = numSlides.length - 1;
        this.liActive();
        $(numSlides[initials.index]).addClass('fadeInOut active');
        $(numSlides[initials.index]).siblings().removeClass('fadeInOut active');
        break;
}

  // set carousel div height to current active slide height
  var height = $('.slide.active').height();
  $('.carousel').css("height", height + "px");

}

cinchSlider.prototype.changeSlide =  function(event) {

  that.animator(event.data.animation, event.data.direction);

}


cinchSlider.prototype.activate = function() {

  // 
  $(numSlides[initials.index]).addClass(initials.animation + ' active');  
  // when window resized set the slider height to current slide
  $(window).resize(function() {
  var height = $(numSlides[initials.index]).height(); 
  $('.carousel').css("height", height + "px");
  });
}

cinchSlider.prototype.indicators = function() {
  // append indicators div to slider
  var indicators = el.append('<div class="indicators"></div>').find('.indicators').append('<ul class="indicatorBullets"></ul>').find('.indicatorBullets');
  // setup indicators for each slide
  for (var i=0;i<numSlides.length;i++) {
    indicators.append('<li data-index=' + i + '></li>');
  }

  $('li').on('click', function() {
    var index = $(this).data('index');
    initials.index = index;
    that.animator(initials.animation, undefined, 'false');
  });

  $('li').eq(initials.index).addClass('active');
}
/*
function direction() {
  console.log($(this).data('index'));
if($(this).data('index') < initials.index) {
  initials.index = $(this).data('index'); 
  direction === 'left';
  } else {
  initials.index = $(this).data('index');
  direction === 'right';}
}
*/

cinchSlider.prototype.arrows = function() {
  // setup click events for arrows
  $(document).on('click', '.arrow-right',  {direction: 'right', animation: initials.animation}, this.changeSlide);
  $(document).on('click', '.arrow-left', {direction: 'left', animation: initials.animation}, this.changeSlide);
}
cinchSlider.prototype.init = function() {
    
    this.zIndexSetup();
    this.arrows();
  
  $(window).bind("load", function() {
    // add slider container, set slider container height to slide height, add arrows
    that.coreStart();
    // add animation and active class to first slide
    that.activate();
    // add slide indicators for each slide
    that.indicators();
    that.isHovered();
    $('.carousel.load').css('visibility', 'visible');
  });
  
}

cinchSlider.prototype.init();
}



$.fn.cinchSlider = function(options) {
  return this.each(function(index, el) {
    el.cinchSlider = new cinchSlider(el, options);
  });
}

}(jQuery));

