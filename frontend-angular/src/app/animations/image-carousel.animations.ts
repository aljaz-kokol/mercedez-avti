import {
  style,
  animate,
  animation,
  keyframes
} from "@angular/animations";

export const fadeIn = animation([
  style({ opacity: 0.0 }), // Start state
  animate(300, style({ opacity: 1.0 }))
]);

export const fadeOut = animation([
  animate(300,style({ opacity: 0.0 }))
]);
