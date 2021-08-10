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
      apiObj.engine,
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

  public static fromApiList(apiObjList: CarApi[]): Car[] {
    return apiObjList.map((apiObj) => Car.fromApi(apiObj)) ?? [];
  }
}


