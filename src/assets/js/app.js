$(document).ready(function(){

  // $('.galry a').simpleLightbox();



});




$(function() {
    $('a[href*="#"]:not([href="#"])').click(function() {
      mobMenu.hideMenu();
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
});

//Parallax Effect
$(window).scroll(function(){
    $('.parallax').each(function(){
        if ($(this).offset().top < $(window).scrollTop()) {
        var difference = $(window).scrollTop() - $(this).offset().top;
        var half = (difference / 2) + 'px',
        transform = 'translate3d( 0, ' + half + ',0)';
        $(this).find('img').css('transform', transform);
    } else {
        $(this).find('img').css('transform', 'translate3d(0,0,0)');
    }
    });

});


//Form Validation
var validateForm = (function(){
    var email, mobile, flag;
    email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    mobile = /^\d+$/;
    flag = 0;
    return {
        emptyValid: function(ths){
            if(ths.value == ""){
                $(ths).addClass("is-invalid");
                flag = 0;
            }else if(ths.value.length < ths.minLength){
                $(ths).addClass("is-invalid");
                flag = 0;
            }else{
                $(ths).removeClass("is-invalid");
                flag = 1;
            }
        },
        emailValid: function(ths){
            if( !email.test(ths.value) ){
                $(ths).addClass("is-invalid");
                flag = 0;
            }else{
                $(ths).removeClass("is-invalid");
                flag = 1;
            }
        },
        mobileValid: function(ths){
            if( !mobile.test(ths.value) ){
                $(ths).addClass("is-invalid");
                flag = 0;
            }else if(ths.value.length < ths.minLength){
                $(ths).addClass("is-invalid");
                flag = 0;
            }else{
                $(ths).removeClass("is-invalid");
                flag = 1;
            }
        },
        formValid: function(ths){
            if(flag == 0){
                $(ths).find(".alert").removeClass('hide').addClass('show');
                setTimeout(function(){ $(ths).find(".alert").removeClass('show').addClass('hide'); }, 3000);
                return false;
            }else{
                $(ths).find(".alert").removeClass('show').addClass('hide');
                return true;
            }
        }
    }
})();

//Hamburger Menu for Mobile
var mobMenu = (function(){
    var navSelector = $(".nav");
    return {
        showMenu: function(){
            navSelector.animate({right: '0'});
        },
        hideMenu: function(){
            navSelector.animate({right: '-220px'});
        }
    };
})();
$(".hamburger").on('click',mobMenu.showMenu);
$(".mobileClose").on('click',mobMenu.hideMenu);

