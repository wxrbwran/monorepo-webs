import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import bg from '@/assets/img/suifang/article_bg.png';
import article from '@/assets/img/suifang/article.png';
import { useSelector } from 'umi';
import UploadImageWithCrop from '../UploadImageWithCrop';
import  './index.scss';

interface IProps {
  handleChangeCover: (imgUrl: string) => void;
}
function UploadCover({ handleChangeCover }: IProps) {
  const richText = useSelector((state: IState) => state.education.richText);
  const [avatar, setAvatar] = useState<string>('');

  useEffect(()=> {
    // 修改反显
    if (!isEmpty(richText)){
      setAvatar(richText.content.cover);
    }
  }, []);
  const uploadSuccess = ({ imageURL }: { imageURL: string }) => {
    setAvatar(imageURL);
    handleChangeCover(imageURL);
  };

  return (
    <div className='mr-20 flex-shrink-0 relative'>
      <UploadImageWithCrop type="logo" success={uploadSuccess} aspectRatio={1.7 / 1}>
          <img src={avatar || bg} alt="" className='w-320 h-180'/>
          <img src={article} alt="" className='absolute top-68 left-65 pointer'/>
          <span className='absolute top-82 right-60 text-white pointer text-base'>点击设置文章封面</span>
      </UploadImageWithCrop>
    </div>
  );
}

export default UploadCover;
