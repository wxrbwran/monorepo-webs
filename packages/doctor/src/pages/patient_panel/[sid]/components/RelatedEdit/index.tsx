import React, { useState } from 'react';
import DragModal from '@/components/DragModal';
import RelatedHistory from '@/components/RelatedHistory';

interface Iprops {
  children: React.ReactElement;
}
function RelatedEdit({ children }: Iprops) {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  // 虽然用了Form,但InputNumber控件必须用传统defaultValue及onchange的方式，不知道其原因
  // Checkbox控件及Select的multiple类型仍使用传统defaultValue及onchange的方式，是因为所需的数据格式需要进行转换
  // RedioGroup控件之所以也用onChange是因为FieldsVal更新不会自动触发DOM渲染，而页面中用到了form.getFieldsVal的值
  return (
    <>
      <div className="rightAddbtn patientEditBtn" onClick={toggleShowModal}>
        {children}
      </div>
      {showModal && (
        <DragModal
          wrapClassName="ant-modal-wrap-center"
          width="580px"
          visible={showModal}
          title="家族史 吸烟史 饮酒史 过敏史"
          onCancel={() => setShowModal(false)}
          footer={null}
          className="modal"
        >
          {
            showModal && <RelatedHistory closeModal={() => setShowModal(false)} />
          }
        </DragModal>
      )}
    </>
  );
}

export default RelatedEdit;
