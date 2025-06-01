export function verifyBody(elements:string[],body:any):boolean{
    const bodyKeys = Object.entries(body);
    for(const values of bodyKeys){
        if(!elements.includes(values[0]) || !values[1]){
            return false;
        }
    }
    return true
}