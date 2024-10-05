export type Service<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: {
        message: string;
      };
    };
