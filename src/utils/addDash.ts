type AddDash<A extends string, B extends string> = A extends "" ? B : `${A}-${B}`;

export const addDash = <A extends string, B extends string>(a: A, b: B): AddDash<A, B> =>
  (a ? `${a}-${b}` : b) as AddDash<A, B>;
