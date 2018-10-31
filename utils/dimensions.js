import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const getGlobalUnit = (percentage) => {
    const unit = (percentage / 100);
    let result;

    if (width > height) {
        result = unit * height;
        return result;
    }

    result = unit * width;
    return result;
};

export default getGlobalUnit;