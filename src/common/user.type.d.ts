import "next-auth";

export type PermissionType = {
  name: string;
  id: string;
};

declare module "next-auth" {
  interface User {
    roles?: { id: number; name: string }[];
    permissions?: PermissionType[];
    token?: string;
    refreshToken?: string;
  }
}
