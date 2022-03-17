import { useQuery, useMutation, useQueryClient } from "react-query";
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

export function useVehicles() {
  return useQuery<Vehicle[], Response>("vehicles", () =>
    http.get("/api/vehicles")
  );
}

export function useVehicle(id: string) {
  return useQuery<Vehicle, Response>(["vehicle", id], () =>
    http.get(`/api/vehicles/${id}`)
  );
}

export function useCreateVehicle() {
  return useMutation<Vehicle, Response, VehiclePayload>((body) =>
    http.post("/api/vehicles", { json: body })
  );
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();

  return useMutation<Vehicle, Response, string, Vehicle[]>(
    (id) => http.delete(`/api/vehicles/${id}`),
    {
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
    }
  );
}
