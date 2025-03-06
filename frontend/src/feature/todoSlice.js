import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api";

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/todo/${id}`);
      if (!response.ok) throw new Error("Session expired");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/todo/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) throw new Error("Session expired");
      const data = await response.json();
      return data.todo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/todo/${todoData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) throw new Error("Session expired");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id, { rejectWithValue }) => {
    try {
      await fetch(`${API_URL}/todo/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: { todos: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...action.payload } : todo
        );
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
      });
  },
});

export default todoSlice.reducer;
