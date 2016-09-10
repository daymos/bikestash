(function transparentNavbar(){
  // this should attach transparent style to navbar
  document.querySelectorAll('nav')[0].style.background='transparent'
  document.querySelectorAll('nav li').forEach((el)=>{
    console.log(el.className)
    if(el.className.indexOf('active') === -1 ){
      console.log('im here')
      el.style.color='white';
      el.style.textShadow=0;
    }
  })

})()
