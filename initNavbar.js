(function transparentNavbar(){
  // this should attach transparent style to navbar
  document.querySelectorAll('nav')[0].style.background='transparent'
  document.querySelectorAll('nav li').forEach(function(el){
    if(el.className.indexOf('active') === -1 ){
      el.style.color='white';
      el.style.textShadow='0px 0px 0 black';
    }
  })

})()
