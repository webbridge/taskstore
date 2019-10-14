export interface InsertAnswer {
  message: string;
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  protocol41: boolean;
  changedRows: number;
}

export interface ResponseItems<T> {
  data: T;
}

export interface ResponseServer {
  message: string;
  status: number;
}
