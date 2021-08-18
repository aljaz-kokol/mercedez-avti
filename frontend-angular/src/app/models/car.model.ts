import {CarClass} from './car-class.model';
import {CarType} from './car-type.model';
import {Fuel} from './fuel.model';
import {Drive} from './drive.model';
import {Gearbox} from './gearbox.model';

export interface CarApi {
  _id: string;
  class: string;
  type: string;
  fuel: string;
  engine: Engine;
  drive: string;
  gearbox: string;
  imagePath: string;
  name: string;
  releaseYear: string;
  doors: number;
  weight: number;
  length: number;
  height: number;
  width: number;
  topSpeed: number;
  basePrice: number;
}

export interface Engine {
  kilowatts: number;
  torque: number;
  volume: number;
  horsepower: string;
}

// A car object that contains object values of reference tables not just the id's
export interface CarFull {
  id: string;
  class: CarClass;
  type: CarType;
  fuel: Fuel;
  engine: Engine;
  drive: Drive;
  gearbox: Gearbox;
  image: string;
  name: string;
  releaseYear: number;
  doors: number;
  weight: number;
  length: number;
  height: number;
  width: number;
  topSpeed: number;
  basePrice: string;
}

export class Car {
  constructor(public id: string,
              public carClass: string,
              public type: string,
              public fuel: string,
              public engine: Engine,
              public drive: string,
              public gearbox: string,
              public image: string,
              public name: string,
              private releaseYear_: string,
              public doors: number,
              public weight: number,
              public length: number,
              public height: number,
              public width: number,
              public topSpeed: number,
              private basePrice_: number) {}

  public get releaseYear(): number {
    const date = new Date(this.releaseYear_);
    return date.getFullYear();
  }

  public get basePrice(): string {
    return this.basePrice_.toLocaleString(undefined, {minimumFractionDigits: 2})
  }

  public static fromApi(apiObj: CarApi): Car {
    return new Car(
      apiObj._id,
      apiObj.class,
      apiObj.type,
      apiObj.fuel,
      {
        ...apiObj.engine,
        horsepower: (apiObj.engine.kilowatts * 1.34102209).toFixed(2)
      },
      apiObj.drive,
      apiObj.gearbox,
      apiObj.imagePath,
      apiObj.name,
      apiObj.releaseYear,
      apiObj.doors,
      apiObj.weight,
      apiObj.length,
      apiObj.height,
      apiObj.width,
      apiObj.topSpeed,
      apiObj.basePrice
    );
  }

  public toCarFull(carClass: CarClass, type: CarType, fuel: Fuel, drive: Drive, gearbox: Gearbox): CarFull {
    return {
      id: this.id,
      class: carClass,
      type: type,
      fuel: fuel,
      engine: this.engine,
      drive: drive,
      gearbox: gearbox,
      image: this.image,
      name: this.name,
      releaseYear: this.releaseYear,
      doors: this.doors,
      weight: this.weight,
      length: this.length,
      height: this.height,
      width: this.width,
      topSpeed: this.topSpeed,
      basePrice: this.basePrice
    };
  }

  public static fromApiList(apiObjList: CarApi[]): Car[] {
    return apiObjList.map((apiObj) => Car.fromApi(apiObj)) ?? [];
  }
}


