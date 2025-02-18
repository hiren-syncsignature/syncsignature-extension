
console.log("Content script loaded on Gmail");

const processedComposeElements = new WeakSet<HTMLElement>();

function insertSignature(composeElement: HTMLElement, signature: string) {
    if (processedComposeElements.has(composeElement)) {
        console.log("Signature already inserted into this specific element. Skipping.");
        return;
    }

    let currentElement: HTMLElement | null = composeElement;
    let topComposeElement: HTMLElement | null = null;

    while (currentElement) {
        if (isComposeElement(currentElement)) {
            topComposeElement = currentElement;
        }
        currentElement = currentElement.parentElement;
    }


    if (composeElement !== topComposeElement) {
        console.log("Skipping nested compose element (not topmost).");
        return;
    }

    if (!composeElement.innerHTML.includes(signature)) {
        console.log("Inserting signature into compose window");
        composeElement.innerHTML += `<br/><br/>${signature}`;
        processedComposeElements.add(composeElement);
    } else {
        console.log("Signature already present in innerHTML.  Skipping.");
    }
}

function isComposeElement(node: HTMLElement): boolean {
    return node.matches('div[aria-label="Message Body"]');
}

function tryInsertSignature(composeElement: HTMLElement) {
    chrome.storage.sync.get("selectedSignature", (data) => {
        if (data.selectedSignature && data.selectedSignature.content) {
            console.log("Found saved signature:", data.selectedSignature);
            insertSignature(composeElement, data.selectedSignature.content);
        } else {
            console.log("No signature found in storage or invalid format.");
        }
    });
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const element = node as HTMLElement;

                if (isComposeElement(element)) {
                    console.log("Compose element detected directly:", element);
                    tryInsertSignature(element);
                } else {
                    const composeField = element.querySelector('div[aria-label="Message Body"]');
                    if (composeField) {
                        console.log("Compose field found in subtree:", composeField);
                        tryInsertSignature(composeField as HTMLElement);
                    }
                }
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });

setTimeout(() => {
    const composeFields = document.querySelectorAll('div[aria-label="Message Body"]');
    if (composeFields.length > 0) {
        console.log(`Found ${composeFields.length} pre-existing compose fields.`);
        composeFields.forEach((composeField) => {
            tryInsertSignature(composeField as HTMLElement);
        });
    } else {
        console.log("No pre-existing compose fields found.");
    }
}, 500);