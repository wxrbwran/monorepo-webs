import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useSelector, useParams } from 'umi';
import * as api from '@/services/api';
import CreateBox from '../../components/create_box';
// import type { IValues } from '../const';
import PlanItem from '../components/PlanItem';

import { Tabs } from 'antd';

import styles from './index.scss';

const { TabPane } = Tabs;
const EducationDetail: FC<ILocation> = ({ location }) => {
  const sourceType: string =  useParams<{ type: string }>()?.type;
  const isScale = location.pathname.includes('suifang');
  const [sendContent, setSendContent] = useState([]);
  const currentOrgInfo = useSelector((state: IState) => state.user.currentOrgInfo);

  useEffect(() => {
    api.education
      .getSendContent({
        sourceType: isScale ? 2 : 3,
        pageSize: 9999,
        page: 1,
        operatorSid: window.$storage.getItem('sid'),
        operatorRole: window.$storage.getItem('currRoleId'),
        operatorNsId: window.$storage.getItem('nsId'),
        ownershipSid: currentOrgInfo.sid,
        ownershipRole: currentOrgInfo.role,
        ownershipNsId: currentOrgInfo.nsId,
      })
      .then((res) => {
        console.log('-----23', JSON.stringify(res.rules));
        const oData = [{
          'localRules': [
            {
              'frequencyType': 'once',
              'custom': [
                1,
              ],
              'time': 'ADMISSION_TIME',
              'conditions': [
                {
                  'min': 1,
                  'max': 22,
                  'type': 'age',
                },
                {
                  'id': '47526',
                  'type': 'diagnosis',
                  'value': '从1米或1米以上的高处意外跌落',
                },
              ],
              'content': [
                {
                  'inSchedule': true,
                  'edit': false,
                  'del': false,
                  'id': 152,
                  'type': 4,
                  'content': {
                    'filename': 'avatar_doctor.jpg',
                    'address': 'https://xzl-user-avatar.oss-cn-hangzhou.aliyuncs.com/test/0/f3b663b3-5439-42ba-adae-8528307150a8avatar_doctor.jpg',
                    'size': 9038,
                    'convertAddress': 'https://xzl-user-avatar.oss-cn-hangzhou.aliyuncs.com/test/0/f3b663b3-5439-42ba-adae-8528307150a8avatar_doctor.jpg',
                  },
                },
              ],
              'group': [
                '全部患者',
              ],
            },
          ],
          'meta': {
            'sourceType': 3,
            'actionId': 6014,
            'teamLocations': [
              {
                'role': 16,
                'ns': 1252,
                'tag': 'operator',
                'sid': 1401,
              },
              {
                'role': 5,
                'ns': 1232,
                'tag': 'ownership',
                'sid': 1060,
              },
            ],
          },
          'rules': [
            {
              'match': {
                'should_1': [
                  {
                    'team.role': {
                      'starting': false,
                      'value': '57',
                      'operator': '=',
                    },
                    'team.subject': {
                      'starting': false,
                      'value': '1401',
                      'operator': '=',
                    },
                  },
                ],
                'must': [
                  {
                    'team.role': {
                      'starting': false,
                      'value': '5',
                      'operator': '=',
                    },
                    'team.subject': {
                      'starting': false,
                      'value': '1060',
                      'operator': '=',
                    },
                    'team.init_time': {
                      'starting': true,
                      'value': '*',
                      'operator': '=',
                    },
                  },
                  {
                    'basic.age': {
                      'starting': false,
                      'value': '[1,22)',
                      'operator': '<>',
                    },
                  },
                  {
                    'undefined': {
                      'starting': false,
                      'value': '47526',
                      'operator': '=',
                    },
                  },
                ],
              },
              'title': '',
              'actions': [
                {
                  'type': 'once',
                  'params': {
                    'period': 1,
                    'unit': 'day',
                    'delay': 32400,
                    'sourceMember': [
                      {
                        'sourceId': 152,
                      },
                    ],
                  },
                },
              ],
            },
          ],
          'id': 'PIOgbn0B-tzgnWKX7cu5',
          'createdAtTime': 1638238593212,
          'deletedAtTime': 9223372036854776000,
        }];
        setSendContent(oData);
      })
      .catch((err: string) => {
        console.log('err', err);
      });
  }, [currentOrgInfo, location]);

  console.log('=====121', location);

  return (
    <div className={styles.patient_edu}>
      <CreateBox toAddress={`/publicize/${sourceType}/create`} />
      <Tabs defaultActiveKey="1" onChange={() => {}}>
        <TabPane tab="发送中" key="1">
          {sendContent.map((sen) =>  <PlanItem data={sen} />)}
        </TabPane>
        <TabPane tab="已停止" key="2">
         {sendContent.map((sen) =>  <PlanItem data={sen} status="stop" />)}
        </TabPane>
      </Tabs>

    </div>
  );
};

export default EducationDetail;
