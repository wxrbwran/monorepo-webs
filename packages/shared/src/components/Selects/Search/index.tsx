import React, { FC, useEffect, useState, useRef } from 'react';
import { Input, Form } from 'antd';

const { Item } = Form;

interface IProps {
  placeholder?: string;
  searchKey: string;
  form: Store;
  value?: string;
  focus?: boolean; // 是否主动获取焦点
  width?: number;
  float?: any;
}

const Search: FC<IProps> = (props) => {
  const {
    placeholder, form, searchKey, value, focus, width, float,
  } = props;
  const [wordKey, setWordKey] = useState(value);
  const inputRef = useRef<Input>(null);
  const formDispatch = (form as any).getInternalHooks('RC_FORM_INTERNAL_HOOKS')
    .dispatch;
  useEffect(() => {
    if (wordKey !== value) {
      setWordKey(value);
    }
    if (focus) {
      inputRef.current!.focus();
    }
  }, [value]);
  const handleSearchKey = (word: string) => {
    console.log(word);
    formDispatch({
      type: 'updateValue',
      namePath: searchKey,
      value: word,
    });
    form.setFieldsValue({
      word,
    });
  };
  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordKey(e.target.value);
  };
  return (
    <>
      <Item noStyle name={searchKey}>
        <Input type="hidden" />
      </Item>
      <Input.Search
        placeholder={placeholder}
        value={wordKey}
        style={{ width, float }}
        onSearch={handleSearchKey}
        onChange={handleChangeKey}
        ref={inputRef}
      />
    </>
  );
};

Search.defaultProps = { placeholder: '请输入关键词搜索', value: '', float: 'right', width: 160 };
export default Search;
