var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.js
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core2 = require("@keystone-6/core");

// schema.js
var import_access = require("@keystone-6/core/access");
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");
var lists = {
  User: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      name: (0, import_fields.text)({ isRequired: true }),
      email: (0, import_fields.text)({ isRequired: true, isUnique: true, isIndexed: "unique" }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      posts: (0, import_fields.relationship)({
        ref: "Post.author",
        many: true
      })
    }
  }),
  Post: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ isRequired: true }),
      intro: (0, import_fields.text)({
        isRequired: true,
        ui: {
          displayMode: "textarea"
        }
      }),
      publishedDate: (0, import_fields.timestamp)(),
      // image: image({ storage: 'local' }),
      // Add document field here
      body: (0, import_fields_document.document)({
        formatting: true,
        links: true,
        dividers: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
          [2, 1],
          [1, 2],
          [1, 1, 1, 1]
        ]
      }),
      author: (0, import_fields.relationship)({
        ref: "User.posts",
        ui: {
          displayMode: "cards",
          cardFields: ["name", "email"],
          linkToItem: true,
          inlineConnect: true
        }
      }),
      status: (0, import_fields.select)({
        options: [
          { label: "Draft", value: "draft", isDefault: true },
          { label: "Published", value: "published" }
        ],
        ui: {
          displayMode: "segmented-control",
          createView: { fieldMode: "hidden" }
        }
      })
    },
    ui: {
      listView: {
        initialColumns: ["title", "status", "author", "publishedDate"]
      }
    }
  }),
  Snippet: (0, import_core.list)({
    access: import_access.allowAll,
    fields: {
      title: (0, import_fields.text)({ isRequired: true }),
      description: (0, import_fields.text)({ isRequired: true }),
      body: (0, import_fields.text)({ isRequired: true })
    }
  })
};

// auth.js
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
    // List-level access controls
    // access: { create: true, read: true, update: true, delete: true, auth: true },
  }
});
var sessionSecret = "myverysecretsecretthatneedstobechangedandsuperlong";
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.js
var keystone_default = (0, import_core2.config)(
  withAuth(
    {
      db: {
        provider: "sqlite",
        url: "file:./keystone.db"
      },
      lists,
      session,
      ui: {
        isAccessAllowed: (context) => !!context.session?.data
      }
    }
  )
);
