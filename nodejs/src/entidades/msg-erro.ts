
export class MsgErro {
  code: number;
  msg: string;
  data: any;

  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
};
