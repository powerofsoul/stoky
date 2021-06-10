export type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type ReturnOfPromise<T> = T extends (...args: any) => any ? ThenArg<ReturnType<T>> : never
