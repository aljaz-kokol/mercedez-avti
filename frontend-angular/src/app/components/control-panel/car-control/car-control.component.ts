import {Component, OnInit} from '@angular/core';
import {CarClassService} from '../../../services/car-class.service';
import {CarService} from '../../../services/car.service';
import {CarClass} from '../../../models/car-class.model';
import {Car} from '../../../models/car.model';
import {ApiImage} from '../../../shared/api-image';

@Component({
  selector: 'app-car-control',
  templateUrl: './car-control.component.html',
  styleUrls: ['./car-control.component.css']
})
export class CarControlComponent implements OnInit {
  classes: CarClass[];
  cars: Car[];

  expansionPanelClasses: CarClass[][] = []; // Classes used to create name of expansion panel e.g. A/GlA-CLASS

  private panelChangeIndex: number; // Index of the expansion panel that has changed to subclass

  constructor(private carClassService: CarClassService,
              private carService: CarService) {}

  async ngOnInit(): Promise<void> {
    this.classes = await this.carClassService.getCarClassList();
    this.cars = await this.carService.getCarList();
    // Init class names
    this.classes.forEach(el => {
      this.expansionPanelClasses.push([el]);
    });
  }

  getCarsFromClass(carClass: CarClass): Car[] {
    return this.cars.filter(el => el.carClass === carClass.id);
  }

  getCarImage(car: Car): ApiImage {
    return car.images[0];
  }

  classHasCars(carClass: CarClass): boolean {
    return this.getCarsFromClass(carClass).length > 0;
  }

  switchClass(odlClass: CarClass, newClass: CarClass) {
    this.panelChangeIndex = -1;
    const index = this.classes.indexOf(odlClass);
    this.classes[index] = newClass;
    this.panelChangeIndex = index;
    // Adjust CarClassName
    const classNameIndex = this.expansionPanelClasses[index].indexOf(newClass);
    // Check if className Already exists
    if (classNameIndex >= 0) {
      this.expansionPanelClasses[index] = this.expansionPanelClasses[index].slice(0, classNameIndex + 1);
    } else {
      this.expansionPanelClasses[index].push(newClass);
    }
  }

  panelClassHasChanged(panelIndex: number) {
    return this.panelChangeIndex === panelIndex;
  }

  panelHasConstructedName(panelIndex: number): boolean {
    return this.expansionPanelClasses[panelIndex].length > 1;
  }

  getActiveClassNameOfPanel(panelIndex: number): string {
    const lastIndex = this.expansionPanelClasses[panelIndex].length - 1;
    return this.expansionPanelClasses[panelIndex][lastIndex].name;
  }

  getClassesForPanelName(panelIndex: number): CarClass[] {
    const lastIndex = this.expansionPanelClasses[panelIndex].length - 1;
    return this.expansionPanelClasses[panelIndex].filter((el, index) => index !== lastIndex);
  }

  classHasSubclasses(carClass: CarClass) {
    return carClass.subclasses.length > 0;
  }

  get showSpinner(): boolean {
    return (!this.classes || !this.cars);
  }
}
