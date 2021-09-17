import React, { useEffect, useState } from 'react';
import { Popover, Form, InputNumber } from 'antd';
import { useSelector, useDispatch } from 'umi';
import question from '@/assets/img/question.svg';
import { btnRender } from '@/utils/button';
import { rolePriceList, VIPType, doctorRole } from 'xzl-web-shared/src/utils/consts';
import formatOrgList, { handleServePrice2Local } from './util';
import Tabs from '../components/Tabs';
import styles from './index.scss';

const FormItem = Form.Item;
interface IProps {
  onClose: () => void;
}
function Charges(props: IProps) {
  const { onClose } = props;
  const user = useSelector((state: IState) => state.user);
  const orgList: ISubject[] = useSelector((state: IState) => state.user.filterOrgs);
  const [isEdit, setIsEdit] = useState(false);
  const [orgId, setOrgId] = useState<string>(orgList[0].sid as string);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const getPrice = (orgSid: string) => {
    /* eslint-disable no-new */
    new Promise((resolve) => {
      dispatch({
        type: 'user/getPrice',
        payload: {
          doctorSid: window.$storage.getItem('sid'),
          orgSid,
          resolve,
        },
      });
    }).then((goodsDetailList: TPrice[]) => {
      form.setFieldsValue(handleServePrice2Local(goodsDetailList));
      setOrgId(orgSid);
    });
  };
  useEffect(() => {
    getPrice(orgList[0].sid as string);
  }, []);

  const handleChangeTab = (id: string) => {
    getPrice(id);
    setOrgId(id);
  };

  const handleChangePrice = (val: number, key: string) => {
    const data: { [key: string]: number } = {};
    VIPType.forEach((vip) => {
      data[`${key}-${vip.type}`] = val / vip.divide;
    });
    form.setFieldsValue(data);
  };
  const onFinish = async (values: { [key: string]: number }) => {
    /**
     *  INDEPENDENT_VIP-VIP_HALF_YEAR: 555.5
        INDEPENDENT_VIP-VIP_QUARTER: 277.75
        INDEPENDENT_VIP-VIP_YEAR: 1111
        SUBORDINATE_VIP-VIP_HALF_YEAR: 1666.5
        SUBORDINATE_VIP-VIP_QUARTER: 833.25
        SUBORDINATE_VIP-VIP_YEAR: 3333
        SUPERIOR_VIP-VIP_HALF_YEAR: 1111
        SUPERIOR_VIP-VIP_QUARTER: 555.5
        SUPERIOR_VIP-VIP_YEAR: 2222
     */
    console.log('values', values);
    const goodsDetailList: TPrice[] = [];

    Object.keys(values).forEach((key) => {
      const tmp: Partial<TPrice> = { canModify: true };
      const [role, vipType] = key.split('-');
      tmp.goodsCategory = role;
      tmp.goodsDurationType = vipType;
      tmp.price = (values[key] || 0) * 100;
      tmp.doctorRole = doctorRole[role];
      goodsDetailList.push(tmp as TPrice);
    });
    // console.log('goodsDetailList', goodsDetailList);
    const res = await window.$api.user.savePrice({
      doctorSid: window.$storage.getItem('sid'),
      orgSid: orgId,
      goodsDetailList,
    });
    console.log(res);
    getPrice(orgId);
    setIsEdit(!isEdit);
  };

  console.log('user', user);

  return (
    <div className={styles.charges}>
      <div className={styles.info_height}>
        <Tabs orgList={formatOrgList(orgList)} handleChangeTab={handleChangeTab} />
        <div className={styles.content}>
          <div className={styles.item}>
            <h4 className={styles.title}>个人收费标准</h4>
            <Form
              form={form}
              // initialValues={handleServePrice2Local(user.prices)}
              className="w-full"
              onFinish={onFinish}
            >
              {rolePriceList.map((list, index) => (
                <div className="w-full flex items-center mb-10" key={list.text}>
                  <div className="w-130 flex items-center">
                    <span className="text-base">{list.text}</span>
                    {list.extra && (
                      <Popover content={list.extra}>
                        <img src={question} alt="" />
                      </Popover>
                    )}
                  </div>
                  <div className={styles.price_box}>
                    <span>
                      ￥
                      <FormItem noStyle name={`${list.key}-VIP_YEAR`}>
                        <InputNumber
                          onChange={(val: number) => handleChangePrice(val, list.key)}
                          min={0}
                          size="middle"
                          autoFocus={index === 0}
                          max={999999999}
                          precision={2}
                          disabled={!isEdit}
                        />
                      </FormItem>
                    </span>
                    元/12个月
                  </div>
                  <div className={styles.price_box}>
                    ￥
                    <FormItem noStyle name={`${list.key}-VIP_HALF_YEAR`}>
                      <InputNumber disabled />
                    </FormItem>
                    元/6个月
                  </div>
                  <div className={styles.price_box}>
                    ￥
                    <FormItem noStyle name={`${list.key}-VIP_QUARTER`}>
                      <InputNumber disabled />
                    </FormItem>
                    元/3个月
                  </div>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
      {btnRender({
        okText: isEdit ? '保存' : '修改价格',
        onOk: isEdit ? form.submit : () => setIsEdit(true),
        onCancel: onClose,
      })}
    </div>
  );
}

export default Charges;
