export const timeout = (func: any, seconds: any) => {
  let timeoutID: any;

  delayedFunction();
  function slowFunction() {
    func();
    clearTimeoutID();
  }

  function delayedFunction() {
    timeoutID = setTimeout(slowFunction, seconds * 1000);
  }
  function clearTimeoutID() {
    clearTimeout(timeoutID);
  }
};
