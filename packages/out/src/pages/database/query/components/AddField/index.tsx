import React, { useState, useEffect } from 'react';
import { Checkbox, Button, message } from 'antd';
import { baseOption, extOptions } from '../../consts';
import DragModal from 'xzl-web-shared/dist/src/components/DragModal';

interface IProps {
  children: React.ReactElement;
  changeTitle: string[];
  handleChangeTitle: (title: string[]) => void;
  handleSearchData: (type: string, image: IQuery) => void;
}
function AddField({ children, changeTitle, handleChangeTitle, handleSearchData }: IProps) {
  const [isShowModal, setIsShowModal] = useState(false);
  const [checkTitle, setCheckTitle] = useState<string[]>(changeTitle);

  const options = [...baseOption, ...extOptions];

  const fourHigh = ['HYPERTENSION', 'HYPERGLYCEMIA', 'HYPERLIPEMIA', 'HYPERURICEMIA'];

  useEffect(() => {
    setCheckTitle(changeTitle);
    // handleChangeTitle(changeTitle)
  }, [changeTitle]);

  const handleChangeField = () => {
    const addNewFields = checkTitle.filter((item) => !changeTitle.includes(item));
    if (addNewFields.length === 0) {
      handleChangeTitle(checkTitle);
    } else {
      // 新增加的字段，更新redux，调用查询接口
      const imgs: queryImage[] = [];
      const hourH: string[] = [];
      const expandFields = checkTitle.filter(
        (item) => !['name', 'orgName', 'sex', 'age', 'province'].includes(item),
      );
      expandFields.forEach((item) => {
        const fieldType = item.toUpperCase();
        if (fourHigh.includes(fieldType)) {
          hourH.push(fieldType);
        } else {
          imgs.push({
            imageType: fieldType,
            startAt: null,
            endAt: null,
          });
        }
      });
      const obj: CommonData = {};
      const newImages = [...imgs].reduce((cur, next) => {
        if (!obj[next.imageType]) {
          obj[next.imageType] = true;
          cur.push(next);
        }
        return cur;
      }, []);
      if (imgs.length > 0) {
        // dispatch({
        //   type: 'query/setImages',
        //   payload: [...newImages]
        // });
        handleSearchData('', [...newImages]);
      }
      // if(hourH.length>0){
      //   dispatch({
      //     type: 'query/setOther',
      //     payload: {
      //       fourHigh: other?.fourHigh ? [...other.fourHigh, ...hourH] : [...hourH],
      //     }
      //   });
      // }
    }

    setIsShowModal(false);
  };

  function onChange(checkedValues: any) {
    if (checkedValues.length === 0) {
      message.error('请至少保留一个字段');
    } else {
      setCheckTitle(checkedValues);
      console.log('checked = ', checkedValues);
    }
  }
  return (
    <>
      <span onClick={() => setIsShowModal(true)}>{children}</span>
      <DragModal
        wrapClassName="ant-modal-wrap-center add-field-modal"
        width="800px"
        visible={isShowModal}
        title="选择字段"
        onCancel={() => setIsShowModal(false)}
        footer={null}
      >
        <Checkbox.Group
          data-testid="checkbox"
          options={options}
          defaultValue={checkTitle}
          value={checkTitle}
          onChange={onChange}
        />
        <div className="submit-btn-style1">
          <Button data-testid="cancel" onClick={() => setIsShowModal(false)}>
            {' '}
            取消{' '}
          </Button>
          <Button type="primary" onClick={handleChangeField}>
            {' '}
            确定{' '}
          </Button>
        </div>
      </DragModal>
    </>
  );
}
export default AddField;
