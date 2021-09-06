import React, { FC, useState, useEffect } from 'react';
import {
  Form, Input, Button, Radio, message,
} from 'antd';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import DragModal from '@/components/DragModal';
import * as api from '@/services/api';
import './index.scss';

interface IProps {
  initFormVal?: any;
  onSuccess: (params?: any) => void;
  documentId?: string; // 图片大分类id,例如生化全项的类型id,如果是结构化入口时(source:imgAddTypeIndex时)，此值不会传过来
  sampleFrom?: string; // 样本来源，同上
  level1Type: string; // 一级分类： HYD  或者   JCD
  // source:imgAddIndex结构化添加指标 imgAddTypeIndex结构化添加大分类+指标  libraryAdd指标库添加  libraryEdit指标库编辑
  source: string;
}
interface IData {
  units: string[],
  common: string | boolean;
  documentName: string;
}
const EditIndex: FC<IProps> = (props) => {
  const {
    children, initFormVal, onSuccess, documentId, level1Type, source, sampleFrom,
  } = props;
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [showModal, setshowModal] = useState(false);
  const [defaultUnitInx, setdefaultUnit] = useState(0);
  useEffect(() => {
    if (!showModal) {
      setdefaultUnit(0);
    }
    if (showModal && initFormVal) {
      const initUnits = initFormVal?.units?.[0] ? initFormVal.units : [''];
      setFieldsValue({ ...initFormVal, units: initUnits });
    } else {
      setFieldsValue({ units: [''], common: true });
    }
  }, [showModal]);
  const handleShowModal = () => {
    setshowModal(true);
  };
  const handleRequest = (params: any, request: any) => {
    request(params).then((res) => {
      message.success('保存成功');
      if (['imgAddIndex'].includes(source)) { // 编辑时没有此参数
        const returnData = res;
        onSuccess(returnData); // 指标库不需要params,结构化需要Params回显到指标列表
      } else {
        onSuccess();
      }
      setshowModal(false);
    }).catch((err: {result: string}) => {
      console.log(932932, err);
      message.error(err.result || '操作失败');
    });
  };
  const handleRequestTypeAndIndex = (params: any) => {
    api.indexLibrary.putIndexDocumentAndIndex(params).then((res) => {
      console.log(res);
      message.success('添加成功');
      setshowModal(false);
      onSuccess({ ...res, documentName: params.documentName });
    }).catch((err) => {
      console.log(932932, err);
      message.error(err.result || '操作失败');
    });
  };
  const handleSubmit = async (values: IData) => {
    // documentName
    const formatVals: IData = { ...values };
    // 默认单位放到首位s
    const { units } = values;
    if (units?.length > 0) {
      const firstUnit = units[defaultUnitInx];
      units.splice(defaultUnitInx, 1);
      units.unshift(firstUnit);
      formatVals.units = units.filter((unit) => !!unit);
    } else {
      formatVals.units = [];
    }

    // 默认单位放到首位e
    let params: CommonData = {
      ...formatVals,
      source: 'DOCTOR',
      sourceSid: window.$storage.getItem('sid'),
    };

    if ([...new Set(formatVals.units)].length !== formatVals.units.length) {
      message.error('存在相同单位');
    } else if (initFormVal) {
      params.id = initFormVal.id; // 编辑   id传指标的id
      params.documentId = documentId;
      handleRequest(params, api.indexLibrary.patchIndexDocumentIndex);
    } else {
      // 添加
      params = {
        ...params,
        source: 'DOCTOR', // 医生添加DOCTOR，系统添加SYSTEM
        sourceSid: window.$storage.getItem('sid'),
        wcId: window.$storage.getItem('wcId'),
      };
      // 结构化添加指标会传此值
      if (sampleFrom) {
        params.sampleFrom = sampleFrom;
      }
      if (source !== 'imgAddTypeIndex' && documentId) {
        params.documentId = documentId;
      }
      if (source === 'imgAddTypeIndex') {
        params.type = level1Type;
        if (!params.documentName) {
          params.documentName = '检查报告单';
        }
        handleRequestTypeAndIndex(params);
        console.log('params92892', params);
      } else {
        handleRequest(params, api.indexLibrary.putIndexDocumentIndex);
      }
    }
  };
  const handleDefaultUnit = (key: number) => {
    setdefaultUnit(key);
  };
  const rules = [{ required: true, message: '请输入' }];
  const isHyd = !!(level1Type === 'HYD');
  return (
    <div>
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center new-header"
        zIndex={1010}
        width="615px"
        visible={showModal}
        title={initFormVal ? '编辑' : '新建'}
        onCancel={() => setshowModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="ui-index-library__edit-index">
          <Form
            name="editIndex"
            onFinish={handleSubmit}
            form={form}
            preserve={false}
          >
            {/* 结构化添加图片类型和指标时才显示此项 */}
            {
              source === 'imgAddTypeIndex' && (
                <Form.Item
                  name="documentName"
                  rules={isHyd ? [] : rules}
                  label={isHyd ? '化验单名称：' : '检查单名称：'}
                >
                  <Input placeholder={isHyd ? '请输入化验单名称，不填默认为检查报告单' : '请输入检查单名称'} />
                </Form.Item>
              )
            }
            {/* 结构化添加指标，此项隐藏 */}
            {
              source !== 'imgAddIndex' && (
                <Form.Item
                  name="sampleFrom"
                  rules={rules}
                  label={`${isHyd ? '样本来源' : '检查部位'}`}
                >
                  <Input
                    placeholder={`请输入${isHyd ? '样本来源' : '检查部位'}`}
                    type="text"
                  />
                </Form.Item>
              )
            }
            <Form.Item name="name" rules={rules} label="指标名称：">
              <Input placeholder="请输入指标名称" />
            </Form.Item>
            <Form.Item name="abbreviation" label="缩写：">
              <Input placeholder="请输入指标缩写" />
            </Form.Item>
            <Form.List
              name="units"
            >
              {(fields, { add, remove }) => (
                <>
                  <div className="unit-tit">
                    <span>单位</span>
                    <span onClick={() => add()}>
                      <PlusSquareOutlined />
                    </span>
                  </div>
                  {fields.map((field) => (
                    <div className="unit-item flex" key={field.key}>
                      <Form.Item
                        {...field}
                      >
                        <Input placeholder="请输入单位" />
                      </Form.Item>
                      <DeleteOutlined className="del" onClick={() => remove(field.name)} />
                      <Radio
                        checked={defaultUnitInx === field.key}
                        value={field.key}
                        onFocus={() => handleDefaultUnit(field.key)}
                      >
                        设为默认单位
                      </Radio>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
            <Form.Item name="common" rules={rules} label="是否常用：" className="common">
              <Radio.Group>
                <Radio value>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <div className="common__btn">
                <Button
                  onClick={() => setshowModal(false)}
                >
                  取消
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                >
                  保存
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default EditIndex;
