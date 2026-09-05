"use server";

import { cookies } from "next/headers";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  "http://localhost:4000";

// ============================================
// Auth Functions
// ============================================

export async function getSession() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(
      `${BACKEND_API_URL}/api/auth/session`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Session request failed (${res.status})`
      );
    }

    return await res.json();
  } catch (err) {
    console.error("getSession:", err);
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

// ============================================
// Helper Functions
// ============================================

async function dalFetch(
  path,
  options = {}
) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value;

  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Cookie = `token=${token}`;
  }

  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers["Content-Type"] =
      "application/json";
  }

  try {
    const res = await fetch(
      `${BACKEND_API_URL}${path}`,
      {
        ...options,
        headers,
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `API error: ${res.status}`
      );
    }

    if (
      res.status === 204 ||
      res.headers.get("content-length") === "0"
    ) {
      return null;
    }

    const contentType =
      res.headers.get("content-type");

    if (
      contentType?.includes(
        "application/json"
      )
    ) {
      return await res.json();
    }

    return await res.text();
  } catch (err) {
    console.error(
      `dalFetch ${path}:`,
      err
    );
    throw err;
  }
}

// ============================================
// Brand Operations
// ============================================

export async function getBrands() {
  await requireAuth();
  return await dalFetch("/api/brand/");
}

export async function createBrand(data) {
  await requireAuth();
  return await dalFetch(
    "/api/brand/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function updateBrand(
  id,
  data
) {
  await requireAuth();
  return await dalFetch(
    `/api/brand/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteBrand(id) {
  await requireAuth();
  return await dalFetch(
    `/api/brand/${id}`,
    {
      method: "DELETE",
    }
  );
}

// ============================================
// Category Operations
// ============================================

export async function getCategories() {
  await requireAuth();
  return await dalFetch("/api/category/");
}

export async function createCategory(
  data
) {
  await requireAuth();
  return await dalFetch(
    "/api/category/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function updateCategory(
  id,
  data
) {
  await requireAuth();
  return await dalFetch(
    `/api/category/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteCategory(id) {
  await requireAuth();
  return await dalFetch(
    `/api/category/${id}`,
    {
      method: "DELETE",
    }
  );
}

// ============================================
// Product Operations
// ============================================

export async function getProducts(params = {}) {
  await requireAuth();
  const query = new URLSearchParams(
    Object.entries(params).filter(
      ([_, v]) => v !== undefined && v !== "" && v !== null
    )
  ).toString();
  return await dalFetch(query ? `/api/product?${query}` : "/api/product");
}

export async function getProductById(id) {
  await requireAuth();
  return await dalFetch(`/api/product/${id}`);
}

export async function getProductsByCategory(enName) {
  await requireAuth();
  return await dalFetch(`/api/product/category/${enName}`);
}

export async function createProduct(
  data
) {
  await requireAuth();
  return await dalFetch(
    "/api/product",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

export async function updateProduct(
  id,
  data
) {
  await requireAuth();
  return await dalFetch(
    `/api/product/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteProduct(id) {
  await requireAuth();
  return await dalFetch(
    `/api/product/${id}`,
    {
      method: "DELETE",
    }
  );
}

// ============================================
// Media Operations
// ============================================

export async function getMedia(params = {}) {
  await requireAuth();
  const query = new URLSearchParams(
    Object.entries(params).filter(
      ([_, v]) => v !== undefined && v !== "" && v !== null
    )
  ).toString();
  return await dalFetch(query ? `/api/media/?${query}` : "/api/media/");
}

export async function createMedia(data) {
  await requireAuth();
  return await dalFetch(
    "/api/media/",
    {
      method: "POST",
      body:
        data instanceof FormData
          ? data
          : JSON.stringify(data),
    }
  );
}

export async function deleteMedia(id) {
  await requireAuth();
  return await dalFetch(
    `/api/media/${id}`,
    {
      method: "DELETE",
    }
  );
}