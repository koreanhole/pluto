import "typesafe-actions";

declare module "typesafe-actions" {
  interface Types {
    RootAction: import("./types").RootAction;
  }
}
