import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCatalogueCategories = createAsyncThunk(
  "fetchCatalogueCategories",
  async (paramsID, { rejectWithValue }) => {
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
      return { data, paramsID };
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
    categoryID: null,
    isMenuOpen: false,
    hasNextCategory: null,
  },
  reducers: {
    toggleIsMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    setCategoryLevel: (state, action) => {
      state.categoryLevel = action.payload;
    },
    setCategoryID: (state, action) => {
      state.categoryID = action.payload;
    },
    incrementCategoryLevel: (state, action) => {
      state.categoryID = action.payload;
      state.categoryLevel += 1;
    },
    decrementCategoryLevel: (state, action) => {
      state.categoryID = action.payload;
      state.categoryLevel -= 1;
    },
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
      const hasParams = action.payload?.paramsID;
      if (hasParams) {
        state.categoryLevel = 1;
        state.categoryID = hasParams;
      }

      const { categories, products } = action.payload.data;
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
      state.hasNextCategory = true;
      state.isLoading = false;
    });
  },
});

export const {
  setCatalogueProducts,
  addProductToCart,
  setIsLoading,
  incrementCategoryLevel,
  setCategoryLevel,
  decrementCategoryLevel,
  toggleIsMenuOpen,
  setCategoryID,
} = catalogueSlice.actions;

export default catalogueSlice.reducer;
