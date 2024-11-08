import { Component } from '@angular/core';

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-loading',
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  imports: [ NzSpinModule, NzFlexModule ]
})

export class LoadingComponent {
}