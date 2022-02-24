import React, { FC, useState, useEffect } from 'react';
import { Form, Input, Button, message, Select, Space, InputNumber, Radio, Row, Col } from 'antd';
import DebounceSelect from '@/components/DebounceSelect';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import {
  referenceList,
  referenceMap,
  yinYang,
  createFormListProps,
} from 'xzl-web-shared/dist/utils/consts';
import * as api from '@/services/api';
import { useSelector } from 'umi';
import './index.scss';

const { Option } = Select;
interface IProps {
  initFormVal?: any;
  onSuccess: (params?: any) => void;
  documentId?: string; // 图片大分类id,例如生化全项的类型id
  sampleFrom?: string; // 样本来源，同上
  // source:
  // imgAddIndex结构化添加指标
  // libraryAdd指标库添加
  // libraryEdit指标库编辑
  // imgEditIndex结构化添加指标
  source: string;
}
interface IData {
  common: string | boolean;
  documentName: string;
  references?: TReference[];
}
type TOpt = { label: string; value: string };
const EditIndex: FC<IProps> = (props) => {
  const { children, initFormVal, onSuccess, source } = props;
  const [form] = Form.useForm();
  const { setFieldsValue } = form;
  const [showModal, setShowModal] = useState(false);
  const [selectReferecnce, setSelectReference] = useState<string>('');
  const [references, setReferences] = useState<string[]>([]);
  const [defaultReference, setDefaultReference] = useState(0);
  const curDocument = useSelector((state: IState) => state.document.curDocument);
  const documentId = curDocument.id;
  const [selectVal, setSelectVal] = useState<TOpt[]>([]);
  const [indexs, setIndexs] = useState<TIndexItem[]>([]);
  const sid = window.$storage.getItem('sid');
  useEffect(() => {
    if (showModal && initFormVal) {
      setFieldsValue({ ...initFormVal });
      setSelectVal([{ label: initFormVal.name, value: initFormVal.id }]);
      if (initFormVal.references) {
        setReferences(initFormVal.references.map((r: TReference) => r.type));
        let index = 0;
        initFormVal.references.forEach((r: TReference, idx: number) => {
          if (r.isDefault) {
            index = idx;
          }
        });
        setDefaultReference(index);
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
  const handleCloseModal = () => {
    setSelectReference('');
    setReferences([]);
    setShowModal(false);
    setSelectVal([]);
    form.resetFields();
  };
  const handleRequest = (params: any, request: any) => {
    console.log('handleRequest', params);
    request(params)
      .then((res: any) => {
        message.success('保存成功');
        if (['imgAddIndex', 'imgEditIndex'].includes(source)) {
          onSuccess(res); // 指标库不需要params,结构化需要Params回显到指标列表
        } else {
          onSuccess();
        }
        handleCloseModal();
      })
      .catch((err: { result: string }) => {
        message.error(err.result || '操作失败');
      });
  };

  const handleSubmit = async (values: IData) => {
    // documentName
    console.log('values', values);
    if (values.references) {
      values.references.forEach((r, index) => {
        r.type = references[index];
        r.isDefault = false;
      });
      if (values?.references.length > 0) {
        values.references[defaultReference].isDefault = true;
      }
    }
    let params: any = {
      ...values,
      source: 'DOCTOR',
      sourceSid: sid,
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
        sourceSid: sid,
        wcId: window.$storage.getItem('wcId'),
      };
      // 指标库添加指标
      params.documentId = documentId;
      handleRequest(params, api.indexLibrary.putIndexDocumentIndex);
    }
  };
  const handleAddReference = (cb: Function) => {
    if (selectReferecnce) {
      setReferences((prev) => [...prev, selectReferecnce]);
      cb();
      const values = form.getFieldsValue();
      console.log('handleAddReference', values);
    } else {
      message.warn('请选择类型');
    }
  };

  const handleRemoveReference = (cb: Function, fieldName: number, index: number) => {
    cb(fieldName);
    const tmp = [...references];
    tmp.splice(index, 1);
    setReferences([...tmp]);
    if (index === defaultReference) {
      setDefaultReference(0);
    }
    if (index < defaultReference) {
      setDefaultReference((prev) => prev - 1);
    }
  };

  const handleOnClear = () => {
    // console.log('handleOnClear');
    setSelectVal([]);
    form.setFieldsValue({ name: null, indexId: null, abbreviation: null });
  };
  const handleChangeName = async (text: TOpt[]) => {
    // console.log('text', text);
    if (text.length === 0) {
      handleOnClear();
    } else {
      setSelectVal(text);
      form.setFieldsValue({ name: text[0].label });
    }
  };

  const handleOnSelect = async (_val: string, option: any) => {
    // console.log(option);
    setSelectVal([option]);
    const datum: Record<string, any> = {
      name: option.label,
    };
    if (['dev.', 'test.', 'prod.'].some((d) => option?.value?.startsWith(d))) {
      message.success('使用已有指标');
      const curIndex = indexs.filter((i) => i.id === option.value)[0];
      console.log('curIndex', curIndex);
      datum.indexId = option.value;
      datum.abbreviation = curIndex?.abbreviation || '';
      datum.references =
        curIndex.references?.map((r: TReference) => {
          delete r.id;
          return r;
        }) || [];
      setReferences(curIndex.references?.map((r) => r.type) || []);
    } else {
      message.success('添加新指标');
    }
    form.setFieldsValue(datum);
  };
  const fetchIndexList = async (text: string): Promise<any> => {
    return api.indexLibrary
      .fetchAllIndexDocumentIndex({
        name: text,
        sid,
      })
      .then((res) => {
        setIndexs(res.list);
        return res.list.map((index: TIndexItem) => ({
          label: index.name,
          value: index.id,
        }));
      });
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
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <div className="ui-index-library__edit-index">
          {showModal && (
            <Form
              name="editIndex"
              onFinish={handleSubmit}
              form={form}
              preserve={false}
              layout="horizontal"
              size="large"
              labelCol={{ span: 4 }}
            >
              <Form.Item name="documentId" style={{ display: 'none' }}>
                <Input placeholder="化验单Id" readOnly type="hidden" />
              </Form.Item>
              <Form.Item name="documentName" label="化验单名称">
                <Input placeholder="化验单名称" disabled />
              </Form.Item>
              <Form.Item name="sampleFrom" label="样本来源">
                <Input placeholder="样本来源" disabled />
              </Form.Item>
              <Form.Item name="indexId" noStyle className="hidden">
                <Input type="hidden" />
              </Form.Item>
              {/* 指标库添加指标/结构化添加指标 */}
              {['imgAddIndex', 'libraryAdd'].includes(source) && (
                <>
                  <Form.Item label="指标名称" name="name" rules={rules}>
                    <Input type="hidden" />
                    <DebounceSelect
                      mode="tags"
                      allowClear
                      value={selectVal}
                      dropdownClassName="lib_add_index"
                      fetchOptions={fetchIndexList}
                      onChange={handleChangeName}
                      onSelect={handleOnSelect}
                      onClear={handleOnClear}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </>
              )}
              {/* 同时添加单据指标/指标库编辑指标/结构化编辑指标 */}
              {['libraryEdit', 'imgEditIndex'].includes(source) && (
                <Form.Item name="name" rules={rules} label="指标名称">
                  <Input placeholder="请输入指标名称" />
                </Form.Item>
              )}
              <Form.Item name="abbreviation" label="缩写">
                <Input placeholder="请输入指标缩写" />
              </Form.Item>

              <Form.List name="references">
                {(fields, { add, remove }) => {
                  console.log('fields', fields);
                  return (
                    <>
                      <Form.Item key="referenceSelect" label="参考值及单位">
                        <Space>
                          <Select
                            onSelect={setSelectReference}
                            style={{ width: 260 }}
                            placeholder="请选择参考值类型"
                          >
                            {referenceList.map((reference) => (
                              <Option value={reference.value}>{reference.label}</Option>
                            ))}
                          </Select>
                          <Button
                            onClick={() => handleAddReference(add)}
                            type="link"
                            icon={<PlusSquareOutlined />}
                          >
                            添加
                          </Button>
                        </Space>
                      </Form.Item>
                      <Row>
                        <Col span={21}>
                          {fields?.length > 0 &&
                            fields.map((field, index) => (
                              <Form.Item key={field.key} label={referenceMap[references[index]]}>
                                <Space align="baseline">
                                  {['RANGE', 'GT', 'LT', 'AROUND', 'RADIO'].includes(
                                    references[index],
                                  ) && (
                                    <Form.Item {...createFormListProps(field, 'note')}>
                                      <Input placeholder="请输入备注" />
                                    </Form.Item>
                                  )}
                                  {['RANGE', 'GT', 'LT', 'AROUND'].includes(references[index]) && (
                                    <>
                                      <Form.Item
                                        {...createFormListProps(field, 'value')}
                                        rules={
                                          references[index] == 'LT'
                                            ? []
                                            : [{ required: true, message: '请输入参考值' }]
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
                                        {...createFormListProps(field, 'secondValue')}
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
                                      <Form.Item {...createFormListProps(field, 'unit')}>
                                        <Input placeholder="请输入单位" style={{ width: 120 }} />
                                      </Form.Item>
                                    </>
                                  )}
                                  {['RADIO'].includes(references[index]) && (
                                    <Form.Item
                                      {...createFormListProps(field, 'value')}
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
                                      {...createFormListProps(field, 'value')}
                                      rules={[{ required: true, message: '请输入内容' }]}
                                    >
                                      <Input placeholder="请输入内容" style={{ width: 507 }} />
                                    </Form.Item>
                                  )}
                                  <DeleteOutlined
                                    onClick={() => handleRemoveReference(remove, field.name, index)}
                                  />
                                </Space>
                              </Form.Item>
                            ))}
                        </Col>
                        {fields.length > 0 && (
                          <Col span={3}>
                            <Radio.Group
                              value={defaultReference}
                              onChange={(e) => setDefaultReference(e.target.value)}
                            >
                              {fields.map((field, index) => (
                                <Form.Item key={field.key}>
                                  <Radio value={index}>默认</Radio>
                                </Form.Item>
                              ))}
                            </Radio.Group>
                          </Col>
                        )}
                      </Row>
                    </>
                  );
                }}
              </Form.List>

              <Form.Item name="common" rules={rules} label="是否常用：" className="common">
                <Radio.Group>
                  <Radio value>是</Radio>
                  <Radio value={false}>否</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item>
                <div className="common__btn">
                  <Button onClick={handleCloseModal}>取消</Button>
                  <Button htmlType="submit" type="primary">
                    保存
                  </Button>
                </div>
              </Form.Item>
            </Form>
          )}
        </div>
      </DragModal>
    </div>
  );
};

export default EditIndex;
