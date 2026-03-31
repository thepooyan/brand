type fn = () => void
function createDecisionPromiseFn() {
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
    _outcome = outcome.success
    return api;
  };

  return callableApi;
}

const myDecisionFn = createDecisionPromiseFn();

myDecisionFn()
.success(() => console.log("yes"))
.fail(() => console.log("no"))

