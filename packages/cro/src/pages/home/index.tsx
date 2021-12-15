import React, { useState, useEffect } from 'react';
import SideBar from './components/side-bar';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
// import ProjectInvite from '@/components/ProjectInvite';
import CreateProject from './components/create-project';
import { useSelector, useDispatch } from 'react-redux';
import TabBar from './components/tab-bar';
import styles from './index.scss';
import { message } from 'antd';

interface IProps {
  location: {
    pathname: string;
  };
}

interface IState {
  project: {
    projectList: {
      name: string;
      projectSid: string;
    }[]
  }
}

function Home(props: IProps) {
  const dispatch = useDispatch();
  const [isShowProject, setIsShowProject] = useState(false);
  const projectList = useSelector((state: IState) => state.project.projectList);

  const user = useSelector((state: IState) => state.user.user);

  useEffect(() => {
    dispatch({
      type: 'project/fetchProjectList',
      payload: null,
    });
  }, []);
  console.log('为构建添加console');

  const onCreateNewProject = () => {

    const practiceAreas = user.roles[0].subject.practiceAreas;
    if (practiceAreas && practiceAreas.length > 0) {
      setIsShowProject(true);
    } else {
      message.error('该医生没有第一执业医院');
    }
    console.log('=============== practiceAreas practiceAreas, ', JSON.stringify(practiceAreas));
  };

  return (
    <div className={styles.home}>
      <SideBar projectList={projectList} location={props.location} />
      <div className={styles.home_main}>
        <div className={styles.create_project} onClick={onCreateNewProject}>
          创建新项目
        </div>
        <TabBar />
      </div>
      {/* <ProjectInvite/> */}
      <DragModal
        wrapClassName="ant-modal-wrap-center"
        width="800px"
        visible={isShowProject}
        title='创建项目'
        onCancel={() => setIsShowProject(false)}
        footer={null}
      >
        <CreateProject onCloseModal={() => setIsShowProject(false)} />
      </DragModal>
    </div>
  );
}
// export default connect()(Home)

export default Home;
