import React from 'react';
import { Avatar, Button } from 'antd';
import {
  defaultAvatar,
  sexList,
  inviteStatusLists,
  statusLists,
  orgCategroy,
  roleList,
  projectStatus,
  yinYangMap,
} from './consts';
import { Role, fetchRolePropValue } from './role';
import moment from 'moment';
import { isEmpty } from 'lodash';
function getDefaultReferenceValue(references) {
  var _a;
  if (references && !isEmpty(references)) {
    var defaultReference =
      (_a = references.filter(function (r) {
        return r.isDefault;
      })) === null || _a === void 0
        ? void 0
        : _a[0];
    return defaultReference || references[0];
  }
  return {};
}
export var columnCreator = function (title, dataIndex, customRender) {
  if (customRender === void 0) {
    customRender = undefined;
  }
  var column = {
    title: title,
    dataIndex: dataIndex,
  };
  if (customRender) {
    column.render = customRender;
  }
  return column;
};
export var clName = columnCreator('姓名', 'name');
export var clTitle = columnCreator('职称', 'title');
export var clGoodsPrice = columnCreator('收费标准', 'goodsDescriptions');
export var indexName = columnCreator('指标名称', 'name');
export var note = columnCreator('参考值备注', 'note', function (_, record) {
  var _a;
  return (_a = getDefaultReferenceValue(record.references)) === null || _a === void 0
    ? void 0
    : _a.note;
});
export var reference = columnCreator('参考值', 'reference', function (_, record) {
  var defaultReference = getDefaultReferenceValue(record.references);
  var type = defaultReference.type,
    value = defaultReference.value,
    secondValue = defaultReference.secondValue;
  if (type) {
    switch (type) {
      case 'RANGE':
        return value + '-' + secondValue;
      case 'GT':
        return '>' + value;
      case 'LT':
        return '<' + secondValue;
      case 'AROUND':
        return value + '\u00B1' + secondValue;
      case 'RADIO':
        return '' + yinYangMap[value];
      case 'OTHER':
        return '' + value;
    }
  }
  return '';
  // return getDefaultReferenceValue(record.references, note)
});
export var unit = columnCreator('单位', 'unit', function (_, record) {
  var _a;
  return (_a = getDefaultReferenceValue(record.references)) === null || _a === void 0
    ? void 0
    : _a.unit;
});
export var indexCommon = columnCreator('是否常用', 'common', function (text) {
  return React.createElement('span', null, text ? '是' : '否');
});
export var clAvatar = {
  title: '头像',
  dataIndex: 'avatarUrl',
  render: function (text) {
    return React.createElement('img', {
      src: text || defaultAvatar,
      style: { width: 40, height: 40 },
      alt: '\u5934\u50CF',
    });
  },
};
export var clDepartment = {
  title: '科室',
  dataIndex: 'department',
  render: function (text) {
    return text.name;
  },
};
export var indexAbbr = {
  title: '缩写',
  dataIndex: 'abbreviation',
  render: function (text) {
    return React.createElement('div', null, text || '--');
  },
};
export var indexSource = {
  title: '数据来源',
  dataIndex: 'source',
  render: function (text) {
    return React.createElement('div', null, text === 'DOCTOR' ? '自己添加' : '系统添加');
  },
};
export var avatar = {
  title: '头像',
  dataIndex: 'avatarUrl',
  width: 80,
  render: function (text) {
    return React.createElement(Avatar, { size: 40, shape: 'square', src: text || defaultAvatar });
  },
};
export var navAvatar = function (params) {
  return {
    title: '头像',
    dataIndex: 'avatarUrl',
    width: 80,
    render: function (text, record) {
      return React.createElement(
        'span',
        {
          onClick: function () {
            return params.nav(record);
          },
        },
        React.createElement(Avatar, { size: 40, shape: 'square', src: text || defaultAvatar }),
      );
    },
  };
};
export var name = {
  title: '姓名',
  dataIndex: 'name',
  width: 100,
  render: function (text) {
    return React.createElement('span', null, text);
  },
};
export var navName = function (params) {
  return {
    title: '姓名',
    dataIndex: 'name',
    width: 100,
    render: function (text, record) {
      return React.createElement(
        Button,
        {
          type: 'link',
          onClick: function () {
            return params.nav(record);
          },
        },
        text,
      );
    },
  };
};
export var sex = {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
  width: 100,
  render: function (text) {
    return React.createElement('span', null, sexList[+text]);
  },
};
export var age = {
  title: '年龄',
  dataIndex: 'age',
  width: 100,
};
export var title = {
  title: '职称',
  dataIndex: 'title',
  render: function (text) {
    return React.createElement('span', null, text);
  },
};
export var upperDoctor = {
  title: '主管医生',
  dataIndex: 'upper_doctor',
};
export var lowerDoctor = {
  title: '医生助手',
  dataIndex: 'lower_doctor',
};
export var province = {
  title: '地区',
  dataIndex: 'province',
};
export var patientNum = {
  title: '患者数量',
  dataIndex: 'patientNum',
};
export var inviteStatus = {
  title: '添加申请',
  dataIndex: 'inviteStatus',
  render: function (text) {
    return React.createElement('span', null, inviteStatusLists[text]);
  },
};
export var status = {
  title: '认证状态',
  dataIndex: 'status',
  render: function (text) {
    return React.createElement('span', null, statusLists[text]);
  },
};
export var organizationName = function (params) {
  return {
    title: '医院名',
    dataIndex: 'orgName',
    render: function (text, record) {
      return React.createElement(
        Button,
        {
          type: 'link',
          onClick: function () {
            return params.handleGetOrgInfoThenNav(record);
          },
        },
        text,
      );
    },
  };
};
export var organizationCategory = {
  title: '机构业务',
  dataIndex: 'organizationCategory',
  render: function (text) {
    return React.createElement('span', null, orgCategroy[text]);
  },
};
export var organizationCode = {
  title: '医院识别码',
  dataIndex: 'uuCode',
};
export var adminName = {
  title: '管理员',
  dataIndex: 'adminName',
};
export var lowOrgCount = {
  title: '下级医院',
  dataIndex: 'lowOrgCount',
  sorter: true,
};
export var upOrgCount = {
  title: '上级医院',
  dataIndex: 'upOrgCount',
  sorter: true,
};
export var deptCount = {
  title: '科室',
  dataIndex: 'deptCount',
  sorter: true,
};
export var doctorCount = {
  title: '医生',
  dataIndex: 'doctorCount',
  sorter: true,
};
export var nurseCount = {
  title: '护士',
  dataIndex: 'nurseCount',
  sorter: true,
};
export var patientCount = {
  title: '患者',
  dataIndex: 'patientCount',
  sorter: true,
};
export var doctorName = {
  title: '医生',
  dataIndex: 'doctorName',
};
export var assistantName = {
  title: '医助',
  dataIndex: 'assistantName',
};
export var serviceLevel = {
  title: '级别',
  dataIndex: 'role',
  render: function (text) {
    return text === Role.PATIENT_VIP.id ? 'VIP' : '普通患者';
  },
};
export var tel = {
  title: '联系方式',
  dataIndex: 'tel',
};
export var role = {
  title: '角色',
  dataIndex: 'role',
  render: function (text) {
    return React.createElement('span', null, roleList[text]);
  },
};
export var roleCol = {
  title: '角色',
  dataIndex: 'role',
  render: function (text) {
    return React.createElement('span', null, fetchRolePropValue(text, 'desc'));
  },
};
export var workload = {
  title: '工作量统计',
  dataIndex: 'workload',
};
var depRender = function (text) {
  return React.createElement(
    'span',
    null,
    text
      ? text
          .map(function (dep) {
            return dep.name;
          })
          .join('，')
      : '',
  );
};
export var department = {
  title: '执业科室',
  dataIndex: 'department',
  width: 150,
  render: depRender,
};
export var departmentName = {
  title: '执业科室',
  dataIndex: 'departmentName',
};
export var adminDepartment = {
  title: '管理科室',
  dataIndex: 'adminDepartment',
  width: 150,
  render: depRender,
};
export var lastMonthWorkload = {
  title: '上月工作量',
  dataIndex: 'lastMonthWorkload',
};
export var monthWorkload = {
  title: '本月工作量',
  dataIndex: 'monthWorkload',
};
export var organizationNameOut = function (params) {
  return {
    title: '医院名',
    dataIndex: 'orgName',
    align: 'center',
    mock: '@region',
    render: function (text, record) {
      return params.level === '下级机构'
        ? React.createElement(
            'a',
            {
              className: 'header__link__clinical',
              href:
                '' +
                window.location.origin +
                window.location.pathname +
                '#/hospital/account?openSub=true&nsId=' +
                record.nsId +
                '&sid=' +
                record.sid,
              target: '_blank',
            },
            text,
          )
        : React.createElement('span', null, text);
    },
  };
};
export var orgName = {
  title: '医院名',
  dataIndex: 'orgName',
  mock: '@region',
  align: 'center',
};
export var patientName = {
  title: '姓名',
  dataIndex: 'patientName',
  width: 100,
  mock: '@cname',
  render: function (text) {
    return React.createElement('span', null, text);
  },
};
export var crostatus = {
  title: '试验状态',
  dataIndex: 'status',
  mock: '@pick(["1002", "1001"])',
  align: 'center',
  render: function (text) {
    return projectStatus[text];
  },
};
export var orgaName = {
  title: '机构',
  dataIndex: 'organizationName',
  mock: '@pick(["万物无疆医院", "阜外医院", "临汾医院"])',
  align: 'center',
};
export var sendNumber = {
  title: '已发出量表数量',
  dataIndex: 'sendNumber',
  mock: '@integer(10,30)',
  align: 'center',
  sorter: function (a, b) {
    return a.deptCount - b.deptCount;
  },
};
export var noReplyNumber = {
  title: '未回复量表数量',
  dataIndex: 'noReplyNumber',
  align: 'center',
  mock: '@integer(10,30)',
  sorter: function (a, b) {
    return a.noReplyNumber - b.noReplyNumber;
  },
};
export var pname = {
  title: '姓名',
  dataIndex: 'pname',
  width: 100,
  render: function (text) {
    return React.createElement('span', null, text);
  },
};
export var groupName = {
  title: '所在分组',
  dataIndex: 'groupName',
  key: 'groupName',
  render: function (_text, record) {
    return React.createElement('div', null, record.groupName.join(','));
  },
};
export var initAt = {
  title: '与医生绑定时间',
  dataIndex: 'initAt',
  key: 'initAt',
  render: function (text, _record) {
    return React.createElement('div', null, text ? moment(text).format('YYYY.MM.DD') : '--');
  },
};
export var bindAt = {
  title: '与医生绑定时间',
  dataIndex: 'bindAt',
  key: 'bindAt',
  render: function (text, _record) {
    return React.createElement('div', null, text ? moment(text).format('YYYY.MM.DD') : '--');
  },
};
