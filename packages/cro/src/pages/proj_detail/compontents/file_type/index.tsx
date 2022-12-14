import React, { useState, useEffect } from 'react';
import * as api from '@/services/api';
import { Button, message, Upload } from 'antd';
import { UploadOutlined, DownloadOutlined, DeleteOutlined, FileSearchOutlined, EditOutlined } from '@ant-design/icons';
import DragModal from 'xzl-web-shared/dist/components/DragModal';
import { Role } from 'xzl-web-shared/dist/utils/role';
import request from 'umi-request';
import { useSelector } from 'umi';
import CreateFile from '../create_file';
import styles from './index.scss';
import { IState } from 'typings/global';
import { handleOperationLog } from '@/utils/logReason';

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
  convertAddress?: string;
}

function FileType({ name, name2, imgSrc, type }: IProps) {
  const { projDetail } = useSelector((state: IState) => state.project);
  const projectSid = window.$storage.getItem('projectSid');
  const [isShowModal, setIsShowModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const typeText = {
    PROJECT_FILE: { tit: '试验文件', delCode:  window.$log.businessType.DELETE_TEST_FILE.code },
    INVITER_FILE: { tit: '项目邀请书、知情同意书', delCode: window.$log.businessType.DELETE_INFORMED_CONSENT.code },
    RISK_FILE: { tit: '风险评估、风险对策', delCode: window.$log.businessType.DELETE_RISK_ASSESSMENT.code },
  };

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
    // PROJECT_FILE
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
      // 上传写入到日志
      handleOperationLog({
        type: 0,
        copyWriting: `上传${ typeText[type].tit} - ${fileName}`,
      });
      // 上传写入到日志
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
  const handleRemove = (fileId: string, address: string, filename: string) => {
    api.detail.deleteProfileFile(fileId).then(() => {
      message.success('删除文件成功');
      fetchFileList();
      window.$log.handleOperationLog({
        type: 2,
        copyWriting: `删除${ typeText[type].tit} - ${filename}`,
        oldParams: {
          content: address,
        },
        businessType: typeText[type].delCode,
      });
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
  const uploadProps = {
    multiple: false,
    listType: 'text',
    beforeUpload: fetchUrlThenUpload,
    showUploadList: false,
    accept: (type === 'INVITER_FILE' || type === 'PROJECT_FILE') ? '.doc,.docx,.xlsx,.xls,.pdf' : '',
    onClick: stopPropagation,
  };
  const createFileProps = {
    projectSid,
    type,
    fetchFileList,
  };
  return (
    <>
      <div
        className={styles.box}
        data-testid="toogleUpload"
      >
        <div className={styles.upload}>
          {
            isEdit && (
              type === 'RISK_FILE' ? (
                <CreateFile {...createFileProps}>
                  <span className="text-gray-400 text-xs"> <EditOutlined />创建</span>
                </CreateFile>
              ) : (
                <Upload {...uploadProps} >
                  <UploadOutlined />
                  <span>上传</span>
                </Upload>
              )
            )
          }
        </div>
        <div onClick={toogleUpload}>
          <p className={styles.file}><img src={imgSrc} alt="" /></p>
          <p>{name}</p>
          <p>{name2}</p>
        </div>
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
                    <a id="upload" style={{ display: 'none' }} target="_blank" href={item.address}>11</a>
                    {
                      (type === 'RISK_FILE' && !(item.name.includes('doc') || item.name.includes('xls'))) ?
                        <span className={styles.download}>
                          <CreateFile {...createFileProps} initData={item} readonly={true}>
                            <span><FileSearchOutlined /> 查看</span>
                          </CreateFile>
                        </span>
                        :
                        <a className={styles.download} href={item.address}><DownloadOutlined /> 下载</a>
                    }
                    {
                      // 对于富文本的文件才有编辑
                      isEdit && type === 'RISK_FILE' && !item.convertAddress && (
                        <CreateFile {...createFileProps} initData={item} readonly={false} fileId={item.id}>
                          <span><EditOutlined /> 编辑</span>
                        </CreateFile>
                      )
                    }
                    {
                      isEdit && <span className="ml-20" onClick={() => handleRemove(item.id, item.convertAddress || item.address, item.name)}><DeleteOutlined /> 删除</span>
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
              type === 'RISK_FILE' ? (
                <CreateFile {...createFileProps}>
                  <Button type="primary" data-testid='uploadBtn' loading={loading}>
                    {loading ? '创建中' : '创建'}
                  </Button>
                </CreateFile>
              ) : (
                <Upload  {...uploadProps}>
                  <Button type="primary" data-testid='uploadBtn' loading={loading}>
                    {loading ? '上传中' : '上传'}
                  </Button>
                </Upload>
              )
            )
          }
        </DragModal>
      )}
    </>
  );
}

export default FileType;
