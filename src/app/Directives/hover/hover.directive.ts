import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hInvHover]'
})
export class HoverDirective implements OnInit {
 borderColor:string='blue'
  constructor(private element:ElementRef , private renderer:Renderer2) { }


  ngOnInit(): void {
    // this.element.nativeElement.style.border=`4px solid ${this.borderColor}`;
  }

  @HostListener('focus') onMouseEnter(){
    this.renderer.setStyle(this.element.nativeElement,'border',`4px solid ${this.borderColor}`);
  }

  @HostListener('blur') onMouseLeave(){
    this.renderer.setStyle(this.element.nativeElement,'borderColor',`white`)
  }
}
