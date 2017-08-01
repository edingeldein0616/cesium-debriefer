import { Directive, HostListener, HostBinding, EventEmitter } from '@angular/core';

@Directive({
    selector: '[hover]'
})
export class HoverDirective {

    @HostBinding('class.highlight') highlight : boolean = false;

    @HostListener('mouseenter')
    highlightOn() {
        this.highlight = true;
    }

    @HostListener('mouseleave')
    highlightOff() {
        this.highlight = false;
    }
    
}