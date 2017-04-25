import moment from 'moment';
import _ from 'lodash';
import shortid from 'shortid';

import {
    AsyncStorage
} from 'react-native';
const STORAGE_KEY = '@Nurses:key';

class NursesStorage {

    saveNurse = async(nurse) => {
        let nurses = await this.getAll();
        nurse.id = shortid.generate();
        nurses.push(nurse);
        let nursesString = JSON.stringify(nurses);
        await AsyncStorage.setItem(STORAGE_KEY, nursesString);
    }

    getAll = async() => {
        let itemsString = await AsyncStorage.getItem(STORAGE_KEY) || '[]';
        return JSON.parse(itemsString);
    }

    removeNurse = async(id) => {
        let nurses = await this.getAll();
        let newValue = _.remove(nurses, (n) => n.id != id);
        let newValueString = JSON.stringify(newValue);
        await AsyncStorage.setItem(STORAGE_KEY, newValueString);
    }

    clearAll = async() => {
        await AsyncStorage.removeItem(STORAGE_KEY);
    }
}

module.exports = new NursesStorage();