export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? DeepPartial<T[K]> : T[K];
};

export type PartialSome<T, P extends keyof T> = {
  [O in P]?: T[O];
} &
  {
    [R in Exclude<keyof T, P>]: T[R];
  };
