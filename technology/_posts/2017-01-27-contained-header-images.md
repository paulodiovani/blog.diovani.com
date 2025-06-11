---
layout: post
title: Contained header images
image: /assets/media/2017/yuffie-eye.jpg
image_credits: diovani.com
---

I have just added header images to blog pages/posts, with a small animation to expand them to it's full size on hover.

Images are contained inside a div element by using `background-size: cover` and expanded to full height with a `max-height` transition.

Note that the same image is used as background and inside a `<img>` tag. This is necessary to know the height of the image and allow the animation on hover. The `<img>` tag, however, is set to `visibility: hidden`, as it's the centered background that we want to show.

The full SCSS  and HTML code are bellow.

```scss
#header-image {
    width: 100%;
    max-height: 145px;
    overflow: hidden;
    background-image: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    transition: max-height 1.5s ease-in-out;

    &:hover {
        max-height: 2000px;
    }

    img {
        visibility: hidden;
        width: 100%;
    }
}
```

```html
<div id="header-image" style="background-image: url({{ "{{ page.image " }}}})">
    <img src="{{ "{{ page.image " }}}}">
</div>
```

[so1]: https://stackoverflow.com/questions/14142378/css-filling-a-div-with-an-image-while-staying-in-proportion "CSS: filling a div with an image while staying in proportion"
