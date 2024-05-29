//Patch for XMLHttpRequest
//https://github.com/miragejs/miragejs/issues/1006#issuecomment-1439946798
export const XMLHttpRequest = {
  fix: () => {
    const NativeXMLHttpRequest: any = window.XMLHttpRequest;

    (window as any).XMLHttpRequest = function XMLHttpRequest(...rest: any[]) {
      const request = new NativeXMLHttpRequest(...rest);
      delete request.onloadend;
      return request;
    };
  },
};
