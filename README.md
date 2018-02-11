# iterize

Creates an iterable array from simple descriptive text

## Why?

I hate for loops. They are ugly. They require defining temporary variables with messy and confusing scope. There existence triggers a warning in JSLint, and I don't blame it at all. With wise use of array methods, there is very little need for these archaic constructs in modern JavaScript. Except sometimes, I just need to do 1,000 of something and there aren't any native ways to loop through an arbitrary amount.

## Syntax Qualities

My goal was to create a concise, intuitive, and powerful DSL for defining iterable arrays.

### Concise

All things being equal, less is better.

### Intuitive

I believe that code is primarily meant to be read by humans. The syntax should be super fast to learn and easily understood.

### Powerful

This little language should be able to create most any type of array that can be reasonably used for iteration.

### Syntax

```
>iterize(5);
>[0, 1, 2, 3, 4]
```

If an integer is passed as the only argument, an array is return of that length starting at `0`.

```
>iterize("1...5")
>[1, 2, 3, 4, 5]
```

If a formatting string is the argument, and ellipses (three periods) separates
