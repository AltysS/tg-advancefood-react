import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import productsAndCategorites from "./categories/categories";

export const getCatalogueCategories = createAsyncThunk(
  "fetchCatalogueCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetch(
        "https://b2b.detta.com.ua/api/hs/v3/get-products-shop",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa("Web" + ":" + "Zxcvb!0912"),
          },
        }
      ).then((data) => data.json());
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState: {
    catalogueProducts: [],
    catalogueCategories: [],
    isLoading: true,
    categoryLevel: 0,
  },
  reducers: {
    setCatalogueProducts: (state, action) => {
      state.catalogueProducts = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addProductToCart: (state, action) => {
      state.catalogueProducts = state.catalogueProducts.map((el) => {
        if (el.id === action.payload.id) {
          return (el.orderedQty += 1);
        }
      });
    },
  },
  extraReducers(builder) {
    builder.addCase(getCatalogueCategories.fulfilled, (state, action) => {
      const { categories, products } = action.payload;
      const categoriesList = [[], [], []];
      categories.map((el) => {
        if (el.level === 1) {
          categoriesList[el.level - 1].push(el);
        } else if (el.level === 2) {
          categoriesList[el.level - 1].push(el);
        } else {
          categoriesList[el.level - 1].push(el);
        }
      });
      state.catalogueCategories = categoriesList;
      state.catalogueProducts = products;
      state.isLoading = false;
    });
  },
});

export const { setCatalogueProducts, addProductToCart, setIsLoading } =
  catalogueSlice.actions;

export default catalogueSlice.reducer;
