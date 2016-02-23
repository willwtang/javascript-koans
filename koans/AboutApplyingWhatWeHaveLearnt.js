var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = products.filter(function(element) {
        if (element.containsNuts) return false;
        
        return _(element.ingredients).all(function(food) { return food !== "mushrooms"});
      });
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var num = _.range(1,1000);
    /*var sum = _.reduce(num, function(previous, current) {
                if (current % 3 === 0 || current % 5 === 0) {
                  return previous + current;
                } else {
                  return previous;
                }
              }, 0); */
    var sum = _(_.range(1,1000)).chain()
              .reduce(function(previous, current) {
                if (current % 3 === 0 || current % 5 === 0) 
                  return previous + current;
                else
                  return previous;
              }, 0)
              .value();  /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    var answer = _(products).chain()
      .map(function(element) { return element.ingredients })
      .flatten()
      .reduce(function(previous, current) {
        previous[current] = (previous[current] || 0) + 1;
        return previous;
      }, ingredientCount)
      .value();
    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(answer['mushrooms']);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR ADVANCED */
  it("should find the largest prime factor of a composite number", function () {
    function largestPrimeFactor(n) {
      var factors = [];
      var d = 2;
      
      while (n > 1) {
        while (n % d === 0) {
          factors.push(d);
          n /= d;
        }
        d++;
      }
      return Math.max.apply(this, factors);
    }
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    function largestPalindrome(a, b) {
      
      function isPalindrome(num) {
        num = num.toString();
        var len = num.length;
        for(var i = 0; i < Math.floor(len / 2); i++) {
          if (num.charAt(i) !== num.charAt(len - 1 - i))
            return false;
        }
        return true;
      }
      
      var max = 0;

      for (var x = 999; x > 99; x--) {
        for (var y = 999; y > 99; y--) {
          var product = x * y;
          if (isPalindrome(product) && product > max)
            max = product; 
        }
      }

      return max;
    }
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    function leastCommonMultiple() {
      function primeFactorization(n) {
        var factors = {};
        var d = 2;
        
        while (n > 1) {
          while (n % d === 0) {
            factors[d] = (factors[d] || 0) + 1;
            n /= d;
          }
          d++;
        }
        return factors;
      }

      var primeFactors = {};
      for (var i = 2; i <= 20; i++) {
        primeFactors[i] = primeFactorization(i);
      }

      var primes = [2, 3, 5, 7, 11, 13, 17, 19];
      var primeMax = {};
      primes.forEach(function(prime) {
        primeMax[prime] = 0;
        for (var x in primeFactors) {
          if (primeFactors[x][prime] > primeMax[prime])
            primeMax[prime] = primeFactors[x][prime];
        }
      });

      var answer = 1;
      for (var y in primeMax) {
        answer *= Math.pow(y, primeMax[y]);
      }
      return answer;
    }
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    function diff(a, b){
      var range = _.range(a, b + 1);
      var sum = 0;

      var sumOfSquares = range.reduce(function(memo, x) {
        sum += x;
        return memo + (x * x);
      });

      return sumOfSquares - (sum * sum);
    }
  });

  it("should find the 10001st prime", function () {
    function find10001st(n) {
      var array = [];
      var primes = 0;
      var primeLessThan = Math.floor(n * Math.log(n) + n * Math.log(Math.log(n)));

      for (var i = 2; i < primeLessThan; i++) {
        var j = i;
        if (array[i] !== "x") {
          while (j < primeLessThan) {
            j += i;
            array[j] = "x";
          }
          primes += 1;
          if (primes === n)
            return i;
        }
      }
    }
  });
  
});
