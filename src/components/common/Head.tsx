import React from 'react';
type HeadProps = {
  title?: string;
  description?: string;
};
const Head: React.VFC<HeadProps> = ({
  title = '株式会社聴くと描く | 流山市のデザイン会社・イラストレーター',
  description = 'デザインに関わること、全部できます。相手の話や自分の内なる声に耳を傾ける、徹底的な「聴く」姿勢。聴いた事を咀嚼し、夢ある具体物へと「描く」力。この２つを両輪に、ワンストップで実現のお手伝いをします。',
}) => {
  return (
    <>
      <title>{title}</title>
      <meta property='description' content={description} />
      <link rel='shortcut icon' href='/favicons/favicon.ico' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />

      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicons/apple-touch-icon.png'
      />
      <link
        rel='icon'
        sizes='192x192'
        href='/favicons/android-chrome-192x192.png'
      />
      <link rel='icon' sizes='32x32' href='/favicons/favicon.ico' />
      <link rel='mask-icon' href='/favicons/favicon.ico' />

      <meta name='msapplication-TileColor' content='#fff' />
      <meta name='theme-color' content='#fff' />
    </>
  );
};

export default Head;
