import imagemin from 'imagemin';
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminPngquant from 'imagemin-pngquant';

(async () => {
  const files = await imagemin(['./src/assets/**/*.(jpg|jpeg|png|svg)'], {
    destination: './dist/src/assets/',
    plugins: [
    ],
  });
})()
