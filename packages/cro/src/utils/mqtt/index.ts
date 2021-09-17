let thisClient: any = null;

function setSubscribe(ruleId: number) {
  const topic1 = `n${process.env.APP_ENV}/research/project-query/${ruleId}`;
  thisClient = window.$client;

  console.log('>>> connected');
  // 订阅
  window.$client.subscribe(topic1);
}

function destroyLink() {
  if (thisClient) {
    thisClient.end(true, () => {
      console.log('>>> chat session closed');
    });
  }
  /* eslint-disable no-console */
  thisClient = null;
}

export {
  setSubscribe,
  destroyLink,
};
