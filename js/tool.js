
export function url(url,open = undefined){
    (open !== undefined) ? window.open(url,open) : window.location=url;
}