type fn = () => void
const myDecisionFn = (() => {
  const enum outcome {
    success,
    fail,
    none
  }
  let _outcome: outcome = outcome.none

  const api = {
    success: (cb:fn) => {
      if (_outcome === outcome.success) {
        cb();
      }
      return api;
    },
    fail: (cb:fn) => {
      if (_outcome === outcome.fail) {
        cb();
      }
      return api;
    }
  };

  const callableApi = () => {
      if (Math.random() > .5) _outcome = outcome.success
      else _outcome = outcome.fail
    return api;
  };

  return callableApi;
})()


myDecisionFn()
  .success(() => console.log("yes"))
  .fail(() => console.log("no"))

