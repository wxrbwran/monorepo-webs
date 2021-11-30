
import React from 'react';

import TemplateRule from '../components/TemplateRule';
// import * as api from '@/services/api';


function CRFScale() {

  // const [dragModalSources, setDragModalSources] = useState<ContentListModel[]>([]);
  // const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  // // 查询随访表列表
  // const getPublicizeScaleList = () => {
  //   api.education.getPublicizeScale({
  //     operatorSid: window.$storage.getItem('sid'),
  //     operatorWcId: window.$storage.getItem('wcId'),
  //     ownershipSid: currentOrgInfo.sid,
  //     roleType: window.$storage.getItem('roleId'),
  //   }).then((res) => {

  //     setDragModalSources(res.list);
  //   })
  //     .catch((err: string) => {
  //       message.error(err?.result);
  //     });
  // };

  // const dragModalDidShow = () => {

  //   getPublicizeScaleList();
  // };

  return (
    <div className='ml-100 mt-100'>
      <TemplateRule
        pageType='suifang'
        onCancelClick={() => { }}
        onSaveClick={(data: { ruleDoc: any }) => {
          console.log('============= onSaveClick suifang', JSON.stringify(data));
        }}>
      </TemplateRule>
    </div>
  );
}

export default CRFScale;
