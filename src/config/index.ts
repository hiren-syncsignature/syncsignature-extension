export function download(filename: string, htmlContent: string, styleContent = '') {
    // Create a new DOMParser to parse the HTML content
    const doctype = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`;
    const fullHtmlContent = `${doctype}
    <html>
    <head></head>
    <body>${htmlContent}</body>
    </html>`;

    const parser = new DOMParser();
    const doc = parser.parseFromString(fullHtmlContent, 'text/html');

    // Create and append the meta tags to the head
    const metaCharset = document.createElement('meta');
    metaCharset.setAttribute('http-equiv', 'Content-Type');
    metaCharset.setAttribute('content', 'text/html; charset=UTF-8');
    doc.head.appendChild(metaCharset);

    const metaViewport = document.createElement('meta');
    metaViewport.setAttribute('name', 'viewport');
    metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    doc.head.appendChild(metaViewport);

    // Create and append the title tag
    const title = document.createElement('title');
    title.textContent = 'Email Signature';
    doc.head.appendChild(title);

    const style = document.createElement('style');
    style.textContent = styleContent;
    doc.head.appendChild(style);

    // Serialize the modified HTML content
    const modifiedHtmlContent = new XMLSerializer().serializeToString(doc);

    // Create a download link
    const element = document.createElement('a');
    element.setAttribute(
        'href',
        `data:text/html;charset=utf-8,${encodeURIComponent(modifiedHtmlContent)}`,
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

export const getSignatureHTML = (_signatureName: string, signatureContent: string): string => {
    // You might have more complex HTML generation here, potentially with placeholders.
    // For simplicity, we're just returning the raw HTML content.
    return signatureContent;
};


