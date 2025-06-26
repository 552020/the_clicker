# Issue: React warning - `isActive` prop on DOM element from Privy UI components

## Problem

When using Privy (e.g., with @privy-io/react-auth), you may see the following React warning in your browser console:

```
React does not recognize the `isActive` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `isactive` instead. If you accidentally passed it from a parent component, remove it from the DOM element.
```

The stack trace often points to styled-components and Privy UI internals, e.g.:

```
at div (<anonymous>)
at .../styled-components.browser.esm.js
at .../@privy-io/react-auth/dist/esm/privy-provider-3RsLI3qL.mjs
```

## Why This Happens

- The `isActive` prop is likely used internally by Privy UI components (possibly for styling or state management, e.g., active tab or selected option).
- If a styled-component or custom component does not filter out non-standard props, React will pass them down to the underlying DOM element (like `<div>` or `<button>`), which does not recognize `isActive` as a valid attribute.
- This is a common React warning and does not usually break functionality, but it clutters the console and could cause issues in future React versions.

## Functionality

- In most cases, the Privy login modal and authentication flow will still work correctly despite this warning.
- The warning is cosmetic, but should ideally be fixed by the library authors.

## What You Can Do

1. **Monitor Functionality:**
   - Confirm that the warning does not break your authentication flow or UI.
2. **Check for Updates:**
   - Ensure you are using the latest versions of `@privy-io/react-auth` and `styled-components`.
   - Check for compatibility issues between your versions of React, styled-components, and Privy.
3. **Isolate the Trigger:**
   - Note when the warning appears (e.g., on PrivyProvider load, when opening the login modal, or interacting with a specific modal element).
   - This can help identify which internal Privy component is involved.
4. **Report to Privy:**
   - If the warning persists and you are on the latest versions, consider reporting it to the Privy team via their support channels or GitHub repository.
   - Provide the stack trace and context. This is likely a library issue, not an app bug.

## References

- [React warning docs](https://react.dev/warnings/unknown-prop)
- [Privy support](https://docs.privy.io/support)

---

**This issue documents a common React warning caused by internal prop leakage in Privy UI components. It is not a critical error, but should be monitored and reported to Privy if it persists.**
