import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cookies from "js-cookie";
import { API } from "../../services";
import { endpoints } from "../../app/Helpers/Endpoints";
import { clearCookies, clearLocalStorage } from "../../app/Helpers/removeData";

const initialState = {
  allRole: [],
  allUsers: [],
  login: { isLoggedIn: localStorage.getItem("accessToken") ? true : false },
  userInfo: localStorage.getItem("userDetails")
    ? JSON.parse(localStorage.getItem("userDetails"))
    : {},
  requests: {
    login: { success: false, error: "", inProgress: false },
    signup: { success: false, error: "", inProgress: false },
    getAllUsers: { success: false, error: "", inProgress: false },
    deleteUser: { success: false, error: "", inProgress: false },
    addRole: { success: false, error: "", inProgress: false },
    getRole: { success: false, error: "", inProgress: false },
    updateRole: { success: false, error: "", inProgress: false },
    deleteRole: { success: false, error: "", inProgress: false },
  },
};

export const addRole = createAsyncThunk(
  "auth/addRole",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.post(endpoints.addRole, data);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response.data || "Error in creating new Role!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getRole = createAsyncThunk(
  "auth/getRole",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    const { page, limit, sortOrder, filtered } = data;
    try {
      const res = await API.get(
        endpoints.getRole(page, limit, sortOrder, filtered)
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response.data || "Error in creating new Role!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateRole = createAsyncThunk(
  "auth/updateRole",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    const { roleId, updatedData } = data;
    try {
      const res = await API.put(
        `${endpoints.updateRole}/${roleId}`,
        updatedData
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Error updating role!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "auth/deleteRole",
  async (roleId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.delete(`${endpoints.deleteRole}/${roleId}`);
      return fulfillWithValue({ roleId, message: res.data.message });
    } catch (error) {
      const errorMessage = error.response?.data || "Error deleting role!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.delete(`${endpoints.deleteUser}/${userId}`);
      return fulfillWithValue({ userId, message: res.data.message });
    } catch (error) {
      const errorMessage = error.response?.data || "Error deleting user!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.post("/user/logout", data);
      clearCookies();
      clearLocalStorage();
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Logout failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.post("/user/signin", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await API.post("/user/signup", data);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data?.message;
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    const { page, limit, sortOrder, filtered } = data;
    try {
      const res = await API.get(
        endpoints.getAllUsers(page, limit, sortOrder, filtered)
      );
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Error fetching users!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    const { userId, updatedData } = data;
    try {
      const res = await API.put(`${endpoints.updateUser}/${userId}`, updatedData);
      return fulfillWithValue(res.data);
    } catch (error) {
      const errorMessage = error.response?.data || "Error updating user!";
      return rejectWithValue(errorMessage);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      const { payload } = action;
      state.login.isLoggedIn = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.requests.login.inProgress = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.requests.login.error = action.payload;
      state.requests.login.inProgress = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.requests.login.inProgress = false;
      state.requests.login.success = true;
      if (action.payload?.accessToken) {
        const { accessToken, user } = action.payload;
        state.login.isLoggedIn = !!accessToken;

        const userDetails = {
          id: user._id,
          name: user.name,
          email: user.email,
          pic: user?.image?.url,
          phone: user?.phone,
          status: user.status,
          isVerified: user.isVerified,
        };

        state.userInfo = userDetails;
        cookies.set("accessToken", accessToken);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
      }
    });

    builder.addCase(signup.pending, (state) => {
      state.requests.signup.inProgress = true;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.requests.signup.error = action.payload;
      state.requests.signup.inProgress = false;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.requests.signup.inProgress = false;
      state.requests.signup.success = true;
    });

    builder.addCase(addRole.pending, (state) => {
      state.requests.addRole.inProgress = true;
    });
    builder.addCase(addRole.rejected, (state, action) => {
      state.requests.addRole.error = action.payload;
      state.requests.addRole.inProgress = false;
      console.log(action.payload);
    });
    builder.addCase(addRole.fulfilled, (state, action) => {
      state.requests.addRole.inProgress = false;
      state.requests.addRole.success = true;
      if (state.allRole.length >= 10) {
        state.allRole.shift();
      }
      state.allRole.push(action.payload.newRole);
    });

    builder.addCase(getRole.pending, (state) => {
      state.requests.getRole.inProgress = true;
    });
    builder.addCase(getRole.rejected, (state, action) => {
      state.requests.getRole.error = action.payload;
      state.requests.getRole.inProgress = false;
    });
    builder.addCase(getRole.fulfilled, (state, action) => {
      state.requests.getRole.inProgress = false;
      state.requests.getRole.success = true;
      state.allRole = action.payload.roles;
    });

    builder.addCase(updateRole.pending, (state) => {
      state.requests.updateRole.inProgress = true;
    });
    builder.addCase(updateRole.rejected, (state, action) => {
      state.requests.updateRole.error = action.payload;
      state.requests.updateRole.inProgress = false;
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.requests.updateRole.inProgress = false;
      state.requests.updateRole.success = true;
      const index = state.allRole.findIndex(
        (role) => role._id === action.payload._id
      );
      if (index !== -1) {
        state.allRole[index] = action.payload;
      }
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.requests.getAllUsers.inProgress = false;
      state.requests.getAllUsers.success = true;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.requests.getAllUsers.error = action.payload;
      state.requests.getAllUsers.inProgress = false;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.requests.getAllUsers.inProgress = true;
    });
  },
});

export const { setIsLoggedIn } = authSlice.actions;

export const selectAuthState = (state) => state.auth;
export default authSlice.reducer;
