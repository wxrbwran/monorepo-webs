import React from 'react';
import { Modal, Input, message } from 'antd';
import * as api from '@/services/api';

const { TextArea } = Input;
const { confirm } = Modal;


export const typeText = ['创建', '编辑', '删除'];

// 编辑/删除填写原因
const renderLogReason = (type: string, businessLogId: string) => {
  let operationReason = '';
  confirm({
    title: `注明${typeText[type]}原因（非必填）`,
    icon: <></>,
    closable: true,
    maskClosable: true,
    width: 1025,
    className: 'logModal',
    content: <TextArea onChange={(e) => operationReason = e.target.value} autoSize={{ minRows: 8, maxRows:26 }} />,
    onOk() {
      console.log('OK', businessLogId, operationReason);
      if (operationReason.trim() !== '') {
        const params = {
          businessLogId,
          operationReason,
        };
        api.research.postOperationReason(params).then(() => {
          message.success('保存成功');
        }).catch(err => {
          message.error(err?.result || '操作原因保存失败');
        });
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

// 创建、编辑、删除记录到日志
export const handleOperationLog = (info: IOperationLogProps) => {
  const params: any = {
    operatorName: window.$storage.getItem('userName'),
    projectSid: window.$storage.getItem('projectSid'),
    ...info,
  };
  delete params.title;
  if (info.type === 0) {
    delete params.newParams;
    delete params.oldParams;
  } else if (info.type === 2){
    delete params.newParams;
  }
  console.log('写入操作日志参数：', params);

  api.research.postBusinessLog(params).then(res => {
    if (params.type !== 0) {
      renderLogReason(params.type, res.businessLogId);
    }
  });
};
const typeInfo = (code: number, desc: string) => {
  return {
    code,
    desc,
  };
};
/** 操作内容的类型
   * 文字string类型: 0,1,6
   * 量表内容      : 7,12, 15, 19   |  21, 23, 25, 27
   * 量表计划      : 8, 10,13, 16,18 , 20  |  22, 26
   * 富文本        : 2, 9, 17,   |   28， 30
   * 其它      : 3, 4,5, 11, 14   |  24， 29
*/
export const businessType = {
  UPDATE_PROJECT_INTRODUCE: typeInfo(0, '编辑项目介绍'),
  UPDATE_MIN_DAY: typeInfo(1, '编辑最小试验天数'),
  UPDATE_RISK_ASSESSMENT: typeInfo(2, '编辑风险评估、风险对策'),
  UPDATE_INCLUSION_CRITERIA: typeInfo(3, '编辑纳入标准排除标准'),
  // UPDATE_INCLUSION_CRITERIA: typeInfo(3, '编辑纳入标准'),
  // UPDATE_EXCLUSION_CRITERIA: typeInfo(4, '编辑排除标准'),
  UPDATE_TEST_GROUPING: typeInfo(5, '编辑试验分组'),
  UPDATE_EFFECTIVE_CASES_NUM: typeInfo(6, '编辑有效病例数'),
  UPDATE_SUBJECTIVE_CONTENT: typeInfo(7, '编辑主观量表内容'),
  UPDATE_SUBJECTIVE_PLAN: typeInfo(8, '编辑主观量表发送计划'),
  // UPDATE_OBJECTIVE_CONTENT: typeInfo(9, '编辑客观检查内容和发送计划'),
  UPDATE_OBJECTIVE_CONTENT: typeInfo(9, '编辑客观检查内容'),
  // UPDATE_OBJECTIVE_PLAN: typeInfo(10, '编辑客观检查发送计划'),
  UPDATE_OBJECTIVE_NAME: typeInfo(10, '编辑计划外客观检查组名称'),
  UPDATE_END_EVENT: typeInfo(11, '编辑终点事件'),
  UPDATE_CRF_CONTENT: typeInfo(12, '编辑CRF量表内容'),
  UPDATE_CRF_PLAN: typeInfo(13, '编辑CRF量表发送计划'),
  UPDATE_CRO_GROUP: typeInfo(14, '编辑CRO小组'),
  UPDATE_UNPLANNED_SUBJECTIVE_CONTENT: typeInfo(15, '编辑计划外主观量表内容'),
  UPDATE_UNPLANNED_SUBJECTIVE_PLAN: typeInfo(16, '编辑计划外主观量表发送计划'),
  // UPDATE_UNPLANNED_OBJECTIVE_CONTENT: typeInfo(17, '编辑计划外客观检查内容'),
  UPDATE_UNPLANNED_OBJECTIVE_CONTENT: typeInfo(17, '编辑计划外客观检查内容和发送计划'),

  // UPDATE_UNPLANNED_OBJECTIVE_PLAN: typeInfo(18, '编辑计划外客观检查发送计划'),
  UPDATE_UNPLANNED_OBJECTIVE_NAME: typeInfo(18, '编辑计划外客观检查组名称'),
  UPDATE_UNPLANNED_CRF_CONTENT: typeInfo(19, '编辑计划外CRF量表内容'),
  UPDATE_UNPLANNED_CRF_PLAN: typeInfo(20, '编辑计划外CRF量表发送计划'),

  // 删除
  DELETE_SUBJECTIVE: typeInfo(21, '删除主观量表'),
  DELETE_OBJECTIVE: typeInfo(22, '删除客观检查'),
  DELETE_CRF: typeInfo(23, '删除CRF量表'),
  DELETE_CRO_GROUP: typeInfo(24, '解散CRO小组'),
  DELETE_UNPLANNED_SUBJECTIVE: typeInfo(25, '删除主观量表'),
  DELETE_UNPLANNED_OBJECTIVE: typeInfo(26, '删除客观检查'),
  DELETE_CRF_UNPLANNED: typeInfo(27, '删除CRF量表'),
  DELETE_TEST_FILE: typeInfo(28, '删除试验文件'),
  DELETE_INFORMED_CONSENT: typeInfo(29, '删除知情同意书'),
  DELETE_RISK_ASSESSMENT: typeInfo(30, '删除风险评估、风险对策'),

  // 创建
  CREATE_OBJECTIVE: typeInfo(31, '创建客观检查'),
  CREATE_UNPLANNED_OBJECTIVE: typeInfo(32, '创建计划外客观检查'),
};
