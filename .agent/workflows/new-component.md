---
description: Create a new Svelte 5 component in packages/client/src/components/ using Runes ($state, $derived), TypeScript, vanilla CSS, black-and-white design only.
---

1. Ask the user for the component name (e.g. `Button`, `Modal`).
2. Create a new file in `packages/client/src/components/[ComponentName].svelte`.
3. In the `<script lang="ts">` block:
    a. Define props using `$props()`.
    b. Define state using `$state()` runes.
    c. Define derived state using `$derived()` runes.
    d. Define side effects using `$effect()` runes if necessary.
4. In the template:
    a. Use semantic HTML elements.
    b. Use vanilla CSS for styling, focusing on a black-and-white, minimal design.
    c. Ensure accessibility (aria attributes, etc.).
5. In the `<style>` block:
    a. Write scoped CSS.
    b. Use CSS variables if available for consistency (e.g. `var(--color-black)`, `var(--color-white)`).
    c. Ensure the design is strictly black and white (no colors unless strictly necessary for errors/success, but prefer monochrome).
6. Verify the component exports necessary interfaces or types if needed.
