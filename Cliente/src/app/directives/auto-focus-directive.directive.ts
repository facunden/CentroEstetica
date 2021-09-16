import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutoFocusDirective]'
})
export class AutoFocusDirectiveDirective {
  @Input() public appAutoFocus: boolean;

  constructor(private el: ElementRef) { }

  public ngAfterContentInit(){
    setTimeout(() => {
      this.el.nativeElement.focus();
    },200)
  }

}
