import React from 'react';
type HeadProps = {
  title?: string;
  description?: string;
};
const HeadData: React.VFC<HeadProps> = ({
  title = '株式会社聴くと描く | 流山市のデザイン会社・イラストレーター',
  description = 'デザインに関わること、全部できます。相手の話や自分の内なる声に耳を傾ける、徹底的な「聴く」姿勢。聴いた事を咀嚼し、夢ある具体物へと「描く」力。この２つを両輪に、ワンストップで実現のお手伝いをします。',
}) => {
  return (
    <>
      <title>{title}</title>
      <meta property='description' content={description} />
    </>
  );
};

export default HeadData;
