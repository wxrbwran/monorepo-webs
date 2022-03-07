import React, { FC, useState, useEffect, useMemo, useRef } from 'react';
import { Space, Form, Input, Select, Button } from 'antd';
import { useSelector } from 'umi';
import EditIndex from '@/components/EditIndex';
import { ProFormDependency } from '@ant-design/pro-form';
import { getReferenceTitle } from 'xzl-web-shared/dist/utils/tool';
import { yinYang } from 'xzl-web-shared/dist/utils/consts';
import { searchHighLight } from '@/utils/utils';

const { Option } = Select;

interface IProps {
  item: any;
  form: any;
  onSuccess: (p: TIndexItem) => void;
  lightKeyWord: string;
}

const RenderItem: FC<IProps> = (props) => {
  const { item, form, onSuccess, lightKeyWord } = props;
  const [list, setList] = useState<any[]>([]);
  const [indexItem, setIndexItem] = useState<any>(item);
  const curDocument = useSelector((state: IState) => state.document.curDocument);
  const sid = window.$storage.getItem('sid');
  const countRef = useRef([0]);
  useEffect(() => {
    console.log('====22221', form.getFieldValue(`${indexItem.formIndex}_referenceList`));

    // const
    // console.log('RenderItem', indexItem);
    if (indexItem.referenceList) {
      const initCount: number[] = [];
      setList(indexItem.referenceList.map(((iRefItem: any, inx: number) => {
        initCount.push(inx);
        return { ...iRefItem, formIndex: inx };
      })));
      countRef.current = initCount;
      // [`${formIndex}_valueCount`]: referenceList ? referenceList.map((item, inx) => inx) : [0],
    } else {
      // 用于初始化一个空组件
      setList((prev) => [...prev, { value: '', key: +new Date(), formIndex: 0 }]);
    }
  }, [indexItem.referenceList]);
  const handleEditIndex = (param: TIndexItem) => {
    setIndexItem((prev: any) => ({ ...prev, ...param }));
    form.setFieldsValue({
      [`${indexItem.formIndex}_name`]: param.name,
      [`${indexItem.formIndex}_abbreviation`]: param.abbreviation,
      [`${indexItem.formIndex}_referenceList`]: param.references,
    });
    const defaultRefer = param.references ? param.references.filter(i => i.isDefault)[0].id : null;
    if (defaultRefer) {
      const formValues = form.getFieldsValue();
      Object.keys(formValues).forEach(formKey => {
        if (formKey.endsWith('reference') && Number(formKey.split('_')[0]) === indexItem.formIndex) {
          form.setFieldsValue({
            [formKey]: defaultRefer,
          });
        }
      });
    }

    onSuccess({ ...indexItem, ...param });
  };
  const formatOption = (reference: TReference) => {
    if (reference.type === 'RADIO') {
      return `${reference.note || ''} ${reference.value === 'YIN' ? '阴' : '阳'}`;
    } else if (reference.type === 'OTHER') {
      return reference.value;
    } else {
      return `${reference.note || ''} ${getReferenceTitle(reference)} ${reference.unit || ''}`;
    }
  };
  console.log('=====indexItem', indexItem);
  const renderName = useMemo(() => (name: string) => {
    return searchHighLight(name, lightKeyWord);
  }, [lightKeyWord]);
  return (
    <div className="flex w-full">
      <Form.Item initialValue={indexItem.name} name={`${indexItem.formIndex}_name`}>
        <Input readOnly type="hidden" />
      </Form.Item>
      <span
        style={{ flex: '1 0 100px', maxWidth: '300px' }}
        className="truncate"
        dangerouslySetInnerHTML={{ __html: renderName(item.name) }}
      >

      </span>
      <div className="mx-10">
        <Form.Item
          initialValue={indexItem.abbreviation}
          name={`${indexItem.formIndex}_abbreviation`}
          style={{ width: 75 }}
        >
          <Input readOnly />
        </Form.Item>
      </div>
      <div>
        {list.map((_item, index) => (
          <Form.Item noStyle key={`${_item.key}`}>
            <Space align="baseline" style={{ display: 'flex' }}>
              <ProFormDependency name={[`${indexItem.formIndex}_${_item.formIndex}_reference`]}>
                {(deps: any) => {
                  // console.log('deps', deps);
                  const referenceId = deps[`${indexItem.formIndex}_${_item.formIndex}_reference`];
                  let disabled = true;
                  if (!indexItem?.references || indexItem?.references?.length === 0) {
                    disabled = false;
                  }
                  if (indexItem?.references?.length > 0 && referenceId) {
                    disabled = false;
                  }
                  const curReference = item.references?.filter(
                    (r: TReference) => r.id === referenceId,
                  )[0];
                  if (curReference?.type === 'RADIO') {
                    return (
                      <Form.Item name={`${indexItem.formIndex}_${_item.formIndex}_indexValue`} noStyle>
                        <Select style={{ width: 90 }} placeholder="请选择" disabled={disabled}>
                          {yinYang.map((yy: Record<string, string>) => (
                            <Option key={yy.value} value={yy.value}>
                              {yy.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    );
                  }
                  return (
                    <Form.Item
                      name={`${indexItem.formIndex}_${_item.formIndex}_indexValue`}
                      style={{ width: 90 }}
                      // rules={[{ required: true, message: '请输入参考值' }]}
                    >
                      <Input placeholder="请输入数值" disabled={disabled} />
                    </Form.Item>
                  );
                }}
              </ProFormDependency>
              {indexItem?.references?.length > 0 ? (
                <>
                  <Form.Item name={`${indexItem.formIndex}_${_item.formIndex}_reference`}>
                    <Select style={{ width: 203 }} placeholder="请选择参考值类型">
                      {indexItem.references?.map((reference: TReference) => (
                        <Option
                          key={`${indexItem.formIndex}_${reference.id}`}
                          value={reference.id}
                          title={formatOption(reference)}
                        >
                          {formatOption(reference)}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </>
              ) : <div style={{ width: 203 }}></div>}
              {!indexItem.referenceList && (
                <Form.Item>
                  {index === 0 && (
                    <Space>
                      <Button
                        type="primary"
                        ghost
                        onClick={() => {
                          const newI = Math.max(...countRef.current) + 1;
                          countRef.current = [...countRef.current, newI];
                          setList((prev) => [...prev, { value: '', key: +new Date(), formIndex: newI }]);
                          form.setFieldsValue({
                            [`${indexItem.formIndex}_valueCount`]: countRef.current,
                            [`${indexItem.formIndex}_${newI}_reference`]: indexItem?.references.filter(re => re.isDefault)?.[0]?.id,
                          });
                        }}
                      >
                        添加更多
                      </Button>
                      {curDocument.source === 'DOCTOR' && curDocument.sourceSid === sid && (
                        <EditIndex
                          initFormVal={indexItem}
                          onSuccess={handleEditIndex}
                          source="imgEditIndex"
                        >
                          <Button type="primary" ghost>
                            编辑
                          </Button>
                        </EditIndex>
                      )}
                    </Space>
                  )}
                  {index > 0 && (
                    <Button
                      danger
                      onClick={() => {
                        setList((prev) => prev.filter((p) => p.key !== _item.key));
                        const prevCount = countRef.current;
                        prevCount.splice(index, 1);
                        countRef.current = prevCount;
                        form.setFieldsValue({
                          [`${indexItem.formIndex}_valueCount`]: prevCount,
                        });
                      }}
                    >
                      删除
                    </Button>
                  )}
                </Form.Item>
              )}
              <div className="w-0 h-0">
                <Form.Item name={`${indexItem.formIndex}_valueCount`}>
                  <Input type="hidden" />
                </Form.Item>
                <Form.Item name={`${indexItem.formIndex}_referenceList`}>
                  <Input type="hidden" />
                </Form.Item>
              </div>
            </Space>
          </Form.Item>
        ))}
      </div>
    </div>
  );
};

export default RenderItem;
