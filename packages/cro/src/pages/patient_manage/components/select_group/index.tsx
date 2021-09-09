import React, { useState } from 'react';
import { Button, Select, message} from 'antd';
import DragModal from 'xzl-web-shared/src/components/DragModal';
import { useSelector } from 'react-redux';
import * as api from '@/services/api';
import { IState } from 'typings/global';
import { debounce } from 'lodash';
const Option = Select.Option;

interface IProps {
  children: string;
  selectPatient: string[];
  refreshList: () => void;
}

function SelectGroup(props: IProps) {
  const [isShowSelectGroup, setIsShowSelectGroup] = useState(false);
  const [selectGroup, setSelectGroup] = useState('');
  const {projectNsId} = useSelector((state: IState) => state.project.projDetail)
  const groupList = useSelector((state: IState) => state.project.objectiveGroup);
  const handleShowGroup = () => {
    if (props.selectPatient.length === 0) {
      message.error('请勾选患者');
    } else {
      setIsShowSelectGroup(true);
    }

  }
  const handleSelectGroup = (value: string) => {
    setSelectGroup(value)
  }
  const handleJoinGroup = () => {
    if (!selectGroup){
      message.error('请选择小组')
    } else {
      const params = {
        projectNsId,
        groupId: selectGroup,
        patientSIds: props.selectPatient,
      }
      api.patientManage.postGroupPatient(params).then(res => {
        message.success('加入成功');
        setIsShowSelectGroup(false);
        props.refreshList();
      })
    }
  }
  return (
    <>
      <Button
        className="send-btn-cro"
        type="primary"
        onClick={handleShowGroup}
      >
        {props.children}
        </Button>
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        className="select-group-modal"
        width="800px"
        visible={isShowSelectGroup}
        title='选择小组'
        onCancel={() => setIsShowSelectGroup(false)}
        footer={null}
      >
        <div className="select-group">
          <span className="tit">小组名称</span>
          <Select defaultValue="下拉选择小组" style={{ width: 300 }} onChange={handleSelectGroup}>
            {
              groupList.map((item: IGroupList) => {
                return (
                  <Option key={item.groupId} value={item.groupId}>{item.groupName}</Option>
                )
              })
            }
          </Select>
         <div className="submit-btn-style1">
            <Button onClick={() => setIsShowSelectGroup(false)} > 取消 </Button>
            <Button type="primary" onClick={debounce(handleJoinGroup, 300)} > 确定 </Button>
         </div>
        </div>
      </DragModal>
    </>
  )
}

export default SelectGroup;
