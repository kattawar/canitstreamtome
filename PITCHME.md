## Search, Sort, Filter
## like a Pro
Quang Duong

---

## Grading
We are working on it and aim to finish this week.

---

## PSA

Do not store login information in your Github repositories. That is bad.

Deleting the files does not delete the commit history.

---

# Back-End
Pay attention you aspiring back-end devs!

---

## Flask-Restless
All of this is more or less built-in

+++

## The Format
```
/model?q={"filters":[...],"order_by":[...],
          "limit":int,"offset":int,
          "group_by":[...],"single":bool}
```

+++

## Filters
```
{"name":"field name", "op":"operation", "val":"value"}
```
You can have a bunch of things chained together :D

+++

## Operations
- ==, eq, equals, equals\_to
- \!=, neq, does\_not\_equal, not\_equal\_to
- \>, gt, <, lt
- \>=, ge, gte, geq, \<=, le, lte, leq
- in, not\_in
- is\_null, is\_not\_null
- like (your new BFF for searching)
- has
- any

(Copy-Pasta'd from API docs)

+++

## Ordering
```
{"field":"field name", "direction":"asc or desc"}
```
These can be chained as well!

+++

## So, how do I filter?
```
/person?q={"filters":[{"name":"age","op":"ge","val":"21"}]}
/person?q={"filters":[{"name":"age","op":"ge","val":"21"},
                      {"name":"age","op":"le","val":"40"}]}
```

+++

## What about sorting?
```
/person?q={"filters":[...],
           "order_by":[{"field":"age","direction":"asc"},
                       {"field":"name","direction":"desc"}]}
```
 
+++

## Is Searching Hard?
Yes and No
```
/person?q={"filters":["name":"name","op":"like","val":"%Doe%"]}
```

+++

## What goes in val?

A ~ Exact Text Match

A% ~ Starts with 'A'

%A ~ Ends with 'A'

%A% ~ Contains 'A'

+++

## That's Super Easy!

Yeah. It is. However, it also scales poorly.

Those of you with larger databases will need to watch for this accordingly.

It doesn't return the index. Your poor front-end devs will need to hunt down
what to highlight.

+++

## REST APIs

This format differs greatly from standard REST APIs

What can you do?
- Use a preprocessor or custom queries for every model that preprocesses
  standard REST API styles and swaps it over to this format

---

## Roll your Own

Presumably not everyone used flask-restless (not necessarily a bad thing)

There are two options to handle all of these operations

+++

## Server-Side

SQL Queries + Pre/Post-Processing 

(ORDER BY, WHERE, LIKE/CHARINDEX)

+++

## Pros of Server-Side

- Less information to send to user (lower bandwidth)
- Built into API

+++

## Cons of Server-Side

- Higher CPU Usage
- Latency issues

+++

## Client-Side

Send everything and process it with JS

+++

## Pros of Client-Side

- Less CPU Usage
- Not really an issue with smaller datasets
- API no longer needs to have it built-in (good for you)

+++

## Cons of Client-Side

- More bandwidth usage
- Higher user CPU usage
- Inconsistent number of results
- API no longer needs to have it built-in (bad for user)

---

## General Considerations

- Full Text Search (SQL engine dependent)
- Check out how fast your SQL queries are
  - Redesign database, preprocess, reformulate queries to increase speed

---

# Front-End

Pay attention you aspiring front-end devs!

---

## Libraries

- react-select (async and everything :D)
- react-virtualized-select (for larger datasets)
- mark.js, highlight, jquery.highlight, ... (the list goes on)
- Roll your own

+++

## Filtering

- Filter by more than one attribute at once
- Relative filtering (\>, \<, etc)
- Enable/Disable filters easily
- Filter by all available (and reasonable) attributes
- OR vs AND when it comes to filtering
- ANY of a list of possible values

+++

## Sorting

- Ascending/Descending/Random
- Sort over any attributes
- Defining an order with multiple (or all) attributes
- Consider what's the best 'default' sort

+++

## Searching

- Highlight the search results with the query
- Show the instance name + relevant search text 
- Make sure the search term shows up in the text or the name
- Show multimedia (images in particular as a thumbnail)
- Show model type (if not self-evident)
- Link to the instance page
- What order to show results?

---

## General Considerations

- No results page/indicator for searching + sorting
- Balance between many options and minimally cluttered UI
- Consider mobile/other devices and resolutions
- Loading animation to distract user
- Be able to filter/sort in conjunction
- Filtering/Sorting search results

---

## Any Questions?

Ask away!

(Also, come to office hours. It's lonely T.T)
