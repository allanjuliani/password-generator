var Password = {
    passwordSizeElement: document.getElementById("passwordSize"),
    passwordGeneratedElement: document.getElementById("passwordGenerated"),
    copyButtonElement: document.getElementById("copyButton"),

    save: function () {
        var length = this.passwordSizeElement.value;
        if (length > 0) localStorage.setItem("number", length);
    },

    generate: function () {
        this.setSafeValues();
        var length = this.passwordSizeElement.value;
        var wishlist =
            "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$[]()";
        var value = Array.from(
            crypto.getRandomValues(new Uint32Array(length))
        )
            .map((x) => wishlist[x % wishlist.length])
            .join("");

        return value;
    },

    fill: function () {
        this.passwordGeneratedElement.textContent = this.generate();
    },

    copy: function () {
        navigator.clipboard.writeText(
            document.getElementById("passwordGenerated").textContent
        );

        document.getElementById("toast").style.display = "block";

        setTimeout(() => {
            document.getElementById("toast").style.display = "none";
        }, "3000");
    },

    setSafeValues: function () {
        if (this.passwordSizeElement.value < 16) {
            this.passwordSizeElement.value = 16
        }
        if (this.passwordSizeElement.value > 500) {
            this.passwordSizeElement.value = 500
        }
    }
};

window.onload = (event) => {
    if (localStorage.getItem("number")) {
        document.getElementById("passwordSize").value =
            localStorage.getItem("number");
    }
    Password.fill();
};
