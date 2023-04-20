import { trigger, transition, style, animate, state } from '@angular/animations';

export const moveFromRightToLeftAnimation = trigger('moveFromRightToLeft', [
  transition(':enter', [
    style({ transform: 'translateX(100%)' }),
    animate('1500ms', style({ transform: 'translateX(0)' }))
  ]),
  transition(':leave', [
    animate('1500ms', style({ transform: 'translateX(100%)' }))
  ])
]);

export const fadeInEffect = trigger('fadeIn', [
  state('void', style({ opacity: 0 })),
  transition(':enter', animate('0.5s', style({ opacity: 1 }))),
])