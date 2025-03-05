console.log("Content script loaded on Gmail");

const processedComposeElements = new WeakSet<HTMLElement>();

/**
 * Inserts the signature into the top-level compose element if it hasn’t been added already.
 */
function insertSignature(composeElement: HTMLElement, signature: string): void {
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

    if (processedComposeElements.has(composeElement)) {
        console.log("Compose element already processed. Skipping insertion.");
        return;
    }

    if (composeElement.querySelector('.SyncSignature')) {
        console.log("Signature container already exists. Skipping insertion.");
        processedComposeElements.add(composeElement);
        return;
    }

    if (composeElement.getAttribute("data-signature-inserted") === "true") {
        console.log("Data attribute indicates signature already inserted. Skipping.");
        processedComposeElements.add(composeElement);
        return;
    }

    console.log("Inserting signature into compose window");
    composeElement.innerHTML = "";
    composeElement.insertAdjacentHTML(
        'beforeend',
        `<div class="SyncSignature" style="margin-top: 10px;">${signature}</div>`
    );

    composeElement.setAttribute("data-signature-inserted", "true");
    processedComposeElements.add(composeElement);
}

/**
 * Checks if the given node is the Gmail compose field.
 */
function isComposeElement(node: Node): node is HTMLElement {
    return node instanceof HTMLElement && node.matches('div[aria-label="Message Body"]');
}

/**
 * Retrieves the saved signature from chrome storage and attempts to insert it
 * into the provided compose element.
 */
function tryInsertSignature(composeElement: HTMLElement): void {
    chrome.storage.sync.get("selectedSignature", (data: { selectedSignature?: { content: string } }) => {
        if (chrome.runtime.lastError) {
            console.error("Error retrieving signature from storage:", chrome.runtime.lastError);
            return;
        }
        if (data.selectedSignature && data.selectedSignature.content) {
            console.log("Found saved signature:", data.selectedSignature);
            insertSignature(composeElement, data.selectedSignature.content);
        } else {
            console.log("No valid signature found in storage.");
        }
    });
}

/**
 * Create a MutationObserver to detect newly added compose fields in Gmail.
 */
const observer = new MutationObserver((mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node: Node) => {
            if (node instanceof HTMLElement) { // Narrow the type
                // Directly check if this element is a compose field.
                if (isComposeElement(node)) {
                    console.log("Compose element detected directly:", node);
                    tryInsertSignature(node);
                } else {
                    // Check if a compose field exists within this subtree.
                    const composeField = (node as HTMLElement).querySelector('div[aria-label="Message Body"]') as HTMLElement | null;
                    if (composeField) {
                        console.log("Compose field found in subtree:", composeField);
                        tryInsertSignature(composeField);
                    }
                }
            }
        });
    });
});

/**
 * Observe the entire document for changes.
 */
observer.observe(document.body, { childList: true, subtree: true });


/**
 * Process any compose fields that already exist when the script loads.
 */
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
