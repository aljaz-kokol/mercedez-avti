import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {CarClassService} from '../../../../services/car-class.service';
import {CarTypeService} from '../../../../services/car-type.service';
import {DriveService} from '../../../../services/drive.service';
import {GearboxService} from '../../../../services/gearbox.service';
import {CarClass} from '../../../../models/car-class.model';
import {CarType} from '../../../../models/car-type.model';
import {Drive} from '../../../../models/drive.model';
import {Gearbox} from '../../../../models/gearbox.model';
import {FuelService} from '../../../../services/fuel.service';
import {Fuel} from '../../../../models/fuel.model';
import {CarService} from '../../../../services/car.service';
import {ActivatedRoute, Params, Router, UrlTree} from '@angular/router';
import {DialogService} from '../../../../services/dialog.service';
import {DeactivateComponent} from '../../../../services/guards/deactivate/deactivate.guard';
import {Observable} from 'rxjs';
import {Car} from '../../../../models/car.model';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css'],
})
export class CreateCarComponent implements OnInit, DeactivateComponent {

  private _canExit = false;
  private _fileList: File[] = [];
  private _formData: FormData = new FormData();
  private _classList: CarClass[] = [];

  basicDataForm: FormGroup;
  engineForm: FormGroup;
  carDimensionsForm: FormGroup;
  extraDataForm: FormGroup;
  imagesForm: FormGroup;

  carClassList: CarClass[];
  carTypeList: CarType[];
  driveTypeList: Drive[];
  gearboxList: Gearbox[];
  fuelList: Fuel[];

  localImgPaths: string[] = [];

  constructor(private classService: CarClassService,
              private typeService: CarTypeService,
              private driveService: DriveService,
              private gearboxService: GearboxService,
              private fuelService: FuelService,
              private carService: CarService,
              private router: Router,
              private route: ActivatedRoute,
              private dialogService: DialogService) {
  }

  async ngOnInit(): Promise<void> {
    this.carClassList = await this.classService.getCarClassList();
    this.carTypeList = await this.typeService.getCarTypeList();
    this.driveTypeList = await this.driveService.getDriveList();
    this.gearboxList = await this.gearboxService.getGearboxList();
    this.fuelList = await this.fuelService.getFuelList();
    this.initBasicDataForm();
    this.initEngineForm();
    this.initCarDimensionsForm();
    this.initExtraDataForm();
    this.initImagesForm();
    this.getAllClasses(this.carClassList);
    this.route.queryParams.subscribe(async params => {
      // Set the default selected car class if query parameter of class was passed
      await this.setDefaultClass(params);
      // Pre-populate all form fields
      await this.setDefaultCarValues(params);
    })
    this.fieldsAreEmpty;
  }

  canDeactivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.canLeave) {
      return this.dialogService.openChoiceDialog(
        {title: 'Are you sure you want to exit?', body: 'Are you sure you want to exit this page without saving?'}
      ).toPromise().then(result => {
        return result;
      });
    }
    return true;
  }

  async onCrateCar(): Promise<void> {
    const formsData = this.formsData;
    const carObj = {
      car: {
        'class': formsData.basic.carClass,
        type: formsData.basic.carType,
        fuel: formsData.engine.fuel,
        engine: {
          kilowatts: formsData.engine.kilowatts,
          torque: formsData.engine.torque,
          volume: formsData.engine.volume
        },
        drive: formsData.basic.drive,
        gearbox: formsData.basic.gearbox,
        name: formsData.basic.carName,
        releaseYear: formsData.extra.releaseDate,
        doors: formsData.extra.doors,
        weight: formsData.dimensions.weight,
        height: formsData.dimensions.height,
        length: formsData.dimensions.length,
        width: formsData.dimensions.width,
        topSpeed: formsData.extra.topSpeed,
        basePrice: formsData.extra.basePrice
      },
      imageNames: formsData.imageNames
    }
    // Append JSON data
    this._formData.append('data', JSON.stringify(carObj));
    // Append file data
    this._fileList.forEach(file => {
      this._formData.append('images', file, file.name);
    });

    await this.carService.createCar(this._formData);
    this.onNavigate(['../']);
  }

  onFileSelected(event, index: number): void {
    const file: File = event.target.files[0];
    if (file) {
      this._fileList[index] = file;
      console.log(this._fileList[index]);
      const reader = new FileReader();
      reader.onload = () => {
        this.localImgPaths[index] = reader.result as string;
      }
      reader.readAsDataURL(file);
    } else {
      this.localImgPaths[index] = null;
      this._fileList[index] = null;
    }
  }

  onAddImgControl(): void {
    this.imageFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      imgFile: new FormControl(null, Validators.required)
    }));
  }

  onRemoveImage(index: number): void {
    this.dialogService.openChoiceDialog({
      title: 'Delete Image',
      body: 'Are you sure you want to delete this image?'
    }).subscribe(result => {
      if (result) {
        this.imageFormArray.removeAt(index);
        this._fileList.splice(index, 1);
        this.localImgPaths.splice(index, 1);
      }
    })
  }

  get showSpinner(): boolean {
    return (!this.carClassList || !this.carTypeList || !this.driveTypeList || !this.gearboxList || !this.fuelList);
  }

  get imageFormArray(): FormArray {
    return (this.imagesForm.get('images') as FormArray);
  }

  get canCreate(): boolean  {
    return this.basicDataForm.valid && this.extraDataForm.valid && this.extraDataForm.valid && this.carDimensionsForm.valid && this.imagesForm.valid;
  }

  get classList(): CarClass[] {
    return [...this._classList];
  }

  private async setDefaultClass(params: Params) {
    if (params['class']) {
      try {
        const carClass = await this.classService.getCarClassFromId(params['class']);
        if (carClass) {
          this.basicDataForm.get('carClass').setValue(carClass.id);
        }
      } catch (err) {
        this.dialogService.openMessageDialog({
          title: 'Invalid car-class id parameter',
          body: 'Car-class will not be preselected because the passed car-class id is invalid. Do you wish to continue anyways?'
        });
      }
    }
  }

  private async setDefaultCarValues(params: Params) {
    if (params['car']) {
      try {
        const car: Car = await this.carService.getCarFromId(params['car']);
        if (car) {

        }
      }
      catch (err) {
        this.dialogService.openMessageDialog({
          title: 'Invalid car-id parameter',
          body: 'Form values will not be pre-populated because the passed car-id is invalid. Do you wish to continue anyways?'
        });
      }
    }
  }

  private get canLeave(): boolean {
    return (this._canExit || this.fieldsAreEmpty);
  }
  // Return an object containing values of every form control
  private get formsData() {
    const carName: string = this.basicDataForm.get('name').value;
    const carClass: string = this.basicDataForm.get('carClass').value;
    const carType: string = this.basicDataForm.get('carType').value
    const drive: string = this.basicDataForm.get('drive').value;
    const gearbox: string = this.basicDataForm.get('gearbox').value;
    // Engine Data
    const fuel: string = this.engineForm.get('fuel').value;
    const kilowatts: number = this.engineForm.get('kilowatts').value;
    const torque: number = this.engineForm.get('torque').value;
    const volume: number = this.engineForm.get('volume').value;
    // Dimension Data
    const length: number = this.carDimensionsForm.get('length').value;
    const height: number = this.carDimensionsForm.get('height').value;
    const width: number = this.carDimensionsForm.get('width').value;
    const weight: number = this.carDimensionsForm.get('weight').value;
    // Extra Data
    const basePrice: number = this.extraDataForm.get('basePrice').value;
    const topSpeed: number = this.extraDataForm.get('topSpeed').value;
    const doors: number = this.extraDataForm.get('doors').value;
    const releaseDate: Date = this.extraDataForm.get('releaseDate').value;
    // Image names
    const imageNames: string[] = [];
    this.imageFormArray.controls.forEach(el => {
      imageNames.push(el.get('name').value);
    });

    return {
      basic: {
        carName,
        carClass,
        carType,
        drive,
        gearbox
      },
      engine: {
        fuel,
        kilowatts,
        torque,
        volume
      },
      dimensions: {
        length,
        height,
        width,
        weight
      },
      extra: {
        basePrice,
        topSpeed,
        doors,
        releaseDate
      },
      imageNames
    }
    ;

  }
  // Returns true if all formControls are empty (have no value)
  private get fieldsAreEmpty(): boolean {
    let canLeave: boolean = true;
    Object.keys(this.basicDataForm.controls).forEach(key => {
      if (this.basicDataForm.get(key).value !== null && this.basicDataForm.get(key).value != '') {
        canLeave = false;
      }
    });
    Object.keys(this.engineForm.controls).forEach(key => {
      if (this.engineForm.get(key).value !== null && this.engineForm.get(key).value != '') {
        canLeave = false;
      }
    })
    Object.keys(this.carDimensionsForm.controls).forEach(key => {
      if (this.carDimensionsForm.get(key).value !== null && this.carDimensionsForm.get(key).value != '')
        canLeave = false;
    });
    Object.keys(this.extraDataForm.controls).forEach(key => {
      if (this.extraDataForm.get(key).value !== null && this.extraDataForm.get(key).value != '')
        canLeave = false;
    });
    return canLeave;
  }

  private onNavigate(path: string[]) {
    this._canExit = true;
    this.router.navigate(path, { relativeTo: this.route });
  }

  private getAllClasses(cList: CarClass[]): CarClass[] {
    cList.forEach(item => {
      this._classList.push(item);
      if (item.subclasses.length > 0) {
        return this.getAllClasses(item.subclasses);
      }
    });
    return this._classList;
  }

  private initBasicDataForm() {
    this.basicDataForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      carClass: new FormControl(null, [Validators.required]),
      carType: new FormControl(null, [Validators.required]),
      drive: new FormControl(null, [Validators.required]),
      gearbox: new FormControl(null, [Validators.required])
    });
  }

  private initEngineForm() {
    this.engineForm = new FormGroup({
      fuel: new FormControl(null, [Validators.required]),
      kilowatts: new FormControl(null, [Validators.required, Validators.min(1)]),
      torque: new FormControl(null, [Validators.required, Validators.min(1)]),
      volume: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  private initCarDimensionsForm() {
    this.carDimensionsForm = new FormGroup({
      length: new FormControl(null, [Validators.required, Validators.min(1)]),
      height: new FormControl(null, [Validators.required, Validators.min(1)]),
      width: new FormControl(null, [Validators.required, Validators.min(1)]),
      weight: new FormControl(null, [Validators.required, Validators.min(1)]),
    });
  }

  private initExtraDataForm() {
    this.extraDataForm = new FormGroup({
      basePrice: new FormControl(null, [Validators.required, Validators.min(1)]),
      topSpeed: new FormControl(null, [Validators.required, Validators.min(1)]),
      doors: new FormControl(null, [Validators.required, Validators.min(1)]),
      releaseDate: new FormControl(null, [Validators.required]),
    });
  }

  private initImagesForm() {
    this.imagesForm = new FormGroup({
      images: new FormArray([], [Validators.required]),
    })
  }
}
