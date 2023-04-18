import { trigger, transition, style, animate } from '@angular/animations';

export const moveFromRightToLeftAnimation = trigger('moveFromRightToLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('1500ms', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('1500ms', style({ transform: 'translateX(100%)' }))
  ])
]);