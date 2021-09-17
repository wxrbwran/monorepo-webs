import React from 'react';
import { Form, Input, Select } from 'antd';
import NumberPicker from '../number_picker';
import DateTypePicker from '../date_picker';
import styles from '../pre_table/index.scss';
interface IProps {
  currentField: {
    level: string;
    type: string;
    name: string;
    key: string;
    description: string;
    assign: any;
    items: {
      type: string;
    }[];
    option: {
      value: string
    }[];
  },
  setFieldsValue: (params: object) => void;
}

const FormItem = Form.Item;
const { Option } = Select;
function QueryFile({ currentField, setFieldsValue }: IProps) {

  console.log('currentField_query_file', currentField);
  // end-event.MAIN_ENDPOINT_0 取最后一位”0“
  const kIdx = currentField.key.split('_')[currentField.key.split('_').length-1];
  const projectSid = window.$storage.getItem('projectSid');
  const optionValue = (val: string) => {
    if(['女', '男'].includes(val)) {
      return val === '女' ? '0' : '1'
    }else{
      return val
    }
  }
  const setElId = (len: number) => {
    if(len > 3){
      return 'multi_line'
    } else if (len >2) {
      return 'double_line'
    } else {
      return ''
    }
  }
  return (
    <>
      {/* <Form.Item name={`${currentField.name}`} noStyle>
        <Input type="hidden" />
      </Form.Item> */}
      {
        currentField?.option ? (
          <div className={`${styles.single_select} sing_line ${styles.cell_wrapper}`}>
            <FormItem
              name={`${currentField.name}_value_${kIdx}`}
              noStyle
            >
              <Select placeholder='全部选项'>
                <Option value=''>全部选项</Option>
                {
                  currentField.option.map((item)=>(
                    <Option value={item.value} key={item.value}>{item.value}</Option>
                  ))
                }
              </Select>
            </FormItem>
            <Form.Item name={`${currentField.name}_operator_${kIdx}`} noStyle initialValue='~='>
              <Input type="hidden" />
            </Form.Item>
          </div>
        ):
        <>
          {
              currentField.type === 'string' && !currentField?.items && (
              <div className={`${styles.single_input} sing_line ${styles.cell_wrapper}`}>
                <FormItem
                  name={`${currentField.name}_value_${kIdx}`}
                  initialValue=''
                  noStyle
                >
                  <Input placeholder='全部(点击可修改)'/>
                </FormItem>
                <Form.Item name={`${currentField.name}_operator_${kIdx}`} noStyle initialValue='~='>
                  <Input type="hidden" />
                </Form.Item>
              </div>
            )
          }
          {
            ['int', 'float'].includes(currentField.type) && (
              <div className={`${styles.multi_select} sing_line ${styles.cell_wrapper}`}>
                <NumberPicker currentField={currentField} setFieldsValue={setFieldsValue}/>
              </div>
            )
          }
        </>
      }
      {/* id 为 double_line代表双行(既有时间，又有数值)，className为sing_line代表单行，只有时间或只有数值 */}
      {
        currentField?.items && (
          <div
            className={`${styles.cell_wrapper} ${styles.double_line} ${currentField?.items.length<3 ? 'sing_line' : 'double_line'}`}
            id={setElId(currentField?.items.length)}>
            {
              currentField?.items.map((el: any) => (
                <div key={`${el.key}_${el.name}`}>
                  {
                    ['date', 'timestamp'].includes(el.type) && (
                      <div className={styles.cell_wrapper}>
                        <DateTypePicker currentField={{...el, key: currentField.key}} setFieldsValue={setFieldsValue}/>
                      </div>
                    )
                  }
                  {
                    ['int', 'float'].includes(el.type) && (
                      <div className={styles.cell_wrapper}>
                        <NumberPicker currentField={{...el, key: currentField.key}} setFieldsValue={setFieldsValue}/>
                      </div>
                    )
                  }
                  {
                    el.name.includes('uid') && (
                      <>
                        <Form.Item name={`${el.name}_operator_${kIdx}`} noStyle initialValue='='>
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item name={`${el.name}_value_${kIdx}`} noStyle initialValue={el.assign.value}>
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item name={`${el.name.split('.uid')[0]}.self_operator_${kIdx}`} noStyle initialValue='='>
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item name={`${el.name.split('.uid')[0]}.self_value_${kIdx}`} noStyle initialValue={currentField.description}>
                          <Input type="hidden" />
                        </Form.Item>
                      </>
                    )
                  }
                  {/* 结构化数据 */}
                  {
                    el.name.includes('img.image.index.uid') && (
                      <>
                        <Form.Item name={`${currentField.name}.parent_operator_${kIdx}`} noStyle initialValue='='>
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item name={`${currentField.name}.parent_value_${kIdx}`} noStyle initialValue={currentField.subParent}>
                          <Input type="hidden" />
                        </Form.Item>
                      </>
                    )
                  }
                  {
                    el.name.includes('project_sid') && (
                      <>
                        <Form.Item name={`${el.name}_operator_${kIdx}`} noStyle initialValue='='>
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item name={`${el.name}_value_${kIdx}`} noStyle initialValue={projectSid}>
                          <Input type="hidden" />
                        </Form.Item>
                      </>
                    )
                  }
                </div>
              ))
            }
          </div>
        )
      }
    </>
  )
}

export default QueryFile;
