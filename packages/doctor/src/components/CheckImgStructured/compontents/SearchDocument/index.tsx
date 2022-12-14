import React, { FC, useState, useEffect } from 'react';
import { Form, Button } from 'antd';
import { debounce } from 'lodash';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import SubType from '../SubType';
import SearchHYD from '../SearchHYD';

interface IProps {
  type: string;
  mode: 'add' | 'edit' | 'search';
  record?: TIndexItem;
  clickEvent?: string;
  handleSelectTypeIndex?: any;
  documentType?: any;
}
const SearchDocument: FC<IProps> = (props) => {
  const { type, mode, record, children, clickEvent, handleSelectTypeIndex, documentType } = props;
  // console.log('record', record);
  console.log('propsprops111', props);
  const [sampleFroms, setSampleFroms] = useState<string[]>(['血液']);
  const [showModal, setshowModal] = useState(false);
  const [form] = Form.useForm();
  const [source, setSource] = useState({});
  const [library, setLibrary] = useState(false);
  // const [listEmpty, setlistEmpty] = useState(false);
  // console.log('添加record', record);
  useEffect(() => {
    if (record) {
      form.setFieldsValue({ ...record });
    }
  }, [record]);

  const toggleShowModal = () => {
    setshowModal(false);
  };
  const selectReturn = (data: any) => {
    setSource(data);

  };
  const isLibrary = (data: boolean) => {
    setLibrary(data);
  };
  const handleConfirm = async () => {
    // 这里只把选中的项返回出去，选中的大分类下的指标数据，由customIndex组件请求接口获取
    console.log('******99', source);
    handleSelectTypeIndex(source);
    setshowModal(false);
  };
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  const submitLayout = {
    wrapperCol: { span: 24 },
  };
  const handleShow = () => {
    setshowModal(true);
  };
  return (
    <div>
      <span  {...{ [clickEvent || 'onClick']: handleShow }} >{children}</span>
      <DragModal
        title={mode === 'search' ? '搜索' : ''}
        footer={null}
        width={600}
        visible={showModal}
        onCancel={() => setshowModal(false)}
        destroyOnClose
      >
        <div>
          <Form
            {...layout}
            form={form}
            name="basic"
            onFinish={debounce(handleConfirm, 300)}
            preserve={false}
            id="height42"
          >
            {type === 'HYD' && (
              <>
                <div className="flex items-center structured-edit-wrap">
                  <span>*</span>
                  <SubType
                    leve1Type={'HYD'}
                    handleChangeSubType={setSampleFroms}
                    initSampleFrom={sampleFroms}
                  />
                </div>
                <div className="flex items-center structured-edit-wrap">
                  <span>*</span>
                  <SearchHYD
                    sampleFroms={sampleFroms}
                    handleSelectTypeIndex={handleSelectTypeIndex}
                    // imageId={imageId}
                    documentType={documentType}
                    external={true}
                    selectResult={selectReturn}
                    isLibrary={isLibrary}
                  />
                </div>
              </>
            )}
            <Form.Item style={{ textAlign: 'center' }} {...submitLayout}>
              <div className="common__btn">
                <Button onClick={toggleShowModal}>取消</Button>
                <Button className="finish" htmlType="submit" type="primary" disabled={library ? false : true}>
                  确定
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </DragModal>
    </div>
  );
};

export default SearchDocument;
