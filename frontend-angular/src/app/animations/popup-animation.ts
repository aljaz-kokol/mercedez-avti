import {animate, animation, style} from '@angular/animations';

export const stretchOut = animation([
  style({ 'height': '0px' }), // Start state
  animate(250, style({ 'height': '*' }))
]);

export const stretchIn = animation([
  animate(250,style({ 'height': '0px' }))
]);
