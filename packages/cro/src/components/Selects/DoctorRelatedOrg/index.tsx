import React, { useEffect } from 'react';
import { Select, Form } from 'antd';
import { useSelector, useDispatch } from 'umi';
import styles from '../index.scss';
import { IState, ISubject } from 'typings/global';

const { Option } = Select;
function DoctorRelatedOrg() {

  const filterOrgs: ISubject[] = useSelector((state: IState) => state.user.filterOrgs);
  const dispatch = useDispatch();

  console.log('======================= filterOrgs filterOrgs', JSON.stringify(filterOrgs));
  // const [selectOrgList, setSelectOrgList] = useState<ISubject[]>([]);
  useEffect(() => {

    dispatch({
      type: 'user/fetchUserOrganizations',
      payload: {},
    });

    // const params = { sid: localStorage.getItem('xzl-web-doctor_sid') };
    // api.research.fetchDoctorRelatedOrg(params).then((res: { teams: ITeam[] }) => {
    //   const organizations: ISubject[] = [];
    //   res.teams.forEach((item) => {
    //     item.members.forEach((member: ISubject) => {
    //       if (member.role === Role.ORG.id) {
    //         organizations.push({
    //           ...member,
    //           nsId: item.teamNSId,
    //         });
    //       }
    //     });
    //   });
    //   // setSelectOrgList(organizations)
    // });
    // fetchDoctorRelatedOrg
  }, []);

  return (
    <div className={styles.org_select}>
      <Form.Item noStyle name="orgId">
        <Select placeholder="全部机构" style={{ width: 106 }}>
          <Option value="">全部机构</Option>
          {
            filterOrgs.map(({ nsId, name, id }) => (
              <Option value={nsId} title={name} key={id}>
                {name}
              </Option>
            ))
          }
        </Select>
      </Form.Item>
    </div>
  );
}
export default DoctorRelatedOrg;
