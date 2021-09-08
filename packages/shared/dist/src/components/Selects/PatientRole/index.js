import React from 'react';
import { Select, Form } from 'antd';
import { Role } from '../../../utils/role';
var Option = Select.Option;
function PatientRole() {
    return (React.createElement(Form.Item, { noStyle: true, name: "patientRole" },
        React.createElement(Select, { placeholder: "\u5168\u90E8\u7EA7\u522B" },
            React.createElement(Option, { value: "" }, "\u5168\u90E8\u7EA7\u522B"),
            React.createElement(Option, { value: Role.PATIENT.id }, "\u666E\u901A\u60A3\u8005"),
            React.createElement(Option, { value: Role.PATIENT_VIP.id }, "VIP"))));
}
export default PatientRole;
