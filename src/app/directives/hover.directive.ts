import { Directive, HostListener, HostBinding, EventEmitter } from '@angular/core';

@Directive({
    selector: '[hover]'
})
export class HoverDirective {

    @HostBinding('class.highlight') highlight : boolean = false;

    @HostListener('mouseenter')
    @HostListener('mousedown')
    highlightOn() {
        this.highlight = true;
    }

    @HostListener('mouseleave')
    @HostListener('mouseup')
    highlightOff() {
        this.highlight = false;
    }

    

    
}