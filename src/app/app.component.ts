import { Component, ElementRef, inject } from '@angular/core';
import { NgReact } from './ng-react';
import { App } from './reactComponent';

@Component({
  selector: 'app-root',
  template: ``
})
export class AppComponent {
  title = 'react-in-angular';
  private ngReact = inject(NgReact);
  private root = this.ngReact.createRoot(inject(ElementRef).nativeElement);

  ngOnInit() {
    this.ngReact.render(this.root, App)
  }

  ngOnDestroy() {
    this.root.unmount();
  }
}
