import React, { useState, useEffect } from 'react';
import { Form, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import styles from './index.scss';

interface IProps {
  title: string;
  text: string;
  type: string;
  isEdit: boolean;
  initData: any;
}
const FormItem = Form.Item;

function EventItem({ title, text, type, isEdit, initData }: IProps) {
  const [form] = Form.useForm();
  const { setFieldsValue, getFieldValue } = form;
  const [date, setDate] = useState(new Date());
  const [initialQueue, setInitialQueue] = useState<number[]>([0,1]);//默认显示2个输入框
  const [uuid, setUuid] = useState(1);
  // const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    const newQueue: number[] = [];
    if(!isEmpty(initData)){
      Object.keys(initData).forEach((item, index)=>{
        if(item.indexOf(type)>-1){
          newQueue.push(Number(item.split(`${type}_`)[1]));
        }
        // setFieldsValue({
        //   [item]: initData[item],
        // });
      })
      setInitialQueue([...newQueue]);
      setUuid(Object.keys(newQueue).length - 1)
    }else{
      // 解决当删除到只有空input框的时候再次编辑仍显示出空框的问题
      setInitialQueue([0,1]);
      setUuid(1);
    }
  }, [initData])


  const handleAdd = () => {
    setInitialQueue([...initialQueue, uuid+1, uuid+2]);
    setUuid(uuid+2)
  };
  const handleRemove = (item: number) => {
    const newQueue = initialQueue.filter((i) => i !== item);
    setInitialQueue([...newQueue]);
  };

console.log('initialQueue', initialQueue);
  return (
    <div className={styles.event_item}>
       <Form.Item>
        <p className={styles.title}>{title}</p>
      </Form.Item>
      <div className={type !== 'third' ? styles.content : ''}>
        {
          initialQueue.map((item) => {
            // console.log('getFieldValue', `${type}_${item}`, getFieldValue(`${type}_${item}`));
            return (
              <div key={item} className={styles.item_wrap}>
                <FormItem
                  name={`${type}_${item}`}
                >
                  <Input
                    placeholder={`请输入${text}事件`}
                    // defaultValue={newInitData[type+'_'+item]}
                  />
                </FormItem>
                <FormItem>
                  <DeleteOutlined onClick={() => handleRemove(item)} />
                </FormItem>
              </div>
            )
          })
        }
        <Form.Item>
          <Button type="primary" ghost onClick={handleAdd} className={styles.add}>
            <PlusOutlined /> 添加
          </Button>
        </Form.Item>
      </div>
    </div>
  )
}
export default EventItem;
