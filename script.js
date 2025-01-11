const Password = {
    passwordSizeElement: document.getElementById("passwordSize"),
    passwordGeneratedElement: document.getElementById("passwordGenerated"),
    copyButtonElement: document.getElementById("copyButton"),
    toastElement: document.getElementById("toast"),

    save() {
        const length = this.passwordSizeElement.value;
        if (length > 0) {
            localStorage.setItem("number", length);
        }
    },

    generate() {
        this.setSafeValues();
        const length = this.passwordSizeElement.value;
        const wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$[]()";
        const randomValues = Array.from(crypto.getRandomValues(new Uint32Array(length)))
            .map(x => wishlist[x % wishlist.length])
            .join("");
        return randomValues;
    },

    fill() {
        this.passwordGeneratedElement.textContent = this.generate();
    },

    async copy() {
        const password = this.passwordGeneratedElement.textContent;
        await navigator.clipboard.writeText(password);

        this.toastElement.style.display = "block";

        setTimeout(() => {
            this.toastElement.style.display = "none";
        }, 3000);
    },

    setSafeValues() {
        let length = parseInt(this.passwordSizeElement.value, 10);
        if (length < 16) {
            this.passwordSizeElement.value = 16;
        } else if (length > 500) {
            this.passwordSizeElement.value = 500;
        }
    }
};

window.onload = () => {
    const savedLength = localStorage.getItem("number");
    if (savedLength) {
        Password.passwordSizeElement.value = savedLength;
    }
    Password.fill();
};
