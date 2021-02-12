/**
 * My simple parser

```
[ {TimePeriod} ["for" {MealName}] [PersonalPronoun] [EatingVerb] {Passed to Edamam Nutrition Analysis API} ... n ["for" {MealName}]\. ...n] 
```

`[]` denotes optional, `{}` denotes required.

Example:
```
today I had 3 fried eggs for breakfast. Yesterday for dinner I had a ribeye steak along with mashed potatoes and green beans.
```
 */


export class NlpParser {
    text: string|null;
    cleaned: string|null;
    constructor() {
        this.text = null;
        this.cleaned = null;
    }
    parse(input?: string): ParseResult {
        if (input) {
            this.setText(input);
        }
        if (this.text === null) {
            throw new Error('No text given to parse');
        }
        this.clean();
        if (!this.cleaned) return {results: []};

        // Parse "natural" language
        const words = this.cleaned.split(' ');
        
        
        return {results: []};
    
    }
    setText(t: string) {
        this.text = t;
    }
    getText(): string|null {
        return this.text;
    }
    private clean() {
        if (this.text) {

            this.cleaned = this.text.toLowerCase();
            // this.cleaned.replace(/  +/i,' '); // remove more than one space
        }
    }

}


enum NlpErrorType {
    SyntaxError = 1,
    MissingQuantifier,
    MissingTimePeriod
  }
  
  interface ParseError {
    type: NlpErrorType
    nearIndex: number
  }
  
  interface ParseResult {
    errors?: ParseError[]
    followUp?: FollowupQuestion[]
    results: any[]
  }

  interface FollowupQuestion {
      text: string
  }
  

