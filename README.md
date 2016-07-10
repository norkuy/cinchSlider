# simpleSlide
A bare bones easy-to-use jQuery slider. It's currently under construction so it may be unstable.

## Setup

Include simpleSlide.css
```
<link rel="stylesheet" href="simpleSlide.css">
```
Include jQuery followed by simpleSlide.js
```
<script src='https://code.jquery.com/jquery-2.2.4.min.js'></script>
<script src="js/simpleSlide.js"></script>
```
## Include HTML Markup
```
<div class="slider">  
  <div class="slide">
    <img src="slideOne.jpg" alt="slide-img"/>
  </div>
  <div class="slide">
    <img src="slideTwo.jpg" alt="slide-img"/>
  </div>
  <div class="slide">
    <img src="slideThree.jpg" alt="slide-img"/>
  </div>
</div>
```


## Call simpleSlide

```
$(document).ready(function() {
  $('.slider').simpleSlide();
});
```

### Default Options

index: 0,
speed: 5000,
animation: fadeInOut









