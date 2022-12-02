import { atom } from "recoil";
import { getRepository } from "store/getRepository";

export const addedRepository = atom<string[]>({
    key: "addedRepository",
    default: [],
    effects: [getRepository("user_list")]
})