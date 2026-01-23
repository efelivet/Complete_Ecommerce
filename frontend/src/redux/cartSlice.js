import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/cart/create",
        {
          products: [{ productId, quantity }],
        },
        { withCredentials: true }
      );

      return res.data.cart;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to add to cart"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        { withCredentials: true }
      );

      return res.data.cart;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Failed to remove item"
      );
    }
  }
);

export const updateCartQty = createAsyncThunk(
  "cart/updateQty",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const state = getState().cart;

      const products = state.products.map((p) => ({
        productId: p.productId._id,
        quantity:
          p.productId._id === productId ? quantity : p.quantity,
      }));

      const res = await axios.put(
        "http://localhost:5000/api/cart/update/me",
        { products },
        { withCredentials: true }
      );

      return res.data.cart;
    } catch (err) {
      return rejectWithValue("Update failed");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [], 
    amount: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      /* ---------- OPTIMISTIC UPDATE ---------- */
      .addCase(addToCart.pending, (state, action) => {
        const { productId, quantity, price } = action.meta.arg;

        const item = state.products.find(
          (p) => p.productId._id === productId
        );

        if (item) {
          item.quantity += quantity;
        } else {
          state.products.push({ productId, quantity });
        }

        // optimistic total
        state.amount += price * quantity;
        state.loading = true;
      })

      /* ---------- SERVER CONFIRMED ---------- */
      .addCase(addToCart.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.amount = action.payload.amount;
        state.loading = false;
        state.error = null;
      })

      /* ---------- ROLLBACK ---------- */
      .addCase(addToCart.rejected, (state, action) => {
  const { productId, quantity, price } = action.meta.arg;

  const item = state.products.find(
     (p) => p.productId._id === productId
  );

  if (item) {
    item.quantity -= quantity;

    // remove item if quantity becomes 0 or less
    if (item.quantity <= 0) {
      state.products = state.products.filter(
       (p) => p.productId._id === productId
      );
    }
  }

  // rollback amount
  state.amount -= price * quantity;

  state.loading = false;
  state.error = action.payload;
})

.addCase(removeFromCart.pending, (state, action) => {
  const { productId, price } = action.meta.arg;

  const item = state.products.find(
     (p) => p.productId._id === productId
  );

  if (item) {
    state.amount -= item.quantity * price;
    state.products = state.products.filter(
       (p) => p.productId._id === productId
    );
  }
})

.addCase(removeFromCart.fulfilled, (state, action) => {
  state.products = action.payload.products;
  state.amount = action.payload.amount;
})

.addCase(removeFromCart.rejected, (state, action) => {
  state.error = action.payload;
})

.addCase(updateCartQty.pending, (state, action) => {
  const { productId, quantity } = action.meta.arg;

  const item = state.products.find(
    (p) => p.productId._id === productId
  );

  if (!item) return;

  // Adjust total before changing qty
  state.amount -= item.quantity * item.productId.price;
  item.quantity = quantity;
  state.amount += quantity * item.productId.price;
})

.addCase(updateCartQty.fulfilled, (state, action) => {
  state.products = action.payload.products;
  state.amount = action.payload.amount;
})

.addCase(updateCartQty.rejected, (state, action) => {
  state.error = action.payload;
});



  },
});
export default cartSlice.reducer;