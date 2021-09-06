import { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import logo from '@/assets/logo.png';

export default {
  headerTheme: 'light',
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: false,
  },
  pwa: false,
  logo:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAABItJREFUWAm9V2tsFUUU/mZmy6MPi0Wx9QHSAgoYJEBNMCKEl4pRwcT+IERjJAjGREKiJE1qGoIxIUbjD0DQ+MPEF9IYH6FSLClRDFiihBYJCm3BJhStl6oXiu3ujOfsst7d3rltr5Se5GbvzpzzfWfOnHNmR6CPlO800412V2tjlsKI8YDJ76OS5atIQpizUog6IZ13GteI41EAEb48scuMaE14r2tt1hGpDMeH9im0lGL7xCK14ZMK0cPYvgNM3vKHW2uMWTi0hHY0IcT+0rHOQ+yEv1Je+XCRs0vMxZz8X/Cee6577NqFnWlsIrRynBmSE274ydkh43NLP9ttDg7DGHM7V0otI92SMoEFEyWmjBXoSBr8eM7gg2Mal92UiaJUvv92gWVTJEoKBBzKrObzBvtOaxxuNynFvv+ozMWsbT1WjdEOUL1QYXFZekW2XTCo/NrFyc4AseIuiY3zVF94/732Z41NDR56POs0VMnDVdW2qQ33Sjx6p+KMxVe/GNQc1zidMCgrErgpX2DpJImDZzUS3UCvZzBhjEBDq8a7P2jUt2i4GphMUeNfwQiQrnWdsEZgUhHwYYUD6l6o3Odi76mUcTH1xW2POD5h4pLB6s9cnOmyLQGIRuapGhfNv6VwQov0+NLMPbdKn/z7dh0jZ6OOJLDucxfn/jYoyhXYTs6UFIRw8eeuZo1W2i6WObf813RjSlYHOMwsTZRINjl/EVhLTnRSBHg72Ikbcm2aQFtXgHFbYRYOJLoDo+tHpxvxyLg8oP0v4LkvXHRdNmBwdmLMqLgTkpTvoBxg4fyxiTUCJzsD5UWlIg30zWUKtU/mYMVUQaDA8196SFIhlVLUXlkcr4S15RI3XycoIQ0O/UpZaRGrAw2txt+7wlECry5RyIloFVOds9yYFzxP/G6wfo+H7l5DkQnGeJ7Jn5kdOLTziEbLBR5NF2sVsNrMYoEdjylqKgIHqLxe3OuBqg1cBdPH0Vib8UsthCwcCb/Wu6lBbZwnqQIC8j3UB16u92DfACCythAqeB7tMKjeT4bUB+ZTJ9y0SPlnN1dBfUucnC3+/If6AUWZtyEk/7jJQ1U/5GxH/S6z1FIDys3RqJyv8OBkiUu9RHDA3tJG0oK3PKBw34RgTTsaPXDoB5J+HWDjmp808qiTvTBX4fFp7ITBG9/FgfNpnpNzZon0I/baQY2PmuI6mRzJuAVRg/eOarx9JFj5qrsV1syJmz09S/rknO0c8sGSM8eAEQgdeasxiMTKGQrPlitcpC+69+lUZOGqGV+osZvOi35PvxAs8sxYBRGd2N+qBQrLpwYR2Nzg4tMTmfI7ZpbxJR7LjGqpic10tNadClbOycnfC1cj5AB9t2chvF7e52/OaP/A4uT8/yKSDl8aqEtMywaEz/qXqDGtn2v8MyEb25gucVOjE3X0bZaVAwzCXzhbvh1cqcVIIy/MLfm6RNtwdUgR0MH/FZq5Jd/V+Lo0eMOh0WROn5vh+K7G16WhgR4YhbmYkzX9MuQ7Gt/VpJRbr+128OVUbg3vhexAWhEP9/X8Xx/m0Rww0QskAAAAAElFTkSuQmCC',
  iconfontUrl: '',
} as Partial<LayoutSettings> & {
  pwa: boolean;
};
