import { yinYangMap } from './consts';
export var getReferenceTitle = function (reference) {
    var type = reference.type, value = reference.value, secondValue = reference.secondValue;
    switch (type) {
        case 'RANGE':
            return value + "-" + secondValue;
        case 'GT':
            return ">" + value;
        case 'LT':
            return "<" + secondValue;
        case 'AROUND':
            return value + "\u00B1" + secondValue;
        case 'RADIO':
            return "" + yinYangMap[value];
        case 'OTHER':
        default:
            return "" + value;
    }
};
export var noop = function () { };
