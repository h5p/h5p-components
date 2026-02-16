---
description: >-
  The Placeholder Image component displays a themed SVG placeholder when content
  images are not available, ensuring consistent visuals across content types.
---

# Placeholder Image

#### Description <a href="#description" id="description"></a>

* Renders a themed SVG placeholder image for situations where content images are missing
* Accepts either a raw SVG string or a predefined placeholder key

```javascript
// With SVG Markup
H5P.Components.PlaceholderImg(svgMarkup);
// With predefined key
H5P.Components.PlaceholderImg('h5pImageDefault');
// Will show default image
H5P.Components.PlaceholderImg();
```

* Automatically falls back to a default placeholder when no valid or supported key is provided
* Uses inline SVG to support theme variables and consistent styling across content types

#### Example <a href="#example" id="example"></a>

<figure><img src="../.gitbook/assets/Screenshot 2026-01-02 143239.png" alt="" width="188"><figcaption><p>Placeholder image inside Flashcard Content Type</p></figcaption></figure>



