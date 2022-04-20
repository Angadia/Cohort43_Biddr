import { baseUrl } from "../config";

export const Auction = {
  all() {
    return fetch(`${baseUrl}/auctions`, {
      credentials: "include",
    }).then((res) => res.json());
  },

  one(id) {
    return fetch(`${baseUrl}/auctions/${id}`, {
      credentials: "include",
    }).then((res) => res.json());
  },
};
