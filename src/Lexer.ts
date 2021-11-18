import * as v8 from 'v8';

import {
    AbstractToken,
    Location,
    Matcher,
} from './types';

import {
    MatcherRegExpError,
    NoTokensFoundError,
} from './errors';


export default class Lexer {
    private nextTokenLocation: Location;

    constructor(
        private readonly matchers: Matcher[],
    ) {
        this.nextTokenLocation = {
            global: {position: 0},
            withinChunk: {position: 0},
        };
    }

    splitChunkToTokens(input: string): AbstractToken[] {
        const nextTokenLocation = clone(this.nextTokenLocation);
        const tokens: AbstractToken[] = [];
        let restOfInput = input;

        while(restOfInput.length) {
            const token = this.findFirstToken(restOfInput, clone(nextTokenLocation));
            const matchedLength = token.matchedText.length;

            tokens.push(token);
            restOfInput = restOfInput.substring(matchedLength);
            nextTokenLocation.global.position += matchedLength;
            nextTokenLocation.withinChunk.position += matchedLength;
        }

        nextTokenLocation.withinChunk.position = 0;
        this.nextTokenLocation = nextTokenLocation;
        return tokens;
    }

    private findFirstToken(input: string, location: Location): AbstractToken {
        for (const matcher of this.matchers) {
            const matched = input.match(matcher.regexp);
            if (matched) {
                if (matched.index !== 0) throw new MatcherRegExpError(input, matcher.regexp);
                return matcher.extract(matched, location);
            }
        }

        throw new NoTokensFoundError();
    }
}

const clone = <T>(o: T): T => v8.deserialize(v8.serialize(o));
