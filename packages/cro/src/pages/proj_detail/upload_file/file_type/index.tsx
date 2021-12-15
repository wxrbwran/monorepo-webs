import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { Button, message, Upload } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined, FileSearchOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';
import { Role } from 'xzl-web-shared/dist/src/utils/role';
import request from 'umi-request';
import { useSelector } from 'umi';
import styles from './index.scss';
import { IState } from 'typings/global';

interface IProps {
  name: string;
  name2: string;
  type: string;
  imgSrc: string;
}

interface IKey {
  name: string;
  address: string;
  id: string;
}

function FileType({ name, name2, imgSrc, type }: IProps) {
  const { projDetail } = useSelector((state: IState) => state.project);
  const projectSid = window.$storage.getItem('projectSid');
  const [isShowModal, setIsShowModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const toogleUpload = () => {
    setIsShowModal(!isShowModal);
  };

  //获取文件列表
  const fetchFileList = () => {
    if (projectSid) {
      api.detail.getProjectFileList({
        projectSid,
        type,
      }).then((res) => {
        const { fileInfoList } = res;
        setFileList(fileInfoList);
      })
        .catch((err) => {
          message.error(err);
        });
    }
  };

  useEffect(() => {
    if (isShowModal) {
      setFileList([]);
      fetchFileList();
    }
  }, [isShowModal]);

  //上传
  const handleSubmit = (rawUrl: string, fileName: string) => {
    api.detail.addProjectFile({
      address: rawUrl,
      name: fileName,
      projectSid,
      type,
    }).then(() => {
      if (isShowModal) {
        setTimeout(() => {
          setLoading(false);
          message.success('文件上传成功');
          fetchFileList();
        }, 5000);
      }
    })
      .catch((err) => {
        message.error(err);
      });
  };

  const fetchUrlThenUpload = async (file: { name: string, type: string }) => {
    console.log('fileeee', file);
    setLoading(true);
    api.base.filePrepare({ businessType: 300 }).then(res => {
      console.log(432, res);
      const {
        accessId, encodePolicy, host, key, signature,
      } = res;
      const formData = new FormData();
      formData.set('name', file.name);
      formData.set('key', `${key}${file.name}`);
      formData.set('policy', encodePolicy);
      formData.set('OSSAccessKeyId', accessId);
      formData.set('success_action_status', '200');
      formData.set('callback', '');
      formData.set('signature', signature);
      formData.set('file', file);
      console.log('host', host);
      request
        .post(host, {
          data: formData,
        })
        .then(() => {
          handleSubmit(`${host}/${key}${file.name}`, file.name);
        })
        .catch((err) => {
          console.log('error111', err);
        });
    }).catch(err => {
      console.log(err);
      message.error(err);
    });
  };

  const stopPropagation = (e: any) => {
    //ts
    e.stopPropagation();
  };

  //删除文件
  const handleRemove = (fileId: string) => {
    api.detail.deleteProfileFile(fileId).then(() => {
      message.success('删除文件成功');
      fetchFileList();
    })
      .catch((err) => {
        message.error(err);
      });
  };

  const lookFile = (fileId: string) => {
    api.detail.getFileInfo(fileId).then((res) => {
      const aEl = document.getElementById('upload');
      if (aEl && res.convertAddress) {
        aEl.setAttribute('href', res.convertAddress);
        aEl.click();
      }
    })
      .catch((err) => {
        message.error(err);
      });
  };
  const isLeader = [Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(projDetail.roleType);
  const isEdit = isLeader && projDetail.status !== 1001;
  return (
    <>
      <div
        className={styles.box}
        onClick={toogleUpload}
        data-testid="toogleUpload"
      >
        <div className={styles.upload}>
          {
            isEdit && (
              <Upload
                multiple={false}
                listType="text"
                beforeUpload={fetchUrlThenUpload}
                showUploadList={false}
                accept={type === 'INVITER_FILE' ? '.doc,.docx,.xlsx,.xls,.pdf' : ''}
                onClick={stopPropagation}
              // disabled={[Role.MAIN_PI.id, Role.PROJECT_LEADER.id].includes(window.$storage.getItem('croRoleType'))}
              // disabled={true}
              >
                <UploadOutlined />
                <span>上传</span>
              </Upload>
            )
          }

        </div>
        <p className={styles.file}><img src={imgSrc} alt="" /></p>
        <p>{name}</p>
        <p>{name2}</p>
      </div>
      {isShowModal && (
        <DragModal
          visible={isShowModal}
          title={`${name}${name2 && '/'}${name2}`}
          width={800}
          wrapClassName="ant-modal-wrap-center file_modal"
          onCancel={toogleUpload}
          maskClosable
          footer={null}
          className={styles.file_modal}
        >
          <ul>
            {
              fileList.map((item: IKey, index) => (
                <li key={index}>
                  <p>{item.name}</p>
                  <p className={styles.operate}>
                    {
                      (item.name.includes('doc') || item.name.includes('xls')) && (
                        <>
                          <span className={styles.download} onClick={() => lookFile(item.id)}><FileSearchOutlined />  查看</span>
                        </>
                      )
                    }
                    <a id="upload" style={{ display: 'none' }} target="_blank"></a>
                    <a className={styles.download} href={item.address}><DownloadOutlined /> 下载</a>
                    {
                      isEdit && <span onClick={() => handleRemove(item.id)}><DeleteOutlined /> 删除</span>
                    }
                  </p>
                </li>
              ))
            }
            {
              fileList.length === 0 && (
                <span className={styles.no_file}>暂无文件</span>
              )
            }
          </ul>
          {
            isEdit && (
              <Upload
                multiple={false}
                listType="text"
                beforeUpload={fetchUrlThenUpload}
                showUploadList={false}
                accept={type === 'INVITER_FILE' ? '.doc,.docx,.xlsx,.xls,.pdf' : ''}
                onClick={stopPropagation}
              >
                <Button type="primary" data-testid='uploadBtn' loading={loading}>
                  {loading ? '上传中' : '上传'}
                </Button>
              </Upload>
            )
          }
        </DragModal>
      )}
    </>
  );
}

export default FileType;
