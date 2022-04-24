import React, { FC, useEffect, useState } from 'react';

const SideOrgs: FC = () => {
  const [total, setTotal] = useState(0);
  const sid = window.$storage.getItem('sid');
  const sRole = window.$storage.getItem('rold');
  useEffect(() => {
    window.$api.personnel.getPersonnel({ sid, pageAt:1, pageSize: 1, viewRole: 'test.YWLRAe' }).then(res => {
      console.log(res);
      setTotal(res.total);
    });
  }, []);
  return (
    <div>
      <div className='px-30 py-9 cursor-pointer bg-gray-100'>
        总公司
        <span className='text-gray-500 ml-3 '>({total}人)</span>
      </div>
      {/* <div className='px-30 py-9 cursor-pointer'>
        xxxxxx公司
        <span className='text-gray-500 ml-3 '>(99人)</span>
      </div> */}
    </div>
  );
};

export default SideOrgs;

