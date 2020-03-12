import { Component, OnInit} from '@angular/core';

declare let $:any;

@Component({
    selector:'app-header',
    templateUrl:'header.component.html',
    styleUrls:['header.component.css']
})

export class HeaderComponent implements OnInit {

    constructor(){

    }

    ngOnInit(){
        this.hamburgerMobileMenu();
    }


    private hamburgerMobileMenu():void{
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

    }
}