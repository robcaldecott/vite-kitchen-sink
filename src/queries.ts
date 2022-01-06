import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "react-query";
import { http } from "./http";

export interface VehiclePayload {
  manufacturer: string;
  model: string;
  type: string;
  fuel: string;
  vin: string;
  color: string;
  mileage: number;
  registrationDate: string;
  registrationNumber: string;
}

export interface Vehicle extends VehiclePayload {
  id: string;
}

export function useVehicles(): UseQueryResult<Vehicle[], Response> {
  return useQuery("vehicles", () => http.get("/api/vehicles"));
}

export function useVehicle(id: string): UseQueryResult<Vehicle, Response> {
  return useQuery(["vehicle", id], () => http.get(`/api/vehicles/${id}`));
}

export function useCreateVehicle(): UseMutationResult<
  Vehicle,
  Response,
  VehiclePayload
> {
  return useMutation((body) => http.post("/api/vehicles", { json: body }));
}

export function useDeleteVehicle(): UseMutationResult<
  Vehicle,
  Response,
  string,
  Vehicle[]
> {
  const queryClient = useQueryClient();

  return useMutation((id) => http.delete(`/api/vehicles/${id}`), {
    onMutate: async (id) => {
      await queryClient.cancelQueries("vehicles");
      // Remove the vehicles immediately
      const previous = queryClient.getQueryData<Vehicle[]>("vehicles");
      if (previous) {
        queryClient.setQueryData(
          "vehicles",
          previous.filter((vehicle) => vehicle.id !== id)
        );
      }
      return previous;
    },
    onError: (error, id, context) => {
      // Revert the original list of vehicles on error
      if (context) {
        queryClient.setQueryData(["vehicles"], context);
      }
    },
    onSettled: () => {
      // Fetch the list of new vehicles
      queryClient.invalidateQueries("vehicles");
    },
  });
}
