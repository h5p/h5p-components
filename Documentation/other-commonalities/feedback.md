---
description: >-
  Multiple content types include a Feedback element that indicates whether an
  answer is correct or incorrect in Check mode. This is not yet a component.
---

# Feedback

Feedback typically appears as a green or red box containing a validated answer and an icon.

Examples of use in content types:

* Fill in the Blanks
* Drag the Words
* Mark the Words
* Multiple Choice
* True/False
* Single Choice Set
* Flascards
* Multimedia Choice
* etc.

## Incorrect answer

![](<../.gitbook/assets/unknown (68).png>)

| Property      | Value                                                                                                                        |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Border        | solid 2px var(--h5p-theme-feedback-incorrect-third)                                                                          |
| Background    | var(--h5p-theme-feedback-incorrect-secondary)                                                                                |
| Text and Icon | <p>color: var(--h5p-theme-feedback-incorrect-main)</p><p>font-size: var(--h5p-theme-font-size-m)</p><p>font-weight: bold</p> |
| Border-radius | var(--h5p-theme-border-radius-medium)                                                                                        |

## Correct answer

## ![](<../.gitbook/assets/unknown (69).png>)

| Property      | Value                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Border        | solid 2px var(--h5p-theme-feedback-correct-third)                                                                          |
| Background    | var(--h5p-theme-feedback-correct-secondary)                                                                                |
| Text and Icon | <p>color: var(--h5p-theme-feedback-correct-main)</p><p>font-size: var(--h5p-theme-font-size-m)</p><p>font-weight: bold</p> |
| Border-radius | var(--h5p-theme-border-radius-medium)                                                                                      |

## Solution

Correct answer when user answered incorrectly

![](<../.gitbook/assets/unknown (70).png>)

| Property      | Value                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Border        | Dashed 2px var(--h5p-theme-feedback-correct-third)                                                                         |
| Background    | var(--h5p-theme-feedback-correct-secondary)                                                                                |
| Text and Icon | <p>color: var(--h5p-theme-feedback-correct-main)</p><p>font-size: var(--h5p-theme-font-size-m)</p><p>font-weight: bold</p> |
| Border-radius | var(--h5p-theme-border-radius-medium)                                                                                      |

## Examples

Note: Elements above can vary significantly across different content types

* The position of the feedback icon is different in Multiple Choice:\
  (This is due to feedback icons appearing on the right side in the Show Solutions mode.)\
  ![](<../.gitbook/assets/unknown (71).png>)
* True/False shows selection icons as well:\
  ![](<../.gitbook/assets/unknown (72).png>)\
  ![](<../.gitbook/assets/unknown (73).png>)
* Single Choice Set shows icon on the right side\
  ![](<../.gitbook/assets/image (41).png>)
* Flashcards have feedback appearing on the Summary Screen\
  ![](<../.gitbook/assets/unknown (74).png>)
* Flashcards also has feedback on top of the images\
  ![](<../.gitbook/assets/unknown (75).png>)\
  ![](<../.gitbook/assets/unknown (76).png>)

