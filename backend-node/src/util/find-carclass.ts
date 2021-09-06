import { Types } from 'mongoose';

import CarClass, { CarClassDocument } from '../model/car-class.model';

const getSubClass = (subClasses: CarClassDocument[], id: string): CarClassDocument | null => {
    if (subClasses) {
        for (const subclass of subClasses) {
            if (subclass._id == id) {
                return subclass;
            }
            let found = getSubClass(subclass.subclasses, id);
            if (found) {
                return found;
            }
        }   
    }
    return null;
}

const addSubClass = (carClass: CarClassDocument, id: string, name: string) => {
    for (const subclass of carClass.subclasses) {
        if (subclass._id == id) {
            return subclass;
        }
        let found = getSubClass(subclass.subclasses, id);
        if (found) {
            return found;
        }
    } 
}

export const getCarClass = async (classId: string) => {
    let carClass = await CarClass.findById(classId);
    if (!carClass) {
        const carClassList = await CarClass.find();
        // Loop through all top level CarClasses
        for (let listItem of carClassList) {
            carClass = getSubClass(listItem.subclasses, classId);
            // If subclass is found change the value of carClass to the top level CarClass object
            if (carClass) {
                carClass = listItem;
                break;
            }
        }
    }
    return carClass;
} 

export const getCarClassWithNewSubclass = async (classId: string, name: string) => {
    let carClass = await getCarClass(classId);
    if (!carClass) {
        return null;
    }
    if (carClass._id == classId) {
        carClass.subclasses.push(new CarClass({name}));
        return carClass;
    } 
    carClass.subclasses.forEach(el => {
        const subClass = getSubClass(el.subclasses, classId);
        if (el._id != classId) {
            if (!subClass || subClass._id != classId){
                return el;
            }
        } else {
            return el.subclasses.push(new CarClass({name}));
        }
        return subClass.subclasses.push(new CarClass({name}));
    });

    return carClass;
}