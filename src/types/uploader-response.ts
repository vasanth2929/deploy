import { Asset } from "./asset.type";
import { User } from "./user.type";

export type UploaderRes = {
  assets: Array<Asset>;
  user: User;
  assetsMap: Record<string, Array<Asset>>;
};
