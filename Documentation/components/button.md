---
description: >-
  The Button component ensures consistent looks, functionality and accessibility
  across the different content types
---

# Button

The button component has three variants: Primary, Secondary and Navigation

## Common for all buttons

* When there is available space to show the label, the label and icon are shown
* For limited space, we show only the icon, while the label is hidden
* Due to technical restrictions, tooltips are enabled regardeless of if the button is in full or icon-only mode. This is to make it easier for users to understand the buttons when in icon-only. A drawback is that the tooltip text might be the same as the label, and thus redundant
* Proper icon usage for each scenario is described in the Icons section

## Primary

Primary buttons have a filled in background, contrasting text, and an icon that only appears on hover.

### **Usage**

* Used as the primary action for each individual question
  * Buttons like Check, Submit, Show Results
* Used on start pages as the main point of entry (“Interactive Book” start page, “Question Set” start page, etc)
* Used in confirmation dialogs as the primary call-to-action button (Check button for validating answers)

### States

<table><thead><tr><th width="101">State</th><th width="155">Appearance</th><th>Icon-only</th><th>Colors</th></tr></thead><tbody><tr><td>Normal</td><td><img src="../.gitbook/assets/unknown (4).png" alt=""></td><td><img src="../.gitbook/assets/unknown (9).png" alt=""></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-main-cta-base)</p><p><strong>Border color:</strong><br>var(--h5p-theme-main-cta-base)</p><p><strong>Label/icon color:</strong> </p><p>var(--h5p-theme-contrast-cta)</p></td></tr><tr><td>Hover</td><td><img src="../.gitbook/assets/unknown (5).png" alt=""></td><td><img src="../.gitbook/assets/unknown (10).png" alt=""></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-main-cta-light)</p><p><strong>Border color:</strong><br>var(--h5p-theme-main-cta-light)</p><p><strong>Label/icon color:</strong> </p><p>var(--h5p-theme-contrast-cta)</p></td></tr><tr><td>Active (Pressed)</td><td><img src="../.gitbook/assets/unknown (6).png" alt=""></td><td><img src="../.gitbook/assets/unknown (11).png" alt=""></td><td><p><strong>Background color:</strong><br>var(--h5p-theme-main-cta-dark)</p><p><strong>Border color:</strong><br>var(--h5p-theme-main-cta-dark)</p><p><strong>Label/icon color:</strong> </p><p>var(--h5p-theme-contrast-cta)</p></td></tr><tr><td>Focus</td><td><div><figure><img src="../.gitbook/assets/bilde (2).png" alt=""><figcaption></figcaption></figure></div></td><td><div><figure><img src="../.gitbook/assets/bilde (4).png" alt=""><figcaption></figcaption></figure></div></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-main-cta-base)</p><p><strong>Border color:</strong><br>var(--h5p-theme-main-cta-base)</p><p><strong>Focus outline:</strong><br>var(--h5p-theme-contrast-cta-white)</p><p><strong>Label/icon color:</strong> </p><p>var(--h5p-theme-contrast-cta)</p></td></tr><tr><td>Disabled</td><td><img src="../.gitbook/assets/unknown (8).png" alt=""></td><td><img src="../.gitbook/assets/unknown (12).png" alt=""></td><td><strong>Opacity:</strong> 0.4 (applied on normal state)</td></tr></tbody></table>

### Behaviour

* When there is available space to show the label, the hover state is animated, revealing the icon. The icon is visible only for the hover state.
* For limited space, the button is truncated. In this mode, there is no hover animation, the icon is always visible, and the label is hidden.
* The main CTA is often combined with the secondary CTA. When this occurs, we should evaluate each scenario individually to determine the optimal button placement.
  * **Example 1**: “Interactive Book” Summary page. Submit report should be before Restart, as it is the action we want to encourage users to take after completing the book; restarting is a secondary action. \
    &#x20;![](<../.gitbook/assets/unknown (13).png>)
  * **Example 2:** Popups inside “Interactive Video”: Here, secondary buttons come first because they are related to the question you just answered. Logically, you would want to decide whether to retry the question or view the solutions before moving on to the next question.\
    ![](<../.gitbook/assets/unknown (14).png>)
  * **Example 3:** Popups. The main action is typically shown on the right side of a pop-up.\
    ![](<../.gitbook/assets/unknown (15).png>)

### Other Properties

* **padding**: var(--h5p-theme-spacing-xs) var(--h5p-theme-spacing-l)
* **font-size:** var(--h5p-theme-font-size-m)
* **font-weight:** 600
* **border-radius:** var(--h5p-theme-border-radius-medium)
* **border:** solid 3px

## Secondary

Secondary buttons have a light background, a colored border and is always showing the icon. Their colors invert color when hovered or clicked.

### **Usage**

* Used for secondary CTAs, such as Show Solutions or Retry buttons on individual questions in Check mode
* Used for secondary actions in the “Interactive Book” left menu (e.g., the Show Solutions page)
* Used for secondary actions in the “Audio Recorder” (e.g., actions shown while recording is in progress)
* A modified version of these buttons—with green or red colors instead of the standard "main-cta" style can also be used. Currently, this variation appears in “Dialog Cards” for the I got it right and I got it wrong buttons.

### States

<table><thead><tr><th width="101">State</th><th width="261">Appearance</th><th width="105">Icon-only</th><th>Colors</th></tr></thead><tbody><tr><td>Normal</td><td><img src="../.gitbook/assets/unknown (28).png" alt=""></td><td><img src="../.gitbook/assets/unknown (29).png" alt=""></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-ui-base)</p><p><strong>Border color:</strong> var(--h5p-theme-contrast-cta-white)</p><p><strong>Label/icon color:</strong><br>var(--h5p-theme-contrast-cta-white)</p></td></tr><tr><td>Hover</td><td><img src="../.gitbook/assets/unknown (30).png" alt=""></td><td><img src="../.gitbook/assets/unknown (31).png" alt=""></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-contrast-cta-white)</p><p><strong>Border color:</strong> </p><p>var(--h5p-theme-contrast-cta-white)</p><p><strong>Label/icon color:</strong></p><p>--h5p-theme-secondary-contrast-cta-hover OR</p><p>var(--h5p-theme-ui-base)</p></td></tr><tr><td>Active (Pressed)</td><td><div><figure><img src="../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure></div></td><td><div><figure><img src="../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure></div></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-contrast-cta-white)</p><p><strong>Border color:</strong> </p><p>var(--h5p-theme-contrast-cta-white)</p><p><strong>Label/icon color:</strong> </p><p>var(--h5p-theme-ui-base)</p></td></tr><tr><td>Focus</td><td><div><figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure></div></td><td><div><figure><img src="../.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure></div></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-contrast-cta-white)</p><p><strong>Border color:</strong> </p><p>var(--h5p-theme-contrast-cta-white)</p><p><strong>Focus outline:</strong> var(--h5p-theme-contrast-cta-white)</p><p><strong>Label/icon color:</strong> </p><p>var(--h5p-theme-ui-base)</p></td></tr><tr><td>Disabled</td><td><img src="../.gitbook/assets/unknown (32).png" alt=""></td><td><img src="../.gitbook/assets/unknown (33).png" alt=""></td><td><strong>Opacity:</strong> 0.4 (applied on normal state)</td></tr></tbody></table>

### Other Properties

* **padding:** var(--h5p-theme-spacing-xs) var(--h5p-theme-spacing-s)
* **font-size:** var(--h5p-theme-font-size-m)
* **font-weight:** 600
* **border-radius:** var(--h5p-theme-border-radius-medium)
* **border:** solid 3px

## Navigation

Navigation buttons use the navigation colors (confusingly called secondary cta), and no border.

### Usage <a href="#docs-internal-guid-6131329b-7fff-e752-fdc6-514c5fc94241" id="docs-internal-guid-6131329b-7fff-e752-fdc6-514c5fc94241"></a>

Used for navigation ( Prev/Next buttons ). These buttons appear in multiple content types, and they are used to switch between pages, slides, cards, questions, etc.

### States

<table><thead><tr><th width="101">State</th><th width="261">Appearance</th><th width="105">Icon-only</th><th>Colors</th></tr></thead><tbody><tr><td>Normal</td><td><img src="../.gitbook/assets/unknown (34).png" alt=""></td><td><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFsAAABRCAYAAAC9rdr/AAADA0lEQVR4Xu3cP2hTURQG8O81vjQxpqVYKopWXDs5u7mJ4CIUFHF1kjgIOgi6qSDq6OAg/kE7161DJycdxclNRKWtxBrjS5OmMddSxZr0Xl+u5917+701p++8/u7peS9p7ok63QM8RAQiYos4/0xCbDlrYgtaE5vYkgKCudiziS0oIJiKlU1sQQHBVKxsYgsKCKZiZfuIrT7P+t5oIWm20WytYm0t/M+3hoYi5OMdKOZz2FmIEUXRlktnpbLrSRPL9ZVtAdxPU8GPloZRKub7gg+MXa0lqCctwT9Gt1OVijHGysWeFzkQNqF7L3w/8NTYqnVUaw23yyzDqxsrF/5qKamw1c3w4+dv27pH69ZR9fC9u3f9cdNMhc2q1lGvv765ulNhLy0naKzwpqgjLwzHGB/9fbNMhf1hqcYWopPuvq5ayb7x8q/IVNjvF74apGKIEtg/MUJsqVIgtpQ0K1tQmtjElhUQzMaeTWxBAcFUrGximwksPjyGk/c6OHjlPp6cmDT7oQyjPK7sBcxXDuPayz1dvgkvwD3GBnK1edyYruD5l9gLcK+xVUfwCdx7bJ/Ag8D2BTwYbB/Ag8J2HTw4bJfBg8TuBX7g6iM8Pa6eybM7gsVWpO0XlzF9cQ6L3a/dfZq6hLkHp3Eow68dBovdfH0blXOP8aYToZObwqlnMzg/2c6urEP954GL0GqVg6tsV6GDw3YZOihs16GDwfYBOghsX6C9x/YJ2nPsd5g9exS33o448xyte4j3+tFv9dV1XLhbxZGbd3Am4zcsOmjPK9vk13MrxuvKdotSfzXE1htZiyC2NUr9iYitN7IWQWxrlPoTEVtvZC2C2NYo9Scitt7IWsTA2NwHabYWVvZBcoevGbaVHb7cu26GbWXvOqcy6LGtTWVQqVjdW4NbmzeykYaTdHqDW5+kQ/B/g1bRqaYybE7D6Wfr4y7++/SzDXjO9ROa66e/NzPCWhshpZmAlZ5tlopRxBasAWITW1BAMBUrm9iCAoKpWNnEFhQQTMXKFsT+AYjx7iwefsD8AAAAAElFTkSuQmCC" alt=""></td><td><p><strong>Background color:</strong><br>var(--h5p-theme-secondary-cta-base)</p><p><strong>Label/icon color:</strong> </p><p>var(--h5p-theme-secondary-contrast-cta)</p></td></tr><tr><td>Hover</td><td><img src="../.gitbook/assets/unknown (35).png" alt=""></td><td><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABLCAYAAACGGCK3AAADBElEQVR4Xu3cMWgUQRQG4Le3d2diZZdKCcYyfUrRQksFOwvBIyB2Quy0CFiYTiysLCzsDIIoQsDGShsLbe0sUlylIGhyt3txJiGNnPfm1p23b/b9A9eE2Z3h/3Z3drjcyw5cIzQ1CWQAUWNxOBGA6PIAiDIPgABEWwLK5oM1BCDKElA2nWh3iN/elJOjz6SckIXNTuZwO3mH8k52+Mky/5f5WhSQopjQ2CMY3nN6jJ7D6XY7c4nUDjIal1Q4DLSjBLoOpd/Lg+OoFQQY03OfB6U2EP+YGhVl8JVgrWO/mwc9vmoB8WvF3qg0vWZwF5hfUxb6ObvQ1wLi1wz/uEKbnYBfS/zja1arBWTfYZRYyNnrMXcYJ5gFvhaQ33tjE/sMNnGmg9+VLC704t8hvxwIWlgCJwESFpRUL4BIJR04DkACg5LqBhCppAPHAUhgUFLdACKVdOA4AAkMSqobQKSSDhyn9SDDp+fp4iOilQfP6fW1M4GxNNet5SBD2lk/SxsfTruEl5JAaTmI+w775zu6f/kWvfzRTwKl9SD+4ZMSigmQlFDMgKSCYgokBRRzINpRTIJoRjELMg1l+eELentlqbldoRvZNIhPvnh/hy7d3qGh+0J7d/Uefdq+Qeca/BdX0yD7n7fo5vVn9IUyOshXafDmFd1dLnCHNJGARgyfg8k7RCuGSRDNGOZAtGOYAkkBwwxIKhgmQFLCMADyjbavrtHm11Nq9hncK37rX3vHHzdpsPWdLjx+QoOGN30choE7JCQCXX1af4foipufDUD4jER7AEQ0bn4wgPAZifYAiGjc/GAA4TMS7QEQ0bj5wQDCZyTaQwQEv1MPMxX7nToqOYSBiFVyQK2TMBCxWieoBsSDiFYD8tNBvazZKKL1so6ngopy01EaqSgHlP/H8GeopTzT31NBVVIXrJaqpMc4qNurqG4v/86BHv9KIMojC3FXTwAg1bOLciRAosRa/aQAqZ5dlCMBEiXW6icFSPXsohwJkCixVj8pQKpnF+VIgESJtfpJ/wAJ/cY+cRsVAgAAAABJRU5ErkJggg==" alt=""></td><td><p><strong>Background color:</strong></p><p>var(--h5p-theme-secondary-cta-light)</p><p><strong>Label/icon color:</strong><br>var(--h5p-theme-secondary-contrast-cta)</p></td></tr><tr><td>Active (Pressed)</td><td><img src="../.gitbook/assets/unknown (36).png" alt=""></td><td><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAABMCAYAAAAY2Ss0AAADBElEQVR4Xu3cv2tTURQH8PNaSxrbpMQkorZWQbAIrk7Ogo7q4KjQwVGkIIqKq4KLosFBBRfFP6HgJA4u4iKigqLiL8xrQ5LWNLRpzbVkqKY5915z6Dt536w59/DuJ6f3vbQ9J1hpvggvEYEAuCKuf5ICV84WuIK2wAWupIBgbpy5wBUUEEyNygWuoIBgalQucAUFBFOjcqOGa37XU6rWae5XnWoLi7TYWBa8xGikHujvo+TgAA1vTlAmlaAgCNgLc67cmXKNwtJ8LEDX0zPQucwQZUeSHYGdcL8Wq1Sq1NhPLC4BmXSSRvOpdbdrjQvY9oadgK1wzVHwPazGpSCd97k9l2p7RLC45ub17tNMrM9YTtucwXt3Zf+5ybG4s5UF+lascPlj//6OfJq2pAfXOLC4n3+UqTJfjz0eB5AeStD4thE33LcfQxwJnGzzfXM0TOzOueG+ev/TIjVCjMD+PVuBK1UKwJWSReUKygIXuLICgtlx5gJXUEAwNSoXuKsCs4+O0cn7S7RzqkCFw2OCLN1Jrahyi/Ts/EG69iLb3HleBbAiXKL+uad049QUTZc3qQBWhWt+WDUBq8PVBKwSVwuwWlwNwKpxow6sHjfKwD2B2w549NxdunNo7V8CuvPVwD5Lz+CaLS8/v0yTl55Q2Py3rXDiLD2+fYLGN7BnsWdwl17fpAtnHtIbCmilbx8dvfeAJsca9mUmENkTuFGENZ+VetyowqrHjTKsatyow6rF1QCrElcLrDpcTbDKcL/Q9OkjdOvDcGSeY7lHY1WPYo2X1+lioUQHrlyl4xv8BYGDVVa5NtuJVoyqyo0WHX81wOWNvCOA603HLwQub+QdAVxvOn4hcHkj7wjgetPxC4HLG3lHOOOiD83O2qsPDR2UdrheHZTo/bXD9er9Rdc6j+vdtW5SY95CZ2DveQuttJgU0h74vyeFANgd1qxg5y38nRbTmVbb/7s+nakFjbliQnPF+HsnIloCzscC6OwFgGtv5RwJXGcy+wXAtbdyjgSuM5n9gt/dWtM7jQYY9QAAAABJRU5ErkJggg==" alt=""></td><td><p><strong>Background color:</strong><br>var(--h5p-theme-secondary-cta-dark)</p><p><strong>Label/icon color:</strong><br>var(--h5p-theme-secondary-contrast-cta)</p></td></tr><tr><td>Focus</td><td><div><figure><img src="../.gitbook/assets/image (40).png" alt=""><figcaption></figcaption></figure></div></td><td><img src="../.gitbook/assets/image (39).png" alt=""></td><td><p><strong>Background color:</strong><br>var(--h5p-theme-secondary-cta-base)</p><p><strong>Focus outline:</strong><br>var(--h5p-theme-contrast-cta-white)</p><p><strong>Label/icon color:</strong><br>var(--h5p-theme-secondary-contrast-cta)</p></td></tr><tr><td>Disabled</td><td><div><figure><img src="../.gitbook/assets/image (37).png" alt=""><figcaption></figcaption></figure></div></td><td><div><figure><img src="../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure></div></td><td><strong>Opacity:</strong> 0.4 (applied on normal state)</td></tr></tbody></table>

### Other Properties

* **font-size:** var(--h5p-theme-font-size-s);
* **font-weight:** bold;
* **padding:** var(--h5p-theme-spacing-xs) var(--h5p-theme-spacing-s);
* **border-radius:** var(--h5p-theme-border-radius-medium);
