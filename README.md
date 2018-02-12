# iterize

Create an array from simple descriptive text

```
> iterize(5);
> [0, 1, 2, 3, 4]
>
> iterize("1...5")
> [1, 2, 3, 4, 5]
>
> iterize("10, 9...4")
> [10, 9, 8, 7, 6, 5, 4]
>
> iterize("A...C");
> ["A", "B", "C"]
```

## Why?

I hate *for* loops. They are ugly. They require defining temporary variables with messy and confusing scope. Their existence triggers a warning in JSLint, and I don't blame it at all. With wise use of array methods, there is very little need for these archaic constructs in modern JavaScript. Except sometimes I just need to do 1,000 of something and there aren't any native ways to loop through an arbitrary amount.

## Syntax Qualities

My goal was to create a concise, intuitive, and powerful DSL for defining iterable arrays.

### Concise

All things being equal, less is better.

### Intuitive

I believe that code is primarily meant to be read by humans. The syntax should be super fast to learn and easily understood.

### Powerful

This little language should be able to create most any type of array that could reasonably be useful for iteration.

### Examples

If an integer is passed as the only argument, an array is returned of that length starting at `0`. This should work just like Python's *range* function.

```
> iterize(5);
> [0, 1, 2, 3, 4]
```

If a formatting string is the argument, an ellipses (three periods) separates the starting and stopping points.

```
> iterize("1...5")
> [1, 2, 3, 4, 5]
```

If you want to increment by a value other than one, demonstrate with the first interval, then add the ending value after ellipses like in the previous example.

```
> iterize("1, 3...11")
> [1, 3, 5, 7, 9, 11]
>
> iterize("10, 9...4")
> [10, 9, 8, 7, 6, 5, 4]
>
> iterize("-11, -3...13")
> [-11, -3, 5, 13]
```

Single characters can also be used. It will increment them based on their numeric code value.

```
> iterize("A...C");
> ["A", "B", "C"]
>
> interize("α...λ");
> ["α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ", "λ"]
>
> iterize("z, y...q")
> ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q"]
```

White space is removed from iteration definition strings so you can format them how you prefer.
