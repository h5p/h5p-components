---
description: >-
  The Result Screen is a summery of how the user did on the different questions
  or tasks in the content type
---

# Result Screen

## Elements

The Result Screen component includes:

* A title line and question counter
* A table of questions/tasks
* Individual questions/tasks with corresponding scores
* Feedback for each question (see the Feedback section)

Not included, but commonly used in combination with it:

* Action buttons (styled as secondary CTAs, except for the Submit report button, which should use the primary CTA style)

## Content Types

Content types that currently use the Result Screen component are:

* Interactive Video
* Course Presentation
* Question Set
* Single Choice Set
* Flashcards
* Dialog Cards (repetition mode)
* Interactive Book

In Interactive Book, the ResultScreen is modified as it has a lot of extra elements that are not part of other summary screens

![](<../.gitbook/assets/unknown (38).png>)

## Differences

Elements above can vary significantly across different content types. These differences are functional rather than visual, and making them consistent across content types is outside the scope of the NEUD project.



* Flashcards and Single Choice Set include not only a list of questions but also per-question correct/incorrect feedback
* Some content types use different titles, such as "Results" or "Summary"
* Some content types display only answered questions (e.g., Interactive Video)
* Some content types include a Close button on the Result Screen (e.g., Interactive Video)
* Action buttons at the bottom vary between content types
* Some content types (like Course Presentation and Interactive Video) appear to use larger text and buttons on the Result Screen
  * **NOTE**: Interactive Video and Course Presentation do not use variables like other content types. They don’t have Density settings (large, medium, small) but instead they use EMS and content scales up/down depending on available space. This is why the Summary Screen can appear bigger/smaller in Interactive Video and Course Presentation. This is something we are unlikely to be able to fix as scaling is a big part of how these 2 content types work today.
* The Interactive Book Result Screen differs a lot, as it includes much more information
* Some content types have a button to Submit results on the Result Screen, while in others, this happens automatically when the user reaches the Result Screen.&#x20;
  * **NOTE**: This is due to how content types work. In Interactive video, for instance, the user can be presented with a Result Screen at any point in the video. It can also happen that Interactive Video has multiple Result Screens. Because of this, user needs to make an active choice when they want to submit their answers and not submit every time the Result Screen pops up.\


## Properties

### Title Line

`h5p-theme-results-banner`

| Colors                                    |                                |
| ----------------------------------------- | ------------------------------ |
| Title background                          | var(--h5p-theme-main-cta-dark) |
| Text/icons on top of the title background | var(--h5p-theme-contrast-cta)  |

| Other properties |                                                                                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paddings         | <p>var(--h5p-theme-spacing-xl) </p><p>var(--h5p-theme-spacing-xl)</p><p>calc(var(--h5p-theme-spacing-xl)*1.2)</p><p>var(--h5p-theme-spacing-xl)</p> |

### Table of Questions

`h5p-theme-results-list-container`&#x20;

| Colors     |                               |
| ---------- | ----------------------------- |
| Texts      | var(--h5p-theme-text-primary) |
| Background | var(--h5p-theme-ui-base)      |

| Other properties         |                                                                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Paddings                 | <p>var(--h5p-theme-spacing-xs)</p><p>var(--h5p-theme-spacing-m)</p>                                                                               |
| Margins                  | <p>calc(-1 * var(--h5p-theme-spacing-l))</p><p>var(--h5p-theme-spacing-xl)</p><p>var(--h5p-theme-spacing-l)</p><p>var(--h5p-theme-spacing-xl)</p> |
| Shadow                   | 10px 10px 20px 5px rgba(0, 0, 0, 0.08)                                                                                                            |
| Border between questions | solid 1px var(--h5p-theme-stroke-1)                                                                                                               |
