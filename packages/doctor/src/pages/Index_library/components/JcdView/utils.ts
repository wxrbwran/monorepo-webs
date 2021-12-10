import * as api from '@/services/api';
import { message } from 'antd';
export const handleQuestions = async ({
  params,
  fn,
}: {
  params: {
    meta: { id: string };
    data: Partial<TIndexItem>[];
  };
  fn: {
    setLoading: (l: boolean) => void;
    setShowModal: (l: boolean) => void;
    onSuccess: () => void;
  };
}) => {
  console.log('params', params);
  console.log('fn', fn);
  fn.setLoading(true);
  try {
    await api.indexLibrary.handleImageTemplate(params);
    message.success('操作成功');
    fn.setShowModal(false);
    if (fn.onSuccess) {
      fn.onSuccess();
    }
  } catch (err: any) {
    message.error(err?.result || '操作失败');
  } finally {
    fn.setLoading(false);
  }
};

export const handleQuestionAnswer = (q: TIndexItem): TIndexItem => {
  q.answer = (q.answer as string | undefined) ? [q.answer as string] : [];
  return q;
};

export const filterNotNew = (q: TIndexItem) => !(q.action === 'DELETE' && q.isNew === 'yes');

export const setDelete = (q: TIndexItem) => {q.action = 'DELETE'; return q;};
