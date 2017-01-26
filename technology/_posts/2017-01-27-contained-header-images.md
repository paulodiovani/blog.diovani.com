---
layout: post
title: Contained header images
image: /media/2017/yuffie-eye.jpg
image_credits: diovani.com
---

I have just added header images to blog pages/posts, with a small animation to expand them to it's full size on hover.

Images are contained inside a div element but filling it's width and height. The original style I got from [this StackOverflow question][so1] and added the hover style for showing the entire image.

The full SCSS code is bellow.

```scss
#header-image {
    width: 100%;
    max-height: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transition: max-height 1.5s ease-in-out;

    @include media-query($on-palm) {
        max-height: 108px;
    }

    &:hover {
        max-height: 2000px;
    }

    img {
        flex-shrink: 0;
        min-width: 100%;
        min-height: 100%
    }
}
```

[so1]: http://stackoverflow.com/questions/14142378/css-filling-a-div-with-an-image-while-staying-in-proportion "CSS: filling a div with an image while staying in proportion"
