// expression evaluator

const createExpressionEvaluator = () => {
  var Parser = (function() {
    function Parser() {}
    Parser.eval = function(str) {
      return new Parser.Parser$0(str).parse();
    };
    return Parser;
  })();
  Parser.__class = "Parser";
  (function(Parser) {
    var Parser$0 = (function() {
      function Parser$0(str) {
        this.str = str;
        this.pos = -1;
        this.ch = 0;
      }
      Parser$0.prototype.nextChar = function() {
        this.ch =
          ++this.pos < this.str.length
            ? this.str.charAt(this.pos).charCodeAt(0)
            : -1;
      };
      Parser$0.prototype.eat = function(charToEat) {
        while (this.ch == " ".charCodeAt(0)) this.nextChar();
        if (this.ch === charToEat) {
          this.nextChar();
          return !0;
        }
        return !1;
      };
      Parser$0.prototype.parse = function() {
        this.nextChar();
        var x = this.parseExpression();
        if (this.pos < this.str.length)
          throw Object.defineProperty(
            new Error("Unexpected: " + String.fromCharCode(this.ch)),
            "__classes",
            {
              configurable: !0,
              value: [
                "java.lang.Throwable",
                "java.lang.Object",
                "java.lang.RuntimeException",
                "java.lang.Exception"
              ]
            }
          );
        return x;
      };
      Parser$0.prototype.parseExpression = function() {
        var x = this.parseTerm();
        for (;;) {
          if (this.eat("+".charCodeAt(0))) x += this.parseTerm();
          else if (this.eat("-".charCodeAt(0))) x -= this.parseTerm();
          else return x;
        }
      };
      Parser$0.prototype.parseTerm = function() {
        var x = this.parseFactor();
        for (;;) {
          if (this.eat("*".charCodeAt(0))) x *= this.parseFactor();
          else if (this.eat("/".charCodeAt(0))) x /= this.parseFactor();
          else return x;
        }
      };
      Parser$0.prototype.parseFactor = function() {
        if (this.eat("+".charCodeAt(0))) return this.parseFactor();
        if (this.eat("-".charCodeAt(0))) return -this.parseFactor();
        var x;
        var startPos = this.pos;
        if (this.eat("(".charCodeAt(0))) {
          x = this.parseExpression();
          this.eat(")".charCodeAt(0));
        } else if (
          (this.ch >= "0".charCodeAt(0) && this.ch <= "9".charCodeAt(0)) ||
          this.ch == ".".charCodeAt(0)
        ) {
          while (
            (this.ch >= "0".charCodeAt(0) && this.ch <= "9".charCodeAt(0)) ||
            this.ch == ".".charCodeAt(0)
          )
            this.nextChar();
          x = parseFloat(this.str.substring(startPos, this.pos));
        } else if (
          this.ch >= "a".charCodeAt(0) &&
          this.ch <= "z".charCodeAt(0)
        ) {
          while (this.ch >= "a".charCodeAt(0) && this.ch <= "z".charCodeAt(0))
            this.nextChar();
          var func = this.str.substring(startPos, this.pos);
          x = this.parseFactor();
          if (
            (function(o1, o2) {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(func, "sqrt")
          )
            x = Math.sqrt(x);
          else if (
            (function(o1, o2) {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(func, "sin")
          )
            x = Math.sin(
              (function(x) {
                return x * Math.PI / 180;
              })(x)
            );
          else if (
            (function(o1, o2) {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(func, "cos")
          )
            x = Math.cos(
              (function(x) {
                return x * Math.PI / 180;
              })(x)
            );
          else if (
            (function(o1, o2) {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })(func, "tan")
          )
            x = Math.tan(
              (function(x) {
                return x * Math.PI / 180;
              })(x)
            );
          else
            throw Object.defineProperty(
              new Error("Unknown function: " + func),
              "__classes",
              {
                configurable: !0,
                value: [
                  "java.lang.Throwable",
                  "java.lang.Object",
                  "java.lang.RuntimeException",
                  "java.lang.Exception"
                ]
              }
            );
        } else {
          throw Object.defineProperty(
            new Error("Unexpected: " + String.fromCharCode(this.ch)),
            "__classes",
            {
              configurable: !0,
              value: [
                "java.lang.Throwable",
                "java.lang.Object",
                "java.lang.RuntimeException",
                "java.lang.Exception"
              ]
            }
          );
        }
        if (this.eat("^".charCodeAt(0))) x = Math.pow(x, this.parseFactor());
        return x;
      };
      return Parser$0;
    })();
    Parser.Parser$0 = Parser$0;
  })(Parser || (Parser = {}));
  const mathParser = mathExpression => {
    try {
      const result = Parser.eval(mathExpression);
      return { hasError: !1, result };
    } catch ({ message }) {
      return { hasError: !0, message };
    }
  };

  return (variables, expression) => {
    let mathExpression = expression;

    for (let name in variables) {
      if (variables.hasOwnProperty(name)) {
        const value = variables[name];
        const matcher = new RegExp("\\b" + name + "\\b", "g");
        mathExpression = mathExpression.replace(matcher, value);
      }
    }

    const evaluation = mathParser(mathExpression);

    if (evaluation.hasError) {
      console.error("Evaluation error: ", evaluation.message);
      return;
    } else {
      return evaluation.result;
    }
  };
};
