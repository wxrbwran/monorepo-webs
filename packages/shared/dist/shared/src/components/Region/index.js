var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useState, useEffect } from 'react';
import { Select, Space } from 'antd';
var Option = Select.Option;
function Region(_a) {
    var getRegion = _a.getRegion, initData = _a.initData, request = _a.request;
    var provinceCode = initData.provinceCode, townCode = initData.townCode, cityCode = initData.cityCode;
    console.log('initDatainitData', provinceCode);
    var _b = __read(useState(provinceCode), 2), province = _b[0], setProvince = _b[1];
    var _c = __read(useState(cityCode), 2), city = _c[0], setCity = _c[1];
    var _d = __read(useState(townCode), 2), town = _d[0], setTown = _d[1];
    var _e = __read(useState([]), 2), provinces = _e[0], setProvinces = _e[1];
    var _f = __read(useState([]), 2), citys = _f[0], setCitys = _f[1];
    var _g = __read(useState([]), 2), towns = _g[0], setTowns = _g[1];
    var _h = __read(useState((initData === null || initData === void 0 ? void 0 : initData.address) || ''), 2), address = _h[0], setAddress = _h[1]; // 现住址：省 市  县
    var fetchAddress = function (id, type) {
        request({ id: id }).then(function (res) {
            switch (type) {
                case 'province':
                    setProvinces(res.regions);
                    break;
                case 'city':
                    setCitys(res.regions);
                    break;
                case 'town':
                    setTowns(res.regions);
                    break;
                default:
                    break;
            }
        });
    };
    useEffect(function () {
        fetchAddress(0, 'province');
        if (provinceCode) {
            fetchAddress(provinceCode, 'city');
        }
        if (cityCode) {
            fetchAddress(cityCode, 'town');
        }
    }, [provinceCode, cityCode]);
    var changeRegion = function (name, value, _a) {
        var title = _a.title;
        var newDomicile = address.split(' ');
        switch (name) {
            case 'province':
                getRegion({
                    provinceCode: value,
                    provinceName: title,
                    cityCode: 0,
                    cityName: '',
                    townCode: 0,
                    townName: '',
                    address: title,
                });
                setProvince(value);
                setAddress(title);
                setCity(0);
                setTown(0);
                fetchAddress(value, 'city');
                break;
            case 'city':
                getRegion({
                    cityCode: value,
                    cityName: title,
                    townCode: 0,
                    townName: '',
                    address: newDomicile[0] + " " + title,
                });
                setCity(value);
                setTown(0);
                setAddress(newDomicile[0] + " " + title);
                if (value) {
                    fetchAddress(value, 'town');
                }
                break;
            case 'town':
                getRegion({
                    townCode: value,
                    townName: title,
                    address: newDomicile[0] + " " + newDomicile[1] + " " + title,
                });
                setAddress(newDomicile[0] + " " + newDomicile[1] + " " + title);
                setTown(value);
                break;
            default:
                break;
        }
    };
    var selectStyle = { minWidth: 110, fontSize: 14 };
    return (React.createElement("div", { className: "right", style: { display: 'flex', justifyContent: 'space-between' } },
        React.createElement(Space, { className: "w-full justify-between" },
            React.createElement(Select, { placeholder: "\u7701", style: selectStyle, onSelect: function (value, option) { return changeRegion('province', value, option); }, value: province }, provinces.map(function (val) { return (React.createElement(Option, { key: val.id, value: val.id, title: val.regionName }, val.regionName)); })),
            React.createElement(Select, { placeholder: "\u5E02", style: selectStyle, disabled: !province, onSelect: function (value, option) { return changeRegion('city', value, option); }, value: city },
                React.createElement(Option, { key: "emptyCity", value: 0, title: "" }, "\u6682\u4E0D\u9009\u62E9"),
                citys.map(function (val) { return (React.createElement(Option, { key: val.id, value: val.id, title: val.regionName }, val.regionName)); })),
            React.createElement(Select, { placeholder: "\u53BF", style: selectStyle, disabled: !city, onSelect: function (value, option) { return changeRegion('town', value, option); }, value: town },
                React.createElement(Option, { key: "emptyTown", value: 0, title: "" }, "\u6682\u4E0D\u9009\u62E9"),
                towns.map(function (val) { return (React.createElement(Option, { key: val.id, value: val.id, title: val.regionName }, val.regionName)); })))));
}
export default Region;
