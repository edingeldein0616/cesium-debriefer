import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive ({
    selector: '[color-on-click]'
})
export class ColorOnClickDirective {

    isColored = false;

    @HostBinding('class.colored')
    get colored() : boolean {
        return this.isColored;
    }

    @HostListener('click')
    onClick() {
        this.isColored = true;
    }

    @HostListener('unclick')
    unClick() {
        if(this.isColored) {
            this.isColored = false;
        }
    }

}