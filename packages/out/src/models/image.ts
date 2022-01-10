import { Reducer } from 'redux';
import { Effect } from 'dva';
import { IImageItem, ImageModelState } from 'typings/model';
import image from '@/services/api/image';

export interface ImageModelType {
  namespace: string;
  state: ImageModelState;
  effects: {
    fetchImageCount: Effect
  },
  reducers: {
    setImageCount: Reducer<ImageModelState>;
  };
}

export const imageState = {
  images: [],
  insImg: [],
  anaImg: [],
  otherImg: [],
};

const Model: ImageModelType = {
  namespace: 'image',
  state: imageState,

  effects: {
    * fetchImageCount(action, { call, put }) {
      console.log(action);
      const params = {
        sid: window.$storage.getItem('patientSid'),
        wcId: window.$storage.getItem('patientWcId'),
      };
      const response = yield call(image.fetchImageCountNew, params);
      yield put({
        type: 'setImageCount',
        payload: response,
      });
    },
  },
  reducers: {
    setImageCount(state = imageState, { payload }) {
      const insImg: IImageItem[] = [];
      const anaImg: IImageItem[] = [];
      const otherImg: IImageItem[] = [];
      payload.images.forEach((item: IImageItem) => {
        // category: 0 化验单，1检查单，2其他图片
        if (item.category === 1) {
          insImg.push(item);
        } else if (item.category === 0) {
          anaImg.push(item);
        } else if (item.category === 2) {
          otherImg.push(item);
        }
      });
      return {
        ...state,
        images: payload.images,
        insImg,
        anaImg,
        otherImg,
      };
    },
  },
};

export default Model;
