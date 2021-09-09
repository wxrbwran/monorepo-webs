import React, {useState, useEffect} from 'react';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { Button, Checkbox, message } from 'antd';
import { useSelector } from 'umi';
import * as api from '@/services/api';
import { IState } from 'typings/global';
import { debounce } from 'lodash';

interface IProps {
  children: string;
  refreshList: () => void;
  patientSids: string[]
}
interface IFile {
  id: string;
  name: string;
}
interface IOptions {
  label: string;
  value: string;
}
function SendFile(props: IProps) {
  const projectSid = window.$storage.getItem('projectSid');
  const [selectFile, setSelectFile] = useState<string[]>([]);
  const [isShowFile, setIsShowFile] = useState(false);
  const [options, setOPtions] = useState<IOptions[]>([]);
  const [loading, setLoading] = useState(false);
  const doctorInfo = useSelector((state: IState) => state.user.user);
  const doctorName = doctorInfo?.roles?.[0]?.subject?.name;
  const doctorWcId = doctorInfo.wcId;
  const projDetail = useSelector((state: IState) => state.project.projDetail);
  const handleShowFile = () => {
    setIsShowFile(true);
    setSelectFile([]);
    if (options.length === 0) {
      api.detail.getProjectFileList({projectSid, type: 'INVITER_FILE' }).then(res => {
        const options: IOptions[] = [];
        res.fileInfoList.forEach((item: IFile) => {
          options.push({
            label: item.name,
            value: item.id,
          })
        })
        setOPtions(options);
      })
    }
  }
  function handleSeleFile(checkedValues: any[]) {
    console.log('checked = ', checkedValues);
    setSelectFile(checkedValues);
  }
  const handleSendFile = () => {
    setLoading(true);
    const params = {
      doctorName,
      doctorWcId,
      duration: projDetail.detail.duration,
      fileIds: selectFile,
      projectName: window.$storage.getItem('projectName'),
      projectNsId: projDetail.projectNsId,
      projectSid: window.$storage.getItem('projectSid'),
      sid: projectSid
    }
    console.log('params', params)
    api.patientManage.postSendFile(params).then(res => {
      message.success('发送成功');
      props.refreshList();
      setIsShowFile(false);
      setLoading(false);
    })
  }

  return (
    <>
      <Button

        type="primary"
        disabled={props.patientSids.length === 0}
        onClick={debounce(handleShowFile, 300)}
        loading={loading}
      >
          {props.children}
        </Button>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="800px"
        visible={isShowFile}
        title='选择文件发送'
        onCancel={() => setIsShowFile(false)}
        footer={null}
      >
        <div className="choice-send-file">
          {
            options.length > 0 ? (
              <>
                <Checkbox.Group options={options} defaultValue={['Pear']} onChange={(e) => handleSeleFile(e)} />
                <div className="submit-btn-style1" style={{ marginTop: 0 }}>
                  <Button onClick={() => setIsShowFile(false)} > 取消 </Button>
                  <Button type="primary" onClick={handleSendFile} loading={loading} disabled={selectFile.length===0}> 确定 </Button>
                </div>
              </>
            ) : '暂未上传邀请文件'
          }

        </div>
      </DragModal>

    </>
  )
}

export default SendFile;
