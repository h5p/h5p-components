---
description: >-
  NB: The alternative component has yet to be created. This documentation
  describes how the alternatives look as they've been implemented separately in
  the different content types
---

# Alternative

We use the term Alternative to indicate any choice the user can make when answering questions. Examples of usage:

* “Multiple Choice” choices
* “Single Choice Set” choices
* “Multimedia Choice” images
* “Memory Game” cards
* etc.



Note that Alternative  differs a lot from content type to content type, depending on the format of the activity, but they all have these things in common:

* Alternative will always use  `--h5p-theme-alternative-base` as a base color in combination with `--h5p-theme-alternative-light` for hover effect, `--h5p-theme-alternative-dark` for active states, and  `--h5p-theme-alternative-darker` for elements that need more contrast, like border colors, shadows etc.
* Alternative will always use a combination of `--h5p-theme-feedback-incorrect-third`, `--h5p-theme-feedback-incorrect-second`, `--h5p-theme-feedback-incorrect-main` (and same for correct) for feedback mode (see more under Feedback section)

## Examples

Below are some examples of Alternatives in various content types

### Multiple Choice

<table><thead><tr><th width="209">State</th><th>Appearance</th></tr></thead><tbody><tr><td>Normal</td><td><div><figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Hover</td><td><div><figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Selected</td><td><div><figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Focus</td><td><div><figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Validated (Correct)</td><td><div><figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Validated (Incorrect)</td><td><div><figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Validated (Not selected)</td><td><div><figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure></div></td></tr></tbody></table>

### Multi Media Choice

<table><thead><tr><th width="204">State</th><th>Appearance</th></tr></thead><tbody><tr><td>Normal</td><td><div><figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Hover</td><td><div><figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Selected</td><td><div><figure><img src="../.gitbook/assets/image (10).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Validated (Correct)</td><td><div><figure><img src="../.gitbook/assets/image (11).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Validated (Incorrect)</td><td><div><figure><img src="../.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Validated (Not selected)</td><td><div><figure><img src="../.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure></div></td></tr><tr><td>Solution (Not selected, but should have been)</td><td><div><figure><img src="../.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure></div></td></tr></tbody></table>



