import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, Radio, message, Select, Space, InputNumber, Tooltip, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
// import { isEqual } from 'lodash';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { referenceList, referenceMap, yinYang } from 'xzl-web-shared/src/utils/consts';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import './index.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

const { Option } = Select;
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
  common: string | boolean;
  documentName: string;
  references?: TReference[]
}
const EditIndex: FC<IProps> = (props) => {
  const {
    children, initFormVal, onSuccess, source,
  } = props;
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [showModal, setShowModal] = useState(false);
  const [selectReferecnce, setSelectReference] = useState<string>('');
  const [references, setReferences] = useState<string[]>([]);
  const [hasDefault, setHasDefault] = useState<{ position: number, checked: boolean }>({
    position: 0, checked: false,
  });
  const curDocument = useSelector((state: IState) => state.document.curDocument);
  const documentId = curDocument.id;

  useEffect(() => {
    if (showModal && initFormVal) {
      setFieldsValue({ ...initFormVal });
      if (initFormVal.references) {
        setReferences(initFormVal.references.map(r => r.type));
      }
    } else {
      setFieldsValue({ common: true });
    }
    if (curDocument) {
      form.setFieldsValue({
        documentId: curDocument.id,
        documentName: curDocument.name,
        sampleFrom: curDocument.sampleFrom,
      });
    }
  }, [showModal]);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleRequest = (params: any, request: any) => {
    request(params).then((res: any) => {
      message.success('保存成功');
      if (['imgAddIndex'].includes(source)) { // 编辑时没有此参数
        const returnData = res;
        onSuccess(returnData); // 指标库不需要params,结构化需要Params回显到指标列表
      } else {
        onSuccess();
      }
      setShowModal(false);
    }).catch((err: { result: string }) => {
      message.error(err.result || '操作失败');
    });
  };
  // const handleRequestTypeAndIndex = (params: any) => {
  //   api.indexLibrary.putIndexDocumentAndIndex(params).then((res) => {
  //     console.log(res);
  //     message.success('添加成功');
  //     setShowModal(false);
  //     onSuccess({ ...res, documentName: params.documentName });
  //   }).catch((err) => {
  //     message.error(err.result || '操作失败');
  //   });
  // };

  const handleSubmit = async (values: IData) => {
    // documentName
    console.log('values', values);
    if (values.references) {
      values.references.forEach((r, index) => {
        r.type = references[index];
      });
    }
    let params: any = {
      ...values,
      source: 'DOCTOR',
      sourceSid: window.$storage.getItem('sid'),
    };

    if (initFormVal) {
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
        documentId,
      };
      // if (source === 'imgAddTypeIndex') {
      //   params.type = level1Type;
      //   if (!params.documentName) {
      //     params.documentName = '检查报告单';
      //   }
      //   handleRequestTypeAndIndex(params);
      //   console.log('params92892', params);
      // } else {
      handleRequest(params, api.indexLibrary.putIndexDocumentIndex);
      // }
    }
  };

  const handleAddReference = (cb: Function) => {
    if (selectReferecnce) {
      setReferences((prev) => [...prev, selectReferecnce]);
      cb();

    } else {
      message.warn('请选择类型');
    }
  };

  const handleRemoveReference = (cb: Function, fieldName: number, index: number) => {
    cb(fieldName);
    console.log('handleRemoveReference references', JSON.stringify(references));
    const tmp = [...references];
    tmp.splice(index, 1);
    setReferences([...tmp]);
  };

  const handleChangeDefault = (e: CheckboxChangeEvent, index: number) => {
    setHasDefault({ position: index, checked: e.target.checked });
    console.log('handleChangeDefault', e, index);
  };

  const createProps = (field: any, key: string) => {
    return {
      ...field,
      noStyle: true,
      name: [field.name, key],
      fieldKey: [field.fieldKey, key],
    };
  };

  const rules = [{ required: true }];
  return (
    <div className="structured-edit-wrap">
      <span onClick={handleShowModal}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center new-header"
        zIndex={1010}
        width="815px"
        visible={showModal}
        title={initFormVal ? '编辑' : '新建'}
        onCancel={() => setShowModal(false)}
        footer={null}
        destroyOnClose
      >
        <div className="ui-index-library__edit-index">
          <Form
            name="editIndex"
            onFinish={handleSubmit}
            form={form}
            preserve={false}
            layout="horizontal"
            size="large"
            labelCol={{ span: 3 }}
          >
            <Form.Item name="documentId" style={{ display: 'none' }}>
              <Input placeholder="化验单Id" disabled type="hidden" />
            </Form.Item>
            <Form.Item name="documentName" label="化验单名称">
              <Input placeholder="化验单名称" disabled />
            </Form.Item>
            <Form.Item name="sampleFrom" label="样本来源">
              <Input placeholder="样本来源" disabled />
            </Form.Item>
            <Form.Item name="name" rules={rules} label="指标名称">
              <Input placeholder="请输入指标名称" />
            </Form.Item>
            <Form.Item name="abbreviation" label="缩写">
              <Input placeholder="请输入指标缩写" />
            </Form.Item>

            <Form.List name="references">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item key="referenceSelect" label="参考值及单位">
                    <Space>
                      <Select
                        onSelect={setSelectReference}
                        style={{ width: 360 }}
                        placeholder="请选择参考值"
                      >
                        {referenceList.map((reference) => (
                          <Option value={reference.value}>{reference.label}</Option>
                        ))}
                      </Select>
                      <Button onClick={() => handleAddReference(add)} type="primary" ghost>
                        添加
                      </Button>
                    </Space>
                  </Form.Item>
                  {fields.map((field, index) => (
                    <Form.Item key={field.key} label={referenceMap[references[index]]}>
                      <Space align="baseline">
                        {['RANGE', 'GT', 'LT', 'AROUND', 'RADIO'].includes(references[index]) && (
                          <Form.Item
                            {...createProps(field, 'note')}
                            // rules={[{ required: true, message: '' }]}
                          >
                            <Input placeholder="请输入备注" />
                          </Form.Item>
                        )}
                        {['RANGE', 'GT', 'LT', 'AROUND'].includes(references[index]) && (
                          <>
                            <Form.Item
                              {...createProps(field, 'value')}
                              rules={
                                references[index] ==
                                'LT' ? [] : [{ required: true, message: '请输入参考值' }]
                              }
                            >
                              <InputNumber
                                disabled={references[index] == 'LT'}
                                min={0}
                                style={{ width: 110 }}
                                placeholder="请输入参考值"
                              />
                            </Form.Item>
                            <Form.Item
                              {...createProps(field, 'secondValue')}
                              rules={
                                references[index] == 'GT'
                                  ? []
                                  : [{ required: true, message: '请输入参考值' }]
                              }
                            >
                              <InputNumber
                                disabled={references[index] == 'GT'}
                                min={0}
                                style={{ width: 110 }}
                                placeholder="请输入参考值"
                              />
                            </Form.Item>
                            <Form.Item {...createProps(field, 'unit')}>
                              <Input placeholder="请输入单位" style={{ width: 120 }} />
                            </Form.Item>
                          </>
                        )}
                        {['RADIO'].includes(references[index]) && (
                          <Form.Item
                            {...createProps(field, 'value')}
                            rules={[{ required: true, message: '请选择' }]}
                          >
                            <Select style={{ width: 357 }} placeholder="请选择">
                              {yinYang.map((yy) => (
                                <Option value={yy.value}>{yy.label}</Option>
                              ))}
                            </Select>
                          </Form.Item>
                        )}

                        {['OTHER'].includes(references[index]) && (
                          <Form.Item
                            {...createProps(field, 'value')}
                            rules={[{ required: true, message: '请输入内容' }]}
                          >
                            <Input placeholder="请输入内容" style={{ width: 537 }} />
                          </Form.Item>
                        )}
                        {/* remove(field.name) */}
                        <DeleteOutlined
                          onClick={() => handleRemoveReference(remove, field.name, index)}
                        />
                        <Form.Item
                          {...field}
                          noStyle
                          name={[field.name, 'isDefault']}
                          fieldKey={[field.fieldKey, 'isDefault']}
                          valuePropName="checked"
                        >
                          <Checkbox
                            disabled={hasDefault.checked && hasDefault.position !== index}
                            onChange={(e) => handleChangeDefault(e, index)}
                          >
                            <Tooltip title="设置为默认单位">默认</Tooltip>
                          </Checkbox>
                        </Form.Item>
                      </Space>
                    </Form.Item>
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
                <Button onClick={() => setShowModal(false)}>取消</Button>
                <Button htmlType="submit" type="primary">
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
