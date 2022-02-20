import appAxios from "../appAxios";

export const getMe = async (signal: AbortSignal) => {
  return await appAxios.get("/user/me", { signal });
};

export const signup = async (data: any) => {
  return await appAxios.post("/signup", data);
};

export const login = async (data: any) => {
  return await appAxios.post("/login", data);
};

export const forgotPassword = async (data: any) => {
  return await appAxios.post("/forgot-password", data);
};

export const resetPassword = async (data: any, token: string) => {
  return await appAxios.patch(`/reset-password/${token}`, data);
};

export const updateProfile = async (data: any) => {
  const form_data = new FormData();
  Object.keys(data).forEach((key) => {
    form_data.append(key, data[key]);
  });
  return await appAxios.patch("/user/update-profile", form_data);
};

export const logout = async () => {
  return await appAxios.post(`/logout`);
};
