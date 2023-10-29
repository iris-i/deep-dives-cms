var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.js
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_dotenv = __toESM(require("dotenv"));
var import_core2 = require("@keystone-6/core");

// schema.js
var import_core = require("@keystone-6/core");

// component-blocks/component-blocks.jsx
var import_react = __toESM(require("react"));
var import_component_blocks = require("@keystone-6/fields-document/component-blocks");

// component-blocks/shared-components/quote.module.css
var _default = {};

// component-blocks/shared-components/quote.jsx
var Quote = ({ attribution, content }) => {
  let { quote_text, author, quote } = _default;
  return /* @__PURE__ */ React.createElement("figure", { className: quote }, /* @__PURE__ */ React.createElement("blockquote", { className: quote_text }, content), attribution && /* @__PURE__ */ React.createElement("figcaption", { className: author }, attribution));
};
var quote_default = Quote;

// component-blocks/component-blocks.jsx
var componentBlocks = {
  quote: (0, import_component_blocks.component)({
    preview: (props) => {
      return /* @__PURE__ */ import_react.default.createElement(quote_default, { attribution: props.fields.attribution.element, content: props.fields.content.element });
    },
    label: "Quote",
    schema: {
      content: import_component_blocks.fields.child({
        kind: "block",
        placeholder: "Quote...",
        formatting: { inlineMarks: "inherit", softBreaks: "inherit" },
        links: "inherit"
      }),
      attribution: import_component_blocks.fields.child({
        kind: "inline",
        placeholder: "\u2014 Attribution"
      })
    },
    chromeless: true
  })
};

// content-schema/postFields.js
var import_fields = require("@keystone-6/core/fields");
var import_access = require("@keystone-6/core/access");

// content-schema/commonFields.js
var import_fields_document = require("@keystone-6/fields-document");
var documentField = (0, import_fields_document.document)({
  formatting: true,
  links: true,
  dividers: true,
  layouts: [
    [1, 1],
    [1, 1, 1],
    [2, 1],
    [1, 2],
    [1, 1, 1, 1]
  ],
  ui: {
    views: "./component-blocks/component-blocks"
  },
  componentBlocks
});
var categoriesUi = {
  displayMode: "select",
  cardFields: ["name"],
  linkToItem: false,
  inlineConnect: true
};

// utils/slugUtils.js
var slugifyTitle = (resolvedData, inputData, operation) => {
  if (operation === "create" && !inputData.slug) {
    return {
      ...resolvedData,
      slug: resolvedData.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    };
  }
  return resolvedData;
};
function isValidSlug(slug) {
  if (!slug) {
    return false;
  }
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return false;
  }
  if (slug.startsWith("-") || slug.endsWith("-")) {
    return false;
  }
  return true;
}
async function validationError(resolvedData, addValidationError) {
  if (resolvedData.slug && !isValidSlug(resolvedData.slug)) {
    addValidationError("The slug must consist of lowercase letters and hyphens only and must not start or end with a hyphen.");
  }
}
var slugHooks = {
  // Generate a slug based on the title
  resolveInput: async ({ resolvedData, operation, inputData, context }) => {
    return slugifyTitle(resolvedData, inputData, operation);
  },
  // Validate manually-entered slug to ensure that it follows the regex pattern above.
  validateInput: async ({ resolvedData, addValidationError }) => {
    validationError(resolvedData, addValidationError);
  }
};

// content-schema/postFields.js
var postFields_default = postFields = {
  access: import_access.allowAll,
  fields: {
    title: (0, import_fields.text)({ isRequired: true }),
    slug: (0, import_fields.text)({ isUnique: true, isIndexed: "unique" }),
    intro: (0, import_fields.text)({
      isRequired: true,
      ui: {
        displayMode: "textarea"
      }
    }),
    publishedDate: (0, import_fields.timestamp)(),
    // image: image({ storage: 'local' }),
    // Add document field here
    body: documentField,
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
    }),
    categories: (0, import_fields.relationship)({
      ref: "Category.posts",
      many: true
    }),
    learningJourneys: (0, import_fields.relationship)({
      ref: "LearningJourney.posts"
    })
  },
  ui: {
    listView: {
      initialColumns: ["title", "status", "author", "publishedDate"]
    }
  },
  hooks: slugHooks
};

// content-schema/userFields.js
var import_access2 = require("@keystone-6/core/access");
var import_fields2 = require("@keystone-6/core/fields");
var userFields_default = userFields = {
  access: import_access2.allowAll,
  fields: {
    name: (0, import_fields2.text)({ isRequired: true }),
    email: (0, import_fields2.text)({ isRequired: true, isUnique: true, isIndexed: "unique" }),
    password: (0, import_fields2.password)({ validation: { isRequired: true } }),
    posts: (0, import_fields2.relationship)({
      ref: "Post.author",
      many: true
    })
  }
};

// content-schema/snippetFields.js
var import_fields3 = require("@keystone-6/core/fields");
var import_access3 = require("@keystone-6/core/access");
var snippetFields_default = snippetFields = {
  access: import_access3.allowAll,
  fields: {
    title: (0, import_fields3.text)({ isRequired: true }),
    slug: (0, import_fields3.text)({ isUnique: true, isIndexed: "unique" }),
    description: (0, import_fields3.text)({ isRequired: true }),
    body: documentField,
    publishedDate: (0, import_fields3.timestamp)(),
    categories: (0, import_fields3.relationship)({
      ref: "Category.snippets",
      many: true,
      ui: categoriesUi
    })
  },
  hooks: slugHooks
};

// content-schema/learningJourneyFields.js
var import_access4 = require("@keystone-6/core/access");
var import_fields4 = require("@keystone-6/core/fields");
var learningJourneyFields_default = learningJourneyFields = {
  access: import_access4.allowAll,
  fields: {
    name: (0, import_fields4.text)({ isRequired: true }),
    slug: (0, import_fields4.text)({ isUnique: true, isIndexed: "unique" }),
    description: documentField,
    posts: (0, import_fields4.relationship)({
      ref: "Post.learningJourneys",
      many: true
    }),
    categories: (0, import_fields4.relationship)({
      ref: "Category.learningJourneys",
      many: true,
      ui: {
        displayMode: "select",
        cardFields: ["name"],
        linkToItem: false,
        inlineConnect: true
      }
    })
  },
  hooks: slugHooks
};

// content-schema/categoryFields.js
var import_access5 = require("@keystone-6/core/access");
var import_fields5 = require("@keystone-6/core/fields");
var categoryFields_default = categoryFields = {
  access: import_access5.allowAll,
  fields: {
    name: (0, import_fields5.text)({ isRequired: true }),
    slug: (0, import_fields5.text)({ isUnique: true, isIndexed: "unique" }),
    posts: (0, import_fields5.relationship)({
      ref: "Post.categories",
      many: true
    }),
    snippets: (0, import_fields5.relationship)({
      ref: "Snippet.categories",
      many: true
    }),
    learningJourneys: (0, import_fields5.relationship)({
      ref: "LearningJourney.categories",
      many: true
    })
  }
  // @tod not working, fix later.
  // hooks: slugHooks
};

// content-schema/index.js
var userSchema = {
  ...userFields_default
};
var postSchema = {
  ...postFields_default
};
var snippetSchema = {
  ...snippetFields_default
};
var learningJourneySchema = {
  ...learningJourneyFields_default
};
var categorySchema = {
  ...categoryFields_default
};

// schema.js
var lists = {
  User: (0, import_core.list)({
    ...userSchema
  }),
  Post: (0, import_core.list)({
    ...postSchema
  }),
  Snippet: (0, import_core.list)({
    ...snippetSchema
  }),
  LearningJourney: (0, import_core.list)({
    ...learningJourneySchema
  }),
  Category: (0, import_core.list)({
    ...categorySchema
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
import_dotenv.default.config({ path: `.env-${process.env.NODE_ENV}` });
var keystone_default = (0, import_core2.config)(
  withAuth(
    {
      db: {
        provider: process.env.PROVIDER,
        url: process.env.DATABASE_URL
      },
      lists,
      session,
      ui: {
        isAccessAllowed: (context) => !!context.session?.data
      }
    }
  )
);
