export type TGetConfigOptionFn<T> = <K extends keyof T>(option: K) => T[K];

export type TconfigOptions = {
  readonly port: number;
  readonly env: string;
  readonly databaseUrl: string;
  readonly getConfigOption: TGetConfigOptionFn<TconfigOptions>;
};
