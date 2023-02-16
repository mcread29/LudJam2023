
export default class Net {
    getQueryString(parameter: string = ''): string | object {
        var output: { [key: string]: string } = {};
        var keyValues = window.location.search.substring(1).split('&');

        for (var i in keyValues) {
            var key = keyValues[i].split('=');

            if (key.length > 1) {
                if (parameter && parameter === this.decodeURI(key[0])) {
                    return this.decodeURI(key[1]);
                }
                else {
                    output[this.decodeURI(key[0])] = this.decodeURI(key[1]);
                }
            }
        }
        return output;
    }

    decodeURI(value: string): string {
        return decodeURIComponent(value.replace(/\+/g, ' '));
    }
}