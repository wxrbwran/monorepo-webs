import React, { useEffect } from 'react';
import { Button, Checkbox, Form } from 'antd';
import styles from './index.scss';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import QueryFile from '../query_file';
interface IProps {
  checkedField: {
    level: string;
    description: string;
    parent: string;
    assign: any;
    type: string;
    name: string;
    key: string;
  }[];
  onSubmit: (values: any) => void;
}

const FormItem = Form.Item;
function PreTable({ checkedField, onSubmit }: IProps) {
  const [form] = Form.useForm();
  const { setFieldsValue } = form;

  const handleChange = (e: CheckboxChangeEvent) => {
    console.log('e', e.target.checked);
  }

  const setElHeight = (elArr: any) => {
    // 两行条件
    let doubleEl = document.getElementById('double_line');
    // 三行条件 达标数据中的血压
    let multiEl = document.getElementById('multi_line');
    if(elArr){
      elArr.forEach((item: any)=> {
        // +1是为了适配windows
        if(multiEl){
          item.style.height = multiEl?.offsetHeight+1+ "px";
        }else if(doubleEl) {
          item.style.height = doubleEl?.offsetHeight+ "px";
        }else{
          item.style.height = 50+ "px";
        }
      })
    }
  }

  useEffect(() => {
    let singElArr = document.querySelectorAll('.sing_line');
    let doubleElArr = document.querySelectorAll('.double_line');
    setElHeight(singElArr);
    setElHeight(doubleElArr);
  }, [checkedField])

  return (
    <Form
      name="query"
      onFinish={onSubmit}
      form={form}
      className={styles.pre_table}
    >
      <div className={styles.th}>
        <p>字段</p>
        <p>表</p>
        {/* <p>是否展示</p> */}
        <p className="sing_line">查询条件</p>
        {/* <p>或</p> */}
      </div>
      {
        checkedField.map((item) => {
          return (
            <div key={`${item.key}_${item.name}`}>
              <p>{item.description}</p>
              <p>{item.parent}</p>
              {/* {
                  <p>
                    <FormItem
                      name={`${item.name}_show`}
                      noStyle
                    >
                      <Checkbox onChange={handleChange}/>
                    </FormItem>
                    <Checkbox onChange={handleChange}/>
                  </p>
              } */}
              <QueryFile
                currentField={item}
                setFieldsValue={setFieldsValue}
              />
              {/* <p></p> */}
              {/* {
                ['add', 'or'].map((i) => (
                  <QueryFile currentField={item} key={i}/>
                ))
              } */}
            </div>
          )
        })
      }
      <FormItem className={styles.submit_btn}>
        <Button type="primary" htmlType="submit">开始查询</Button>
      </FormItem>
    </Form>
  )
}

export default PreTable;
