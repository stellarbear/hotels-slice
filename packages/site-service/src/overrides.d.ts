import "react-router";

declare module "react-router" {
  export function useParams<T extends Record<string, string>>(): T;
  export function useParams<T extends string>(): { [K in T]: string };
}
