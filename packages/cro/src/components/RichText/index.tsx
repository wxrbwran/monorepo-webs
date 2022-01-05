import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.scss';

interface IProps {
  handleChange: (content: any, text: string) => void;
  value: [];
  style?: {
    height: string;
  }
}
function RichText({ handleChange, value, style }: IProps) {
  const [quillRef, setQuillRef] = useState<any>();
  useEffect(() => {
    if (quillRef){
      // 修改反显
      const quillEditor = quillRef.getEditor();
      quillRef.setEditorContents(quillEditor, value);
    }
  }, [quillRef]);

  const toolbarContainer = [
    [{ size: [false, 'large', 'huge'] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' },
      { indent: '-1' }, { indent: '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean'],
  ];
  const onEditorChange = (_val: any, _delta: any, _source: any, editor: any) => {
    console.log('content', editor.getHTML());
    handleChange(editor.getHTML(), editor.getText());
  };

  return (
    <>
      <ReactQuill
        ref={(ref) => setQuillRef(ref)}
        theme="snow"
        onChange={onEditorChange}
        // modules={Editor.modules}
        // formats={Editor.formats}
        placeholder= "请输入"
        style={style}
        modules={{
          toolbar: {
            container: toolbarContainer,
          },
        }}
      />
    </>
  );
}

export default RichText;
