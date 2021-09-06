import React, { FC, useEffect, useState } from 'react';
import { Input, Form } from 'antd';

const { Item } = Form;

interface IProps {
  placeholder?: string;
  searchKey: string;
  form: Store;
  value?: string;
}

const Search: FC<IProps> = (props) => {
  const {
    placeholder, form, searchKey, value,
  } = props;
  const [wordKey, setWordKey] = useState(value);
  const formDispatch = (form as any).getInternalHooks('RC_FORM_INTERNAL_HOOKS')
    .dispatch;
  useEffect(() => {
    if (wordKey !== value) {
      setWordKey(value);
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
        style={{ width: 160, float: 'right' }}
        onSearch={handleSearchKey}
        onChange={handleChangeKey}
      />
    </>
  );
};

Search.defaultProps = { placeholder: '请输入关键词搜索', value: '' };
export default Search;
