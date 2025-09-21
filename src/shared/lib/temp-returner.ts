import { quality, type QualityKey } from "../constants/quality";

export const tempReturner = (payload: QualityKey) => {
  return quality[payload] || quality["normal"];
};
