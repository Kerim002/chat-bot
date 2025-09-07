import { jsonApiInstance } from "@/shared/api/interceptor";
import { ROOM_ENDPOINT } from "@/shared/constants/endpoints";

export const deleteRoom = async (id: number) => {
  const result = await jsonApiInstance(`${ROOM_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
  return result;
};
