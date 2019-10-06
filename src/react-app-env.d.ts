/// <reference types="react-scripts" />
/// <reference types="classnames" />
/// <reference types="react-router-dom" />

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
