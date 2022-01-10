import React from 'react';
import { Select, Form } from 'antd';
import { Role } from '../../../utils/role';
var Option = Select.Option;
var Item = Form.Item;
var PatientLevel = function () {
    var patients = ['PATIENT', 'PATIENT_VIP'];
    var patientList = Object.keys(Role)
        .filter(function (role) { return patients.includes(role); })
        .map(function (role) { return Role[role]; });
    return (React.createElement(Item, { noStyle: true, name: "s_role" },
        React.createElement(Select, { placeholder: "\u60A3\u8005\u7EA7\u522B", style: { width: 120, marginRight: 15 } },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u60A3\u8005"),
            patientList.map(function (role) { return (React.createElement(Option, { key: role.id, value: role.id, title: role.desc }, role.desc)); }))));
};
export default PatientLevel;
