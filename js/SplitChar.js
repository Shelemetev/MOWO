class SplitChar {
    constructor (element) {
        this.element = element
        this.split()
    }

    split() {
        const text = this.element.textContent;
        this.element.innerHTML = "";
        this._splitIntoChars(text)
    }   

    _splitIntoChars(text) {
        const chars = text.split("");
        chars.forEach((char) => {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = char;
            this.element.appendChild(span);
        });
    }

}