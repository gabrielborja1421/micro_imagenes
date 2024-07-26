export class IError extends Error {
    status?: number;
    constructor(error: string, status?: number) {
        super(error);
        this.status = status;
    }
  }