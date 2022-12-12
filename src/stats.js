(() => {
    const BASE_URL = "https://mjvnleodkirkszvexzql.functions.supabase.co/c";
    const title = encodeURIComponent(document.title);

    const elem = document.createElement("img");
    elem.src = `${BASE_URL}?u=${document.URL}&ti=${title}&t=v`;
    document.body.insertAdjacentElement('beforeend', elem);

    for (const elem of document.getElementsByTagName("a")) {
        const originalUrl = elem.href;
        const targetUrl = encodeURIComponent(originalUrl);
        const newUrl = `${BASE_URL}?u=${targetUrl}&ti=${title}&t=c`;
        elem.href = newUrl;
        elem.status = originalUrl;

        console.log(`Tracking ${originalUrl}`);
    }

    console.log('Initialization completed');
})()
