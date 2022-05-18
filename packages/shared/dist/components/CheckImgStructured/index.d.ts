import { FC } from 'react';
interface IImg {
    imageId: string;
    uploadTime: number;
    lastReportAt?: number;
    url: string;
    status: number;
    degree: number;
    reviewStatus: string;
    groupId?: string;
}
interface IProps {
    handleRefresh?: () => void;
    imageInfo?: {
        imageId?: string;
        imageUrl?: string;
    };
    images: IImg[];
    sid: string;
}
declare const CheckImgStructured: FC<IProps>;
export default CheckImgStructured;
