  $('a').click(function(){
  $('html, body').animate({
    scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top
  }, 500);
  return false;
});

$(document).ready(function () {
  $('.nav li a').click(function(e) {
    $('.nav li').removeClass('active');
    var $parent = $(this).parent();
    if (!$parent.hasClass('active')) {
      $parent.addClass('active');
    }
    e.preventDefault();
  });
});

$(document).ready(function(){
    $(this).scrollTop(0);
});

function transparentNavbar(){
  // this should attach transparent style to navbar
  document.querySelectorAll('nav')[0].style.background='transparent'
  document.querySelectorAll('nav li').forEach(function(el){
    if(el.className.indexOf('active') === -1 ){
      el.style.color='white';
      el.style.textShadow=0;
    }
  })

}


function solidNavbar(){
  // this should attach transparent style to navbar
  document.querySelectorAll('nav')[0].style.background='inherit'
  document.querySelectorAll('nav li').forEach(function(el){
    if(el.className.indexOf('active') === -1 ){
      console.log('im here')
      el.style.color='inherit';
    }
  })
}


function getYOffsetOfFirstAnchor(){
  console.log(document.querySelector('a[name=info]').offsetTop)
  return document.querySelector('a[name=info]').offsetTop
}


function testScroll(ev){
  if(window.pageYOffset >= getYOffsetOfFirstAnchor()) solidNavbar()
  else transparentNavbar()
}

//set event listeners

window.onscroll=testScroll
