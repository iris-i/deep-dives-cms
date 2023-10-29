// Create a slug from the title
export const slugifyTitle = (resolvedData, inputData, operation) => {
  if (operation === 'create' && !inputData.slug) {
    return {
      ...resolvedData,
      slug: resolvedData.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, ''),
    };
  }
  return resolvedData;
};

// Check if user input is a valid slug.
export function isValidSlug(slug) {
  // Check if the slug is not empty
  if (!slug) {
    return false;
  }

  // Check if the slug consists of lowercase letters and hyphens only
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return false;
  }

  // Check if the slug does not start or end with a hyphen
  if (slug.startsWith('-') || slug.endsWith('-')) {
    return false;
  }

  return true;
}

// Error message when the wrong input is entered in a slug.
export async function validationError( resolvedData, addValidationError ) {
  if (resolvedData.slug && !isValidSlug(resolvedData.slug)) {
    addValidationError('The slug must consist of lowercase letters and hyphens only and must not start or end with a hyphen.');
  }
}

// Hooks for rewriting the slug.
// @todo break this up so more hooks can be added to the list.
export const slugHooks = {
  // Generate a slug based on the title
  resolveInput: async ({ resolvedData, operation, inputData, context }) => {
    return slugifyTitle(resolvedData, inputData, operation);
  },
  // Validate manually-entered slug to ensure that it follows the regex pattern above.
  validateInput: async ({ resolvedData, addValidationError }) => {
    validationError(resolvedData, addValidationError);
  },
}
