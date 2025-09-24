---
description: >-
  Css variables for color, spacing etc. allow the author or organization to
  customize the look of their content.
---

# Variables

**Note:** The variables are defined in core (h5p-php-libraries), however, since the component library heavily uses the variables, they are documentet here anyway

## Colors

A total of 34 color variables are currently available.

### User-Defined Colors

![](<../.gitbook/assets/unknown (37).png>)

| Variable name                  | Usage                                                                                                                                                                                      |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| --h5p-theme-main-cta-base      | Used for primary CTA buttons                                                                                                                                                               |
| --h5p-theme-secondary-cta-base | Used for navigation buttons                                                                                                                                                                |
| --h5p-theme-alternative-base   | Used for alternatives (HUE picker)                                                                                                                                                         |
| --h5p-theme-background         | <p>Used for backgrounds inside container content types like:</p><ul><li>Dialog Cards</li><li>Flashcards</li><li>Question Set</li><li>Single Choice Set</li><li>Multimedia Choice</li></ul> |

### Calculated Colors

The variables listed below are calculated in the code based on the colors defined by the user.

| Variable name                            | Usage                                                                                                                                                                                                                                                                                                                                       | Rules for generating                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --h5p-theme-main-cta-light               | Used for hover on main CTA buttons                                                                                                                                                                                                                                                                                                          | --h5p-theme-main-cta-base +5% lightness                                                                                                                       |
| --h5p-theme-main-cta-dark                | Used for the active state (pressed) on the main CTA buttons                                                                                                                                                                                                                                                                                 | --h5p-theme-main-cta-base -5% lightness                                                                                                                       |
| --h5p-theme-contrast-cta                 | Used for labels on main CTA buttons                                                                                                                                                                                                                                                                                                         | --h5p-theme-main-cta-base +/- lightness until the color has 4.6:1 contrast ratio against --h5p-theme-main-cta-base                                            |
| --h5p-theme-contrast-cta-white           | <p>A darkened version of main CTA color that gives good contrast on white backgrounds.<br> </p><p>Used for backgrounds of UI elements like page counter, pages menu in “Interactive Book”, “Course Presentation” slides, etc</p>                                                                                                            | --h5p-theme-main-cta-base +/- lightness until the color has 4.6:1 contrast ratio against --h5p-theme-ui-base                                                  |
| --h5p-theme-contrast-cta-light           | Used for secondary CTA buttons                                                                                                                                                                                                                                                                                                              | --h5p-theme-main-cta-base +10% opacity                                                                                                                        |
| --h5p-theme-contrast-cta-dark            | <p>Similar like var(--h5p-theme-contrast-cta-white which is a version of main cta that gives good contrast on white backgrounds. <br><br>var(--h5p-theme-contrast-cta-dark) does the opposite - makes a lighter variation of main CTA that gives enough contrast when used on a dark background. Used on IV player handle and seek bar.</p> | --h5p-theme-main-cta-base +/- lightness until the color has 4.6:1 contrast ratio against #282836                                                              |
| --h5p-theme-secondary-cta-light          | Used for navigation buttons (hover)                                                                                                                                                                                                                                                                                                         | --h5p-theme-secondary-cta-base +5% lightness                                                                                                                  |
| --h5p-theme-secondary-cta-dark           | Used for navigation buttons (active)                                                                                                                                                                                                                                                                                                        | --h5p-theme-secondary-cta-base -5% lightness                                                                                                                  |
| --h5p-theme-secondary-contrast-cta       | Used for navigation buttons' labels                                                                                                                                                                                                                                                                                                         | --h5p-theme-secondary-cta-base + lightness until the color has 4.6:1 contrast ratio against --h5p-theme-secondary-cta-base)                                   |
| --h5p-theme-secondary-contrast-cta-hover | Used for labels and icon color on hover and active state of secondary CTA.                                                                                                                                                                                                                                                                  | --h5p-theme-main-cta-base +/- lightness until the color has 4.6:1 contrast ratio against --h5p-theme-contrast-cta-white (used for secondary button hover text |
| --h5p-theme-alternative-light            | Used for alternatives (hover)                                                                                                                                                                                                                                                                                                               | Apply the hue selected under Alternative to #F8F9FE                                                                                                           |
| --h5p-theme-alternative-dark             | Used for alternatives (active/pressed)                                                                                                                                                                                                                                                                                                      | Apply the hue selected under Alternative to #DCDFFA                                                                                                           |
| --h5p-theme-alternative-darker           | Used for darker elements on alternatives like borders and drop shadows.                                                                                                                                                                                                                                                                     | Apply the hue selected under Alternative to #ced1ee                                                                                                           |

### Fixed variables (changeable per theme)

| Variable name        | Usage                                               |
| -------------------- | --------------------------------------------------- |
| --h5p-theme-stroke-1 | Used for most prominent borders (importance 1)      |
| --h5p-theme-stroke-2 | Used for less prominent borders (importance 2)      |
| --h5p-theme-stroke-3 | Used for the least prominent borders (importance 3) |

### Fixed variables (consistent across all themes)

These serve as base variables for the upcoming dark mode. Currently, values are defined only for the light mode.

| Variable name                            | Usage                                                                                                           |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| --h5p-theme-ui-base                      | <p>Used for all background inside questions.<br>Every white background should be defined as this variable. </p> |
| --h5p-theme-text-primary                 | Used for text importance 1 (question titles, for instance, labels, alternatives etc)                            |
| --h5p-theme-text-secondary               | Used for text  importance 2 (question descriptions)                                                             |
| --h5p-theme-text-third                   | Used for text  importance 3 (other texts of less importance)                                                    |
| --h5p-theme-feedback-correct-main        | Used for text and icons on feedback UI (correct feedback)                                                       |
| --h5p-theme-feedback-correct-secondary   | Used for background on feedback UI (correct feedback)                                                           |
| --h5p-theme-feedback-correct-third       | Used for the borders of a feedback box (correct feedback)                                                       |
| --h5p-theme-feedback-incorrect-main      | Used for text and icons on feedback UI (correct feedback)                                                       |
| --h5p-theme-feedback-incorrect-secondary | Used for background on feedback UI (correct feedback)                                                           |
| --h5p-theme-feedback-incorrect-third     | Used for the borders of a feedback box (correct feedback)                                                       |
| --h5p-theme-feedback-neutral-main        | Used for text and icons on feedback UI (neutral feedback)                                                       |
| --h5p-theme-feedback-neutral-secondary   | <p>Used for background on feedback UI</p><p>(neutral feedback)</p>                                              |
| --h5p-theme-feedback-neutral-third       | <p>Used for the borders of a feedback box </p><p>(neutral feedback)</p>                                         |

## Other Variables

| Variable name                    | Usage                                                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| --h5p-theme-border-radius-large  | Used for the biggest border radius                                                                                                                 |
| --h5p-theme-border-radius-medium | Used for the middle border radius                                                                                                                  |
| --h5p-theme-border-radius-small  | Used for the smallest border radius                                                                                                                |
| --h5p-theme-font-name            | This variable holds the font name used everywhere in NEUD. If we need to change the font we use, this variable should be changed to the new value. |

## Spacing and font variables

The spacing variables are changed dynamically based on the density setting. This is done by applying the classes `h5p-large`, `h5p-medium`, or none for small. To take advantage of these dynamic variables, please **use the variables in the first column, and avoid using the density-specific variables in the second column**

The medium and small values are multiples of the larger sets of variables. E.g. `--h5p-theme-spacing-xl-primary-medium: calc(var(--h5p-theme-spacing-xl-primary-large) * 0.8);` For simplicity, we'll just write the multiplication factor here.

### Spacing

These variables are used for different paddings/margins from largest to smallest.

| Spacing variables       | Size-specifc values                                                                                                                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --h5p-theme-spacing-xl  | <p><strong>Large:</strong> --h5p-theme-spacing-xl-primary-large: 3rem;</p><p><strong>Medium:</strong> --h5p-theme-spacing-xl-primary-medium: Large * 0.8</p><p><strong>Small:</strong> --h5p-theme-spacing-xl-primary-small: Medium * 0.8</p> |
| --h5p-theme-spacing-l   | <p><strong>Large:</strong> --h5p-theme-spacing-primary-large: 2rem;</p><p><strong>Medium:</strong> --h5p-theme-spacing-primary-medium: Large * 0.8</p><p><strong>Small:</strong> --h5p-theme-spacing-primary-small: Medium * 0.8</p>          |
| --h5p-theme-spacing-m   | <p><strong>Large:</strong> --h5p-theme-spacing-secondary-large: 1.5rem;</p><p><strong>Medium:</strong> --h5p-theme-spacing-secondary-medium: Large * 0.8</p><p><strong>Small:</strong> --h5p-theme-spacing-secondary-small: Medium * 0.8</p>  |
| --h5p-theme-spacing-s   | <p><strong>Large:</strong> --h5p-theme-spacing-third-large: 1rem;</p><p><strong>Medium:</strong> --h5p-theme-spacing-third-medium: Large * 0.8</p><p><strong>Small:</strong> --h5p-theme-spacing-third-small: Medium * 0.8</p>                |
| --h5p-theme-spacing-xs  | <p><strong>Large:</strong> --h5p-theme-spacing-fourth-large: 0.65rem;</p><p><strong>Medium:</strong> --h5p-theme-spacing-fourth-medium: Large * 0.8</p><p><strong>Small:</strong> --h5p-theme-spacing-fourth-small: Medium * 0.8</p>          |
| --h5p-theme-spacing-xxs | <p><strong>Large:</strong> --h5p-theme-spacing-fifth-large: 0.5rem;</p><p><strong>Medium:</strong> --h5p-theme-spacing-fifth-medium: Large * 0.8</p><p><strong>Small:</strong> --h5p-theme-spacing-fifth-small: Medium * 0.8</p>              |

### Font <a href="#docs-internal-guid-745468ea-7fff-feab-3e5d-3d662a8c5b8d" id="docs-internal-guid-745468ea-7fff-feab-3e5d-3d662a8c5b8d"></a>

These variables are used for different texts across content types

**Note:** Small is the same as Medium for the font sizes, to prevent accessibility issues from too small font.

| Font size variables       | Size-specifc values                                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --h5p-theme-font-size-xxl | <p><strong>Large:</strong> --h5p-theme-font-size-xxl-large: 1.5rem;</p><p><strong>Medium:</strong> --h5p-theme-font-size-xxl-medium: Large * 0.9</p><p><strong>Small:</strong> --h5p-theme-font-size-xxl-small: Medium</p> |
| --h5p-theme-font-size-xl  | <p><strong>Large:</strong> --h5p-theme-font-size-xl-large: 1.25rem;</p><p><strong>Medium:</strong> --h5p-theme-font-size-xl-medium:  Large * 0.9</p><p><strong>Small:</strong> --h5p-theme-font-size-xl-small: Medium</p>  |
| --h5p-theme-font-size-l   | <p><strong>Large:</strong> --h5p-theme-font-size-l-large: 1.125rem;</p><p><strong>Medium:</strong> --h5p-theme-font-size-l-medium: Large * 0.9</p><p><strong>Small:</strong> --h5p-theme-font-size-l-small: Medium</p>     |
| --h5p-theme-font-size-m   | <p><strong>Large:</strong> --h5p-theme-font-size-m-large: 1rem;</p><p><strong>Medium:</strong> --h5p-theme-font-size-m-medium: Large * 0.9</p><p><strong>Small:</strong> --h5p-theme-font-size-m-small: Medium</p>         |
| --h5p-theme-font-size-s   | <p><strong>Large:</strong> --h5p-theme-font-size-s-large: 0.85rem;</p><p><strong>Medium:</strong> --h5p-theme-font-size-s-medium: Large * 0.9</p><p><strong>Small:</strong> --h5p-theme-font-size-s-small: Medium</p>      |
| --h5p-theme-scaling       | <p><strong>Large:</strong> 1</p><p><strong>Medium:</strong> 0.8</p><p><strong>Small:</strong> 0.6</p>                                                                                                                      |

## Other Variables (Fixed, always the same)

| Variable name                    | Value               |
| -------------------------------- | ------------------- |
| --h5p-theme-border-radius-large  | 0.5rem              |
| --h5p-theme-border-radius-medium | 0.375rem            |
| --h5p-theme-border-radius-small  | 0.25rem             |
| --h5p-theme-font-name            | "Inter", sans-serif |

### Fixed Colors

| Variable name                            | Value    |
| ---------------------------------------- | -------- |
| --h5p-theme-ui-base                      |  #FFFFFF |
| --h5p-theme-text-primary                 | #10172   |
| --h5p-theme-text-secondary               | #2c0f03  |
| --h5p-theme-text-third                   | #737373  |
| --h5p-theme-feedback-correct-main        | #256D1D  |
| --h5p-theme-feedback-correct-secondary   | #f3fcf0  |
| --h5p-theme-feedback-correct-third       | #cff1c2  |
| --h5p-theme-feedback-incorrect-main      | #a13236  |
| --h5p-theme-feedback-incorrect-secondary | #faf0f4  |
| --h5p-theme-feedback-incorrect-third     | #f6dce7  |
| --h5p-theme-feedback-neutral-main        | #E6C81D  |
| --h5p-theme-feedback-neutral-secondary   | #5E4817  |
| --h5p-theme-feedback-neutral-third       | #F0EBCB  |
