const m2s = require("mongoose-to-swagger");
const user = require("./models/user.model");
const { response } = require("express");
exports.options = {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Products CRUD API",
    description: "Products and users application",
    contact: {
      name: "Aggelos",
      url: "https://coding-factory.gr",
      email: "aggepap@gmail.com",
    },
  },
  components: {
    schemas: {
      User: m2s(user),
    },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "local server",
    },
    {
      url: "https://www.example.com",
      description: "testing server",
    },
  ],
  tags: [
    {
      name: "Users",
      description: "request for users",
    },
    {
      name: "Users and Products",
      description: "request for user's products",
    },
  ],

  paths: {
    "/api/users": {
      get: {
        tags: ["Users"],
        description: "Returns all users",
        responses: {
          200: {
            description: "list of all users",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Users"],
        description: "create new user",
        requestBody: {
          description: "data for user that we create",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  password: { type: "string" },
                  name: { type: "string" },
                  lastname: { type: "string" },
                  email: { type: "string" },
                  address: {
                    " type": "Object",
                    properties: {
                      area: { type: "string" },
                      road: { type: "string" },
                    },
                  },
                  phone: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        type: { type: "string" },
                        number: { type: "string" },
                      },
                    },
                  },
                },
                required: ["username", "password", "firstname", "lastname"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "new user is created",
          },
        },
      },
    },

    "/api/users/{username}": {
      get: {
        tags: ["Users"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user that we want to find",
            type: "string",
          },
        ],
        description: "get user with specific username",
        responses: {
          200: {
            description: "user result",
            schema: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      patch: {
        tags: ["Users"],
        description: "update user",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "username of user we want to update",
            type: "string",
          },
        ],
        requestBody: {
          description: "details of user to update",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  lastname: { type: "string" },
                  email: { type: "string" },
                  address: {
                    type: "Object",
                    properties: {
                      area: { type: "string" },
                      road: { type: "string" },
                    },
                  },
                },
                required: ["email"],
              },
            },
          },
        },
        responses: {
          200: {
            description: "update user",
            schema: {
              $ref: "#/components/schema/User",
            },
          },
        },
      },
      delete: {
        tags: ["Users"],
        description: "deletes user",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "username of user to be deleted",
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Delete a user",
          },
        },
      },
    },
    "/api/user-product/users/products": {
      get: {
        tags: ["Users and Products"],
        description: "Returns all users and their products",
        responses: {
          200: {
            description: "all users with their products",
          },
        },
      },
    },
    "/api/user-product/{username}/products": {
      get: {
        tags: ["Users and Products"],
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "username of user to find products",
            type: "string",
          },
        ],
        description: "username and products",
        responses: {
          200: {
            description: "user to find",
          },
        },
      },
      post: {
        tags: ["Users and Products"],
        description: "add new products to user",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user that we want to find",
            type: "string",
          },
        ],
        requestBody: {
          description: "data to add products",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string" },
                  products: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        product: { type: "string" },
                        cost: { type: "number" },
                        quantity: { type: "number" },
                      },
                    },
                  },
                },
                required: ["quantity"],
              },
            },
          },
        },

        responses: {
          200: {
            description: "New products to user",
          },
        },
      },
    },
    "/api/user-products/{username}/products/{id}": {
      patch: {
        tags: ["Users and Products"],
        description: "update user's products",
        parameters: [
          {
            name: "username",
            in: "path",
            required: true,
            description: "Username of user",
            type: "string",
          },
          {
            name: "id",
            in: "path",
            required: true,
            description: "id of product to update",
            type: "string",
          },
        ],
        requestBody: {
          description: "Quantity of product to update",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  product: {
                    type: "object",
                    properties: {
                      quantity: { type: "number" },
                    },
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "update product from user",
          },
        },
      },
    },
  },
};
