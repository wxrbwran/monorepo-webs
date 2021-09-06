import React, { FC } from 'react';
import { Input, Form } from 'antd';

const { Item } = Form;

interface IProps {
  placeholder?: string;
  searchKey: string;
  form: Store;
}

const Search: FC<IProps> = (props) => {
  const { placeholder, form, searchKey } = props;
  const formDispatch = (form as any).getInternalHooks('RC_FORM_INTERNAL_HOOKS')
    .dispatch;

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
  return (
    <Item noStyle name={searchKey}>
      <Input type="hidden" />
      <Item noStyle>
        <Input.Search
          placeholder={placeholder}
          style={{ width: 200, float: 'right' }}
          onSearch={handleSearchKey}
        />
      </Item>
    </Item>
  );
};

Search.defaultProps = { placeholder: '请输入关键词搜索' };
export default Search;
