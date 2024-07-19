
export abstract class CustomExpressError<T> extends Error {
  /**
   *  Http status
   */
  public status: number;
  /**
   *  Http status text
   */
  public statusText: string;
  /**
   *  Error data
   */
  public data: T
  constructor(status: number, statusText: string, data: T) {
    super()
    this.name = this.constructor.name;
    this.status = status;
    this.statusText = statusText;
    this.data = data
  }
}