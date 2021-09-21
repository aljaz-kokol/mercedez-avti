import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, Form, FormArray, FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
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
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css'],
})
export class CreateCarComponent implements OnInit {

  private imageFiles: File[] = [];

  localImgPaths: string[] = [];

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

  constructor(private classService: CarClassService,
              private typeService: CarTypeService,
              private driveService: DriveService,
              private gearboxService: GearboxService,
              private fuelService: FuelService) {}

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
  }

  onFileSelected(event, index: number) {
    const file: File = event.target.files[0];
    const formData = new FormData();
    if (file) {
      formData.append('images', file, file.name);
      const reader = new FileReader();
      reader.onload = () => {
        this.localImgPaths[index] = reader.result as string;
      }
      reader.readAsDataURL(file);
    }
  }

  onAddImgControl() {
    this.imageFormArray.push(new FormGroup({
      name: new FormControl(null, Validators.required),
      imgFile: new FormControl(null, Validators.required)
    }));
  }

  get showSpinner() {
    return (!this.carClassList || !this.carTypeList || !this.driveTypeList || !this.gearboxList || !this.fuelList);
  }

  get imageFormArray(): FormArray {
    return (this.imagesForm.get('images') as FormArray);
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
