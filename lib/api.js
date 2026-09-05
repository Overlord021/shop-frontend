const BACKEND_API_URL =
  typeof window === "undefined"
    ? process.env.BACKEND_API_URL
    : process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function parseResponse(res) {
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
}

export async function apiFetch(
  path,
  options = {}
) {
  const isFormData =
    options.body instanceof FormData;

  const headers = {
    ...(isFormData
      ? {}
      : options.body
        ? {
            "Content-Type":
              "application/json",
          }
        : {}),
    ...options.headers,
  };

  const res = await fetch(
    `${BACKEND_API_URL}${path}`,
    {
      credentials: "include",
      ...options,
      headers,
    }
  );

  const data =
    await parseResponse(res);

  if (!res.ok) {
    const error = new Error(
      data?.message ||
        res.statusText ||
        "API error"
    );

    error.status = res.status;

    error.info =
      typeof data === "object"
        ? data
        : { message: data };

    throw error;
  }

  return data;
}

export const authApi = {
  signUp: (data) =>
    apiFetch(
      "/api/auth/sign-up",
      {
        method: "POST",
        body: JSON.stringify(
          data
        ),
      }
    ),

  signIn: (data) =>
    apiFetch(
      "/api/auth/sign-in",
      {
        method: "POST",
        body: JSON.stringify(
          data
        ),
      }
    ),

  signOut: () =>
    apiFetch(
      "/api/auth/sign-out",
      {
        method: "DELETE",
      }
    ),
};

export const brandApi = {
  create: (data) =>
    apiFetch(
      "/api/brand/",
      {
        method: "POST",
        body: JSON.stringify(
          data
        ),
      }
    ),

  update: (id, data) =>
    apiFetch(
      `/api/brand/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(
          data
        ),
      }
    ),

  remove: (id) =>
    apiFetch(
      `/api/brand/${id}`,
      {
        method: "DELETE",
      }
    ),
};

export const categoryApi = {
  create: (data) =>
    apiFetch(
      "/api/category/",
      {
        method: "POST",
        body: JSON.stringify(
          data
        ),
      }
    ),

  update: (id, data) =>
    apiFetch(
      `/api/category/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(
          data
        ),
      }
    ),

  remove: (id) =>
    apiFetch(
      `/api/category/${id}`,
      {
        method: "DELETE",
      }
    ),
};

export const productApi = {
  list: (params = {}) => {
    const query = new URLSearchParams(
      Object.entries(params).filter(
        ([_, v]) => v !== undefined && v !== "" && v !== null
      )
    ).toString();
    return apiFetch(query ? `/api/product?${query}` : "/api/product");
  },

  create: (data) =>
    apiFetch(
      "/api/product",
      {
        method: "POST",
        body: JSON.stringify(
          data
        ),
      }
    ),

  update: (id, data) =>
    apiFetch(
      `/api/product/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(
          data
        ),
      }
    ),

  remove: (id) =>
    apiFetch(
      `/api/product/${id}`,
      {
        method: "DELETE",
      }
    ),
};

export const mediaApi = {
  create: (data) =>
    apiFetch(
      "/api/media/",
      {
        method: "POST",
        body: data instanceof FormData
          ? data
          : JSON.stringify(data),
      }
    ),

  update: (id, data) =>
    apiFetch(
      `/api/media/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    ),

  remove: (id) =>
    apiFetch(
      `/api/media/${id}`,
      {
        method: "DELETE",
      }
    ),
};