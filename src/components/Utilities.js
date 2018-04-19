  export function splitArray(input, spacing) {
    var output = [];

    for (var i = 0; i < input.length; i += spacing) {
      output[output.length] = input.slice(i, i + spacing);
    }

    return output;
  }

  export function splitSearch(criteria) {
    let queries = criteria.split(/( or )|(%20or%20)/);
    queries = queries.filter(e => e !== undefined).filter(e => e !== " or ").filter(e => e !== "%20or%20");
    return queries;
  }
