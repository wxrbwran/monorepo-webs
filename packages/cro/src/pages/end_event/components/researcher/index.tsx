import React, { useState, useEffect} from 'react';
import * as api from '@/services/api';
import { Select, Form } from 'antd';
import { useSelector } from 'umi';
import { IState } from 'typings/global';

const { Option } = Select;
function Researcher() {
  const [researchers, setResearchers] = useState([]);
  const commonSelectStyle = { width: 106, marginLeft: 10, height: 34 };
  const { projectNsId } = useSelector((state: IState) => state.project.projDetail);
  useEffect(() => {
    api.event.fetchResearchers(projectNsId).then((res) => {
      setResearchers(res.infos);
    })
    .catch((err) => {
      console.log('err', err);
    });
  }, [])
  return (
    <Form.Item noStyle name="doctorSid">
      <Select
        placeholder="全部研究者"
        style={commonSelectStyle}
        defaultValue={""}
      >
        <Option value="">全部研究者</Option>
        {
          researchers.map(({subjectId, subjectName})=> (
            <option value={subjectId} title={subjectName} key={subjectId}>
              {subjectName}
            </option>
          ))
        }
      </Select>

    </Form.Item>
  );
}
export default Researcher;
