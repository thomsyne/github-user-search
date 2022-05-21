import { ApiResponse, Item } from "../models/response.model";

export const mockApiResponse = (
    total_count: number,
    incomplete_results: boolean,
    items: Item[],
  ): ApiResponse => {
    return {total_count, incomplete_results, items};
  };